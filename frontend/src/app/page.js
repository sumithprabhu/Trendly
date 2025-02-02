'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null; // Avoid rendering on the server
  }

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/Assets/background.jpg)' }}>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 text-white">
        <h1 className="text-2xl font-bold">vibrant.</h1>
        <Link href="#">
          <button className="bg-white text-black px-6 py-2 rounded-lg shadow-md hover:shadow-lg">
            Launch Dashboard
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-20 px-6">
        <h2 className="text-4xl font-bold text-white max-w-3xl">
          AI-Powered Social Media Manager to Drive More On-Chain Activity
        </h2>
        <p className="text-white text-lg mt-4 max-w-2xl">
          Manage your social media seamlessly with our AI Agent, optimized for boosting on-chain engagement and automation.
        </p>
        <Link href="#">
          <button className="mt-6 bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-600">
            Get Started for Free →
          </button>
        </Link>
      </div>

      {/* Preview Section */}
      <div className="flex justify-center items-center mt-20">
        <div className="bg-white p-6 rounded-xl shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Preview Dashboard</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-700">Total Balance</p>
              <p className="text-2xl font-bold">$13,289.00</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-700">Total Income</p>
              <p className="text-2xl font-bold text-green-500">$2,350.00</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-700">Total Outcome</p>
              <p className="text-2xl font-bold text-red-500">$5,620.00</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-700">Savings</p>
              <p className="text-2xl font-bold">$2,380.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
