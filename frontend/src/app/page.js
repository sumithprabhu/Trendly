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
    <div className="relative min-h-screen bg-cover bg-center flex flex-col items-center" style={{ backgroundImage: 'url(/Assets/background.jpg)' }}>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 text-white w-full">
        <h1 className="text-4xl font-bold">vibrant.</h1>
    
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-10 px-6">
        <h2 className="text-4xl font-bold text-white max-w-3xl">
          AI-Powered Social Media Manager to Drive More On-Chain Activity
        </h2>
        <p className="text-white text-lg mt-4 max-w-2xl">
          Manage your social media seamlessly with our AI Agent, optimized for boosting on-chain engagement and automation.
        </p>
        <Link href="/dashboard">
          <button className="mt-6 bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-600">
Launch Dashboard
          </button>
        </Link>
      </div>

      {/* Main Image with Additional Graphs */}
      <div className="relative mt-20">
        {/* Main Image */}
        <Image 
          src="/Assets/getStarted.png" 
          alt="Get Started Preview" 
          width={875} 
          height={680} 
          className="rounded-3xl border-2 border-gray-300 shadow-lg"
        />

        {/* Left Image (30% size, violet border) */}
        <div className="absolute left-[-37%] top-[60%] transform -translate-y-1/2">
          <Image 
            src="/Assets/likegraph.png" 
            alt="Like Graph" 
            width={400} // 30% of 800px
            height={250} // 30% of 600px
            className="rounded-xl border-2 border-violet-500 shadow-lg"
          />
        </div>

        {/* Right Image (30% size, green border, positioned top-right) */}
        <div className="absolute right-[-38%] top-[-10%]">
          <Image 
            src="/Assets/aigraph.png" 
            alt="AI Graph" 
            width={400} // 30% of 800px
            height={300} // 30% of 600px
            className="rounded-xl border-2 border-green-500 shadow-lg"
          />
        </div>
      </div>

      {/* Gradient Blending Below 50% */}
      <div className="absolute bottom-0 w-full h-[40vh]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#141718] to-transparent"></div>
      </div>
    </div>
  );
}
