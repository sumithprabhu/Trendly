"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowRight, Search, CreditCard, Bell, Settings, ChevronDown, 
  Sun, Moon, Plus, ArrowUp, Share 
} from "lucide-react";

// Separate components for better organization and hydration
const SidebarItem = ({ icon, label, shortcut }) => (
  <div className="flex items-center gap-3 px-3 py-2 hover:bg-gray-800 rounded-lg">
    <div className="w-5 h-5">{typeof icon === "string" ? icon : React.cloneElement(icon, { className: "w-5 h-5" })}</div>
    <span>{label}</span>
    {shortcut && (
      <span suppressHydrationWarning className="ml-auto bg-gray-700 px-2 py-0.5 text-xs rounded">
        {shortcut}
      </span>
    )}
  </div>
);

const UserProfile = () => (
  <div className="p-4 border-t border-gray-800">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
      <div>
        <div className="text-sm">Tran Mau Tri Tam</div>
        <div className="text-xs text-gray-400">tam@ui8.net</div>
      </div>
      <span className="ml-auto text-xs bg-green-500 px-2 py-1 rounded-full">Free</span>
    </div>
    <button className="w-full py-2 mb-3 bg-gray-800 rounded-lg text-sm">Upgrade to Pro</button>
  </div>
);

const FeatureList = () => {
  const features = [
    { icon: "🖼️", title: "Photo editing", color: "bg-purple-900" },
    { icon: "🎥", title: "Video generation", color: "bg-orange-900" },
    { icon: "🏆", title: "Education feedback", color: "bg-blue-900" },
    { icon: "📦", title: "Code generation", color: "bg-green-900" },
    { icon: "🎵", title: "Audio generation", color: "bg-amber-900" }
  ];
  
  return (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-800 cursor-pointer">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center text-xl`}>
              {feature.icon}
            </div>
            <span className="text-lg">{feature.title}</span>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400" />
        </div>
      ))}
    </div>
  );
};

const ChatInput = () => (
  <div className="mt-8 flex gap-4">
    <div className="flex-1 bg-gray-800 rounded-lg p-4 flex items-center">
      <Plus className="w-5 h-5 text-gray-400 mr-2" />
      <input type="text" placeholder="Type a message..." className="bg-transparent flex-1 outline-none" />
    </div>
    <button className="bg-blue-500 p-4 rounded-lg">
      <ArrowUp className="w-5 h-5" />
    </button>
  </div>
);

const ChatHistory = () => (
  <div className="w-[20%] bg-gray-800 p-4 rounded-2xl mr-4 mb-10">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm">Chat history</span>
      <span suppressHydrationWarning className="text-sm text-gray-400">0</span>
    </div>
    <div className="space-y-4 text-gray-400 text-center">No chat history yet</div>
  </div>
);

// Main component with hydration handling
const HomePage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show a simple loading state that matches the dark theme
  if (!isClient) {
    return (
      <div className="h-screen w-screen bg-gray-900 text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray/30 backdrop-blur-2xl text-white">
      {/* Left Sidebar */}
      <div className="w-[13%] flex flex-col">
        {/* Logo */}
        <div className="p-4">
          <div className="flex items-center text-center gap-2">
            <span className="text-2xl font-semibold text-center">Trendly.</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarItem icon={<CreditCard />} label="Manage Subscription" />
          <SidebarItem icon={<Bell />} label="Updates & FAQ" />
          <SidebarItem icon={<Settings />} label="Settings" />
        </nav>

        {/* User Profile */}
        <UserProfile />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex mt-16">
          {/* Center Chat Section */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="mx-auto my-auto bg-gray-800 p-8 rounded-2xl">
              <h1 className="text-4xl font-bold mb-4">Unlock the power of AI</h1>
              <p className="text-gray-400 mb-12">
                Chat with the smartest AI - Experience the power of AI with us
              </p>
              {/* AI Features */}
              <FeatureList />
              {/* Chat Input */}
              <ChatInput />
            </div>
          </div>
          {/* Right Chat History */}
          <ChatHistory />
        </div>
      </div>
    </div>
  );
};

export default HomePage;