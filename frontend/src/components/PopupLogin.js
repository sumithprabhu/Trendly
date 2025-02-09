"use client";
import { useState,useEffect } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5"; // Back button
import { FaCheckCircle } from "react-icons/fa"; // Checkmark for success

const API_URL = "http://localhost:5000"; // Backend URL

const LoginPopup = ({ onClose, setWalletId, setWalletAddress,setEmail }) => {
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Loading
  const [inputEmail, setInputEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // **Send OTP to Email**
  const sendOtp = async () => {
    if (!inputEmail.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    setError("");

    try {
      const response = await fetch(`${API_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inputEmail }),
      });

      const data = await response.json();
      if (response.ok) {
        setStep(2);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error sending OTP. Try again.");
    }
  };

  // **Verify OTP & Login**
  const verifyOtp = async () => {
    setLoading(true); // Start loading
    console.log('otp', otp.join(""));
    try {
      const response = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify({ email:inputEmail, otp: otp.join("") }),
      });

      const data = await response.json();
      console.log('walletId', data.user.walletId);
      
      if (response.ok) {
        setWalletId(data.user.walletId);
        setWalletAddress(data.user.walletAddress);
        setEmail(inputEmail);
        setLoading(false); // Stop loading, show checkmark
        setTimeout(() => {
          onClose(); // Close popup after 2 seconds
        }, 2000);
      } else {
        setError(data.message);
        console.log('error', data.message);
        setLoading(false);
        setStep(2)
      }
    } catch (error) {
      setError("OTP verification failed.");
    
      setLoading(false);
      setStep(2)
    }
  };

  // **Handle OTP Input Change**
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  
    // Move to next input
    if (value && index < 5) document.getElementById(`otp-${index + 1}`).focus();
  };
  
  // Use useEffect to trigger verification when OTP is fully entered
  useEffect(() => {
    if (otp.join("").length === 6) {
      setStep(3); // Go to loading screen
      verifyOtp();
    }
  }, [otp]);

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-lg flex items-center justify-center z-50"
      style={{
        backgroundImage: "url(/Assets/background.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col bg-[#232627] border border-gray-500/30 rounded-2xl p-8 w-[550px] h-[350px] text-center relative shadow-lg">
        <span className="text-sm font-semibold text-gray-500">
          Log in or Sign up
        </span>
        <span className="text-4xl font-semibold text-white mt-4">HyperSync.</span>
        <p className="text-gray-400 text-md mt-4">
              You are just one step away from exploring the power of AI in social media.
        </p>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-5 text-gray-400 hover:text-gray-200 text-lg"
        >
          ✖
        </button>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <>
            
            <div className="mt-6 flex items-center bg-[#1c1f21] px-4 py-4 border border-gray-500 rounded-2xl focus-within:ring-2 focus-within:ring-blue-400">
              <MdOutlineMailOutline size={24} />
              <input
                type="email"
                placeholder="Enter your email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                className="flex-1 ml-2 bg-transparent outline-none text-white text-lg"
              />
              <button
                onClick={sendOtp}
                className="text-blue-400 hover:text-blue-600 text-lg mr-2 no-underline transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          </>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <>
            <div className="flex items-center mt-4">
              <button
                onClick={() => setStep(1)}
                className="text-gray-400 hover:text-white transition-all duration-300 top-4 left-5 absolute"
              >
                <IoArrowBack size={20} />
              </button>
              <p className="text-gray-400 text-sm flex-1 text-center">
                Enter the OTP sent to your email.
              </p>
            </div>
            <div className="flex justify-center space-x-2 mt-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-10 h-10 text-center border border-gray-500 rounded-md text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 bg-[#1c1f21] text-white"
                />
              ))}
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </>
        )}

        {/* Step 3: Loading Screen */}
        {step === 3 && (
          <div className="flex flex-col justify-center items-center mt-3">
            {!loading ? (
              <>
                <FaCheckCircle size={100} className="text-green-500" />
              </>
            ) : (
              <>
                <div className="w-10 h-10 border-t-4 border-blue-400 border-solid rounded-full animate-spin"></div>
                <p className="text-gray-400 text-lg mt-2">Verifying...</p>
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-gray-500 text-md">
            Protected by <span className="font-bold">Privy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
