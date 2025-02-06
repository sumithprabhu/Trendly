"use client";
import { useState } from "react";
import { Interface } from "ethers";

const PRIVY_APP_ID = "cm45y667a01nnzr3t35uic1wq";
const PRIVY_APP_SECRET = "ca6LXc4dMZv7MYkcZeH3v8fztCyRXyZuoGE5aNmBtAU5hCCcUGap1iD3XsGrjgSfJxoX5xQZk9cKYTBqwzNBqAn";
const PRIVY_BASE_URL = "http://localhost:5000/api";

const contractAddress = "0x6567346004B1B524c125F51dEeF0Ce5c84ae5eEb"; // Replace with actual contract address
const contractABI = [
  {
    "inputs": [],
    "name": "increment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newCount",
        "type": "uint256"
      }
    ],
    "name": "Incremented",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "count",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Helper function to create Basic Authentication Header
const getAuthHeaders = () => ({
  "Authorization": "Basic " + btoa(`${PRIVY_APP_ID}:${PRIVY_APP_SECRET}`),
  "privy-app-id": PRIVY_APP_ID,
  "Content-Type": "application/json",
});

const App = () => {
  const [walletId, setWalletId] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [txHash, setTxHash] = useState(null);

  // **1️⃣ Create a Wallet via Privy REST API (Same as cURL in Postman)**
  const createAccount = async () => {
    try {
      const response = await fetch(`${PRIVY_BASE_URL}/wallets`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ chain_type: "ethereum" }),
      });

      if (!response.ok) throw new Error("Failed to create wallet");

      const data = await response.json();
      setWalletId(data.id);
      setWalletAddress(data.address);
      console.log("Wallet Created:", data.address);
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
  };

  // **2️⃣ Call Smart Contract via Privy REST API (Like cURL in Postman)**
  const callContract = async () => {
    if (!walletId) {
      alert("Create an account first!");
      return;
    }

    // Encode function call
    const iface = new Interface(contractABI);
    const functionData = iface.encodeFunctionData("increment", []);

    try {
      const response = await fetch(`${PRIVY_BASE_URL}/wallets/${walletId}/rpc`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          method: "eth_sendTransaction",
          caip2: "eip155:11155111", // Sepolia Testnet
          params: {
            transaction: {
              to: contractAddress,
              data: functionData,
              gas: 100000,
              value: 0,
              chainId: 11155111,
            },
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to send transaction");

      const data = await response.json();
      setTxHash(data.txHash);
      console.log("Transaction Sent:", data.data);
    } catch (error) {
      console.error("Error calling contract:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Privy REST API + Smart Contract Interaction</h2>

      <button onClick={createAccount} style={{ padding: "10px", margin: "10px" }}>
        Create Account
      </button>

      <button onClick={callContract} style={{ padding: "10px", margin: "10px" }}>
        Call Contract
      </button>

      {walletAddress && <p><strong>Wallet Address:</strong> {walletAddress}</p>}
      {txHash && <p><strong>Transaction Hash:</strong> {txHash}</p>}
    </div>
  );
};

export default App;
