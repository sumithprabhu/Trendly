"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  CreditCard,
  Bell,
  Settings,
  Plus,
  ArrowUp,
} from "lucide-react";
import LoginPopup from "@/components/PopupLogin";

const SidebarItem = ({ icon, label, shortcut }) => (
  <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800 rounded-lg">
    <div className="w-5 h-5">{icon}</div>
    <span>{label}</span>
    {shortcut && (
      <span className="ml-auto bg-gray-700 px-2 py-0.5 text-xs rounded">
        {shortcut}
      </span>
    )}
  </div>
);

const UserProfile = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [walletId, setWalletId] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [email, setEmail] = useState(null);

  // Function to format wallet address (90x1234...456 format)
  const formatWalletAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-3)}`;
  };

  return (
    <div className="p-4 border-t border-gray-800">
      {walletId ? (
        // Show Logged-in User Info
        <div className="flex flex-col items-center text-white">
          <img src={`/Assets/profile.png`} alt="Profile" className="rounded-full mb-2 w-[40px] h-[40px]" />
          <div className="flex items-center space-x-1">
            <span className="text-sm">{formatWalletAddress(walletAddress)}</span>
            <div className="relative group">
              <span className="text-xs cursor-pointer">(i)</span>
              <div className="absolute left-0 mr-10 hidden group-hover:block bg-gray-700 text-white text-xs p-2 rounded w-[400px] text-center">
                Full Address: {walletAddress} <br />
                <b>Created via Privy Server Wallets</b>
              </div>
            </div>
          </div>
          <p className="text-sm">{email}</p>

          <button>
            Log out
          </button>
        </div>
      ) : (
        // Show Login Button
        <button className="w-full py-2 mb-3 bg-gray-800 rounded-lg text-sm" onClick={() => setShowLogin(true)}>
          Log In / Sign Up
        </button>
      )}

      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          setWalletId={setWalletId}
          setWalletAddress={setWalletAddress}
          setEmail={setEmail}
        />
      )}
    </div>
  );
};

const ChatWindow = ({ isChatActive, messages, sendMessage }) => (
  <div className="space-y-4">
    {isChatActive ? (
      <div className="flex flex-col space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg max-w-[80%] ${
              msg.isUser ? "bg-blue-500 ml-auto" : "bg-gray-700 mr-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center">
        <h1 className="text-4xl font-bold my-4">Unlock the power of AI</h1>
        <p className="text-gray-400 mb-12">
          Chat with the smartest AI - Experience the power of AI with us
        </p>
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-6 py-3 rounded-lg text-white"
        >
          Get Started
        </button>
      </div>
    )}
  </div>
);

const ChatInput = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="mt-8 flex gap-4">
      <div className="flex-1 bg-[#232627] rounded-lg p-4 flex items-center border border-gray-200/10">
        <Plus className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="bg-transparent flex-1 outline-none"
        />
      </div>
      <button onClick={handleSend} className="bg-blue-500 p-4 rounded-lg">
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};

const ChatHistory = () => (
  <div className="w-[20%] bg-gray-800 p-4 rounded-2xl mr-4 mb-10">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm">Chat history</span>
      <span className="text-sm text-gray-400">0</span>
    </div>
    <div className="space-y-4 text-gray-400 text-center">No chat history yet</div>
  </div>
);

const HomePage = () => {
  const [isChatActive, setIsChatActive] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hey Hello", isUser: false }]);

  const sendMessage = (message) => {
    setMessages((prev) => [...prev, { text: message, isUser: true }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "AI Response", isUser: false }]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#141718] text-white">
      <div className="w-[13%] flex flex-col">
        <div className="flex items-center text-center gap-2 mx-auto mt-6 pb-4">
          <span className="text-4xl font-semibold text-center">Trendly.</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarItem icon={<CreditCard />} label="Manage Subscription" />
          <SidebarItem icon={<Bell />} label="Updates & FAQ" />
          <SidebarItem icon={<Settings />} label="Settings" />
        </nav>
        <UserProfile />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex mt-16">
          <div className="flex-1 pr-8 pb-8 overflow-y-auto">
            <div className="mx-auto flex flex-col h-full bg-[#232627] p-8 rounded-2xl">
              <div className="flex-1">
                <ChatWindow isChatActive={isChatActive} messages={messages} sendMessage={() => setIsChatActive(true)} />
              </div>
              {isChatActive && <ChatInput onSendMessage={sendMessage} />}
            </div>
          </div>
          <ChatHistory />
        </div>
      </div>
    </div>
  );
};

export default HomePage;