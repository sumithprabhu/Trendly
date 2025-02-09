"use client";
import React, { useState } from "react";

const SettingsView = () => {
  const [apiKey, setApiKey] = useState(""); // State for API Key
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode

  const handleEditClick = () => {
    if (isEditing) {
      console.log("API Key Submitted:", apiKey);
      // Add API key submission logic here
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="p-8 bg-[#232627] rounded-2xl h-full w-full text-white m-3">
      {/* API Key Input & Button */}
      <div className="flex items-center space-x-4 mb-6 relative">
  <input
    type="text"
    value={apiKey}
    onChange={(e) => setApiKey(e.target.value)}
    placeholder="Enter your API Key"
    disabled={!isEditing}
    className="w-2/3 p-3 bg-[#1c1f21] border border-gray-500 rounded-lg outline-none text-white focus:ring-2 focus:ring-blue-400 transition-all duration-300"
  />
  <button
    onClick={handleEditClick}
    className={`px-5 py-2 rounded-lg transition-all duration-300 ${
      isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-600"
    }`}
  >
    {isEditing ? "Submit" : "Edit"}
  </button>

  {/* Hover text trigger */}
  <div className="relative group">
    <span className="text-blue-400 cursor-pointer underline text-sm ml-2 group-hover:text-blue-300">
      How to get Key
    </span>

    {/* Hover popup content */}
    <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm p-4 rounded-lg w-96 right-0 top-6 shadow-lg border border-gray-700 z-10">
      <h3 className="font-semibold mb-2">How to Get Your API Key?</h3>
      <ol className="list-decimal pl-5 space-y-2">
        <li>A deployment window will appear below.</li>
        <li>The bot is hosted on Autonome.</li>
        <li>Each user gets a separate bot instance.</li>
        <li>Fill in the required environment variables.</li>
        <li>Deploy your personalized AI agent.</li>
        <li>Once deployed, you will receive a unique identifier key.</li>
        <li>This key allows interaction with your AI agent.</li>
      </ol>
    </div>
  </div>
</div>


      {/* Embedded iFrame */}
      <div className="relative w-full h-0" style={{ paddingBottom: "50.25%" }}>
        <iframe
          src="https://dev.autonome.fun/autonome/new?template=Agentkit"
          className="absolute top-0 left-0 w-full h-full rounded-lg border border-gray-700"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default SettingsView;
