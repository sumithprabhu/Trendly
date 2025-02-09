"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  CreditCard,
  Bell,
  Settings,
  Plus,
  ArrowUp,
  LayoutDashboard,
  BarChart,
  Megaphone,
} from "lucide-react";
import LoginPopup from "@/components/PopupLogin";
import { handleChatResponse } from "@/utils/chatHandler";
import SettingsView from "@/components/SettingsView";
import Analytics from "@/components/Analytics";
import ReactMarkdown from "react-markdown";
import { marked } from "marked";


const stripMarkdown = (markdown) => {
  return marked.parse(markdown)
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove all HTML tags
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold (**bold** → bold)
    .replace(/\*(.*?)\*/g, "$1") // Remove italics (*italic* → italic)
    .replace(/`(.*?)`/g, "$1") // Remove inline code (`code` → code)
    .replace(/\n\s*\n/g, "\n") // Remove excessive line breaks
    .trim();
};


const SidebarItem = ({ icon, label, active, onClick }) => (
  <div
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer ${
      active ? "bg-gray-800 text-white font-semibold" : "hover:bg-gray-800"
    }`}
    onClick={onClick}
  >
    <div className="w-5 h-5">{icon}</div>
    <span>{label}</span>
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
          <img
            src={`/Assets/profile.png`}
            alt="Profile"
            className="rounded-full mb-2 w-[40px] h-[40px]"
          />
          <div className="flex items-center space-x-1">
            <span className="text-sm">
              {formatWalletAddress(walletAddress)}
            </span>
            <div className="relative group">
              <span className="text-xs cursor-pointer">(i)</span>
              <div className="absolute left-0 mr-10 hidden group-hover:block bg-gray-700 text-white text-xs p-2 rounded w-[400px] text-center">
                Full Address: {walletAddress} <br />
                <b>Created via Privy Server Wallets</b>
              </div>
            </div>
          </div>
          <p className="text-sm">{email}</p>

          <button>Log out</button>
        </div>
      ) : (
        // Show Login Button
        <button
          className="w-full py-2 mb-3 bg-gray-800 rounded-lg text-sm"
          onClick={() => setShowLogin(true)}
        >
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

const ChatWindow = ({ isChatActive, messages, sendMessage }) => {
  const chatRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages update
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="space-y-4">
      {isChatActive ? (
        <div
        ref={chatRef}
        className="h-[800px] overflow-y-auto space-y-4 pr-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-800 scrollbar-track-slate-600"
      >
        <div className="flex flex-col space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg max-w-[80%] min-h-[40px] break-words whitespace-pre-wrap ${
                msg.isUser ? "bg-blue-500 ml-auto mr-2" : "bg-gray-700 mr-auto"
              }`}
            >
              {msg.isLoading ? (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Typing</span>
                  <div className="animate-bounce w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="animate-bounce w-2 h-2 bg-gray-400 rounded-full animation-delay-200"></div>
                  <div className="animate-bounce w-2 h-2 bg-gray-400 rounded-full animation-delay-400"></div>
                </div>
              ) : (
                msg.text
              )}
            </div>
          ))}
        </div>
      </div>
      ) : (
        <div className="text-center p-8 mt-20 ">
          <h1 className="text-5xl font-bold text-white my-4">
            AI-Powered Social Media Agent
          </h1>
          <p className="text-gray-400 mb-6 text-2xl">
            Fully automating social media marketing for Web3 & crypto companies.
          </p>

          {/* Features List in One Column */}
          <div className="flex flex-col gap-4 items-center mb-8 mt-10">
            <div className="flex items-center border border-gray-500 rounded-lg p-4 w-[70%] text-center justify-center ">
              <Megaphone className="text-blue-400 w-7 h-7 mr-3" />
              <span className="text-gray-300 text-xl">
                <b>Strategizes marketing campaigns</b> to boost engagement &
                visibility.
              </span>
            </div>
            <div className="flex items-center border border-gray-500 rounded-lg p-4 w-[70%] text-center justify-center ">
              <Bell className="text-blue-400 w-6 h-6 mr-3" />
              <span className="text-gray-300 text-xl">
                <b>Automates execution</b>—tweets, runs campaigns, shares
                token/NFT updates.
              </span>
            </div>
            <div className="flex items-center border border-gray-500 rounded-lg p-4 w-[70%] text-center justify-center ">
              <Settings className="text-blue-400 w-6 h-6 mr-3" />
              <span className="text-gray-300 text-xl">
                <b>Interacts across platforms</b>—tweets, posts, and replies
                seamlessly.
              </span>
            </div>
            <div className="flex items-center border border-gray-500 rounded-lg p-4 w-[70%] text-center justify-center ">
              <BarChart className="text-blue-400 w-6 h-6 mr-3" />
              <span className="text-gray-300 text-xl">
                <b>Learns & Improves</b>—analyzes engagement data to refine
                content.
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-lg mb-6 w-[60%] mx-auto">
            Imagine a system that <b>not only posts but also optimizes</b>{" "}
            content for your audience, making real-time improvements based on
            performance insights!
          </p>

          {/* Get Started Button (No Gradient) */}
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white font-bold transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      )}
    </div>
  );
};

const ChatInput = ({ onSendMessage ,setAgentActivity}) => {
  const [input, setInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("OpenAI"); // Default model

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage( input, selectedModel ,setAgentActivity);
      setInput("");
    }
  };

  return (
    <div className="mt-8 flex gap-4">
      {/* Input Box with Dropdown */}
      <div className="flex-1 bg-[#232627] rounded-lg p-4 flex items-center border border-gray-200/10">
        <Plus className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()} // Listen for Enter key
          placeholder="Type a message..."
          className="bg-transparent flex-1 outline-none"
        />

        {/* Dropdown for Model Selection */}
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="ml-3 p-2 bg-[#232627] text-white border border-gray-200 rounded-lg"
        >
          <option value="openai">OpenAI</option>
          <option value="LLAMA">LLAMA</option>
          <option value="Claude">Claude</option>
        </select>
      </div>

      {/* Send Button */}
      <button onClick={handleSend} className="bg-blue-500 p-4 rounded-lg">
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
};
const ChatHistory = ({ agentActivity }) => {
  return (
    <div className="w-[20%] bg-[#232627] p-4 rounded-2xl mr-4 mb-9">
      <div className="flex justify-center mb-4">
        <span className="text-sm text-center text-white">Chat History</span>
      </div>
      <div className="space-y-4 text-gray-400 text-left overflow-y-auto max-h-[900px] pr-2 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-800 scrollbar-track-slate-600">
        {agentActivity?.map((entry, index) => {
          if (!entry.content?.trim()) return null; // Skip empty content

          return (
            <div key={index}>
              <div
                className={`p-2 rounded-lg break-words whitespace-pre-wrap ${
                  entry.type === "ai"
                    ? "text-green-400"
                    : entry.type === "tool"
                    ? "text-orange-400"
                    : "text-gray-400"
                }`}
              >
                {/* Typewriter Effect */}
                <TypewriterEffect content={entry.content} />
              </div>
              <hr className="border-gray-600 my-2" /> {/* Break line */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Typewriter Effect Component
const TypewriterEffect = ({ content }) => {
  const [displayedText, setDisplayedText] = useState("");
  const words = content.split(" ");
  const delay = 50; // Adjust delay for effect speed

  useEffect(() => {
    let index = 0;
    setDisplayedText(""); // Reset text when content changes

    const interval = setInterval(() => {
      if (index < words.length) {
        setDisplayedText((prev) => prev + words[index] + " ");
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [content]);

  return (
    <ReactMarkdown
      components={{
        a: ({ node, ...props }) => (
          <a {...props} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer" />
        ),
        strong: ({ node, ...props }) => <b {...props} />,
        em: ({ node, ...props }) => <i {...props} />,
        code: ({ node, ...props }) => (
          <code className="bg-gray-800 px-1 py-0.5 rounded text-yellow-300">{props.children}</code>
        ),
        li: ({ node, ...props }) => <li className="ml-4 list-disc">{props.children}</li>,
        h1: ({ node, ...props }) => <h1 className="text-lg font-bold">{props.children}</h1>,
        h2: ({ node, ...props }) => <h2 className="text-base font-semibold">{props.children}</h2>,
      }}
    >
      {displayedText}
    </ReactMarkdown>
  );
};


const Updates = () => (
  <div className="p-8 text-white">Updates & FAQ Content</div>
);

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [agentActivity, setAgentActivity] = useState([]);
  const [isChatActive, setIsChatActive] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hey, happy to see you here! I am HyperSync and will help you sort your social media hustle.",
      isUser: false,
    },
  ]);
  const sendMessage = async (message, model, setAgentActivity) => {
    setMessages((prev) => [...prev, { text: message, isUser: true }]);
  
    // Add a temporary loader message for AI response
    const loaderId = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: loaderId, text: "loading", isUser: false, isLoading: true }
    ]);
  
    try {
      const response = await handleChatResponse(message, model);
      await new Promise((resolve) => setTimeout(resolve, response ? 1000 : 3000)); // Simulate loading delay
  
      if (response && response.result && Array.isArray(response.result)) {
        setAgentActivity(response.result); // Store agent activity
        const lastContent = response.result[response.result.length - 1]?.content;
        console.log("da",lastContent);
        const cleanText = stripMarkdown(lastContent); // Convert Markdown to clean text
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loaderId ? { ...msg, text: cleanText, isLoading: false } : msg
          )
        ); // Show fixed response
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === loaderId ? { ...msg, text: response, isLoading: false } : msg
          )
        ); // Normal AI response
      }
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loaderId ? { ...msg, text: "Something went wrong.", isLoading: false } : msg
        )
      );
    }
  };
  
  

  return (
    <div className="flex h-screen bg-[#141718] text-white overflow-x-hidden overflow-y-hidden">
      {/* Sidebar */}
      <div className="w-[13%] flex flex-col">
        <div className="flex items-center text-center gap-2 mx-auto mt-6 pb-4">
          <span className="text-3xl font-semibold text-center">HyperSync.</span>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            active={activeTab === "Dashboard"}
            onClick={() => setActiveTab("Dashboard")}
          />
          <SidebarItem
            icon={<BarChart />}
            label="Analytics"
            active={activeTab === "Analytics"}
            onClick={() => setActiveTab("Analytics")}
          />
          <SidebarItem
            icon={<Bell />}
            label="Updates & FAQ"
            active={activeTab === "Updates"}
            onClick={() => setActiveTab("Updates")}
          />
          <SidebarItem
            icon={<Settings />}
            label="Settings"
            active={activeTab === "Settings"}
            onClick={() => setActiveTab("Settings")}
          />
        </nav>

        <UserProfile />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeTab === "Dashboard" && (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex mt-16">
              <div className="flex-1 pr-8 pb-8 overflow-y-auto">
                <div className="mx-auto flex flex-col h-full bg-[#232627] p-8 rounded-2xl">
                  <div className="flex-1">
                    <ChatWindow
                      isChatActive={isChatActive}
                      messages={messages}
                      sendMessage={() => setIsChatActive(true)}
                    />
                  </div>
                  {isChatActive && <ChatInput onSendMessage={sendMessage} setAgentActivity={setAgentActivity} />}
                </div>
              </div>
              <ChatHistory agentActivity={agentActivity}/>
            </div>
          </div>
        )}
        {activeTab === "Analytics" && <Analytics />}
        {activeTab === "Updates" && <Updates />}
        {activeTab === "Settings" && <SettingsView />}
      </div>
    </div>
  );
};

export default HomePage;
