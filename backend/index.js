
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import mongoose from "mongoose";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import crypto from "crypto";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PRIVY_APP_ID = process.env.PRIVY_APP_ID;
const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;
const PRIVY_BASE_URL = "https://api.privy.io/v1";

// **1️⃣ Connect to MongoDB Atlas**
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// **2️⃣ Define MongoDB Schema**
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true }, // Primary key
  walletId: String,
  walletAddress: String,
  agentURL: { type: String, default: null }, // New field added

});

const OtpSchema = new mongoose.Schema({
  email: String,
  otp: String,
  expiresAt: Date, // Expiration Time (5 minutes)
});

const User = mongoose.model("User", UserSchema);
const Otp = mongoose.model("Otp", OtpSchema);

// **3️⃣ Set up Email Transporter (Using Gmail SMTP)**
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// **4️⃣ Send OTP via Email**
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP

  await Otp.updateOne(
    { email },
    { otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) }, // OTP valid for 5 minutes
    { upsert: true }
  );

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Login",
    text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) return res.status(500).json({ message: error });
    res.json({ message: "OTP sent successfully" });
  });
});

// **5️⃣ Verify OTP & Log in/Register User**
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

  const record = await Otp.findOne({ email, otp });
  if (!record || record.expiresAt < new Date()) return res.status(400).json({ message: "Invalid or expired OTP" });

  let user = await User.findOne({ email });

  if (!user) {
    // **Create Wallet for New User**
    const walletResponse = await fetch(`${PRIVY_BASE_URL}/wallets`, {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${PRIVY_APP_ID}:${PRIVY_APP_SECRET}`).toString("base64"),
        "privy-app-id": PRIVY_APP_ID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chain_type: "ethereum" }),
    });

    const walletData = await walletResponse.json();

    // **Store User in MongoDB**
    user = new User({
      email,
      walletId: walletData.id,
      walletAddress: walletData.address,
    });

    await user.save();
  }

  res.json({ message: "Login successful", user });
});

// **6️⃣ Privy Proxy API**
app.all("/api/*", async (req, res) => {
  try {
    const url = `${PRIVY_BASE_URL}${req.path.replace("/api", "")}`;
    
    const headers = {
      Authorization: "Basic " + Buffer.from(`${PRIVY_APP_ID}:${PRIVY_APP_SECRET}`).toString("base64"),
      "privy-app-id": PRIVY_APP_ID,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      method: req.method,
      headers,
      body: req.method === "GET" ? null : JSON.stringify(req.body),
    });

    const data = await response.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(response.status).send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/set-agent-url", async (req, res) => {
  const { email, agentURL } = req.body;
  if (!email || !agentURL) return res.status(400).json({ message: "Email and Agent URL are required" });

  const user = await User.findOneAndUpdate(
    { email },
    { agentURL },
    { new: true }
  );

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ message: "Agent URL updated successfully", user });
});

app.get("/get-user", async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
});


// **7️⃣ Start Server**
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
