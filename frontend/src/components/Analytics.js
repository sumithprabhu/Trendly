"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const dummyData = [
  {
    id: 1,
    tweet: "https://twitter.com/post1",
    likes: 120,
    impressions: 5000,
    aiScore: 85,
  },
  {
    id: 2,
    tweet: "https://twitter.com/post2",
    likes: 200,
    impressions: 7200,
    aiScore: 76,
  },
  {
    id: 3,
    tweet: "https://twitter.com/post3",
    likes: 340,
    impressions: 9100,
    aiScore: 90,
  },
  {
    id: 4,
    tweet: "https://twitter.com/post4",
    likes: 150,
    impressions: 6000,
    aiScore: 82,
  },
];

const Analytics = () => {
  const [data, setData] = useState(dummyData);

  // Calculating Total Stats
  const totalPosts = data.length;
  const totalLikes = data.reduce((sum, post) => sum + post.likes, 0);
  const totalImpressions = data.reduce((sum, post) => sum + post.impressions, 0);

  // Bar Chart Data
  const impressionsChartData = {
    labels: data.map((post) => `Post ${post.id}`),
    datasets: [
      {
        label: "Total Impressions",
        data: data.map((post) => post.impressions),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
    ],
  };

  const aiScoreChartData = {
    labels: data.map((post) => `Post ${post.id}`),
    datasets: [
      {
        label: "AI Score (out of 100)",
        data: data.map((post) => post.aiScore),
        backgroundColor: "rgba(16, 185, 129, 0.7)",
      },
    ],
  };

  const likeScoreChartData = {
    labels: data.map((post) => `Post ${post.id}`),
    datasets: [
      {
        label: "Total Likes",
        data: data.map((post) => post.likes),
        backgroundColor: "rgba(245, 158, 11, 0.7)",
      },
    ],
  };


  return (
    <div className="p-8 text-white bg-[#141718] mt-12">
      {/* <h1 className="text-3xl font-semibold mb-6">Analytics Overview</h1> */}

      {/* Top 3 Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#232627] p-6 rounded-lg border border-gray-600">
          <h2 className="text-lg font-semibold mb-4">Likes per Post</h2>
          <Bar data={likeScoreChartData} />
        </div>

        {/* Second Column - Impressions Chart */}
        <div className="bg-[#232627] p-6 rounded-lg border border-gray-600">
          <h2 className="text-lg font-semibold mb-4">Impressions per Post</h2>
          <Bar data={impressionsChartData} />
        </div>

        {/* Third Column - AI Scores Chart */}
        <div className="bg-[#232627] p-6 rounded-lg border border-gray-600">
          <h2 className="text-lg font-semibold mb-4">AI Score per Post</h2>
          <Bar data={aiScoreChartData} />
        </div>
      </div>

      {/* Table Below */}
      <div className="mt-8 bg-[#232627] p-6 rounded-lg border border-gray-600">
  <h2 className="text-lg font-semibold mb-4">Post Performance Table</h2>
  <table className="w-full text-left border-collapse">
    <thead>
      <tr className="border-b border-gray-600">
        <th className="py-3">Tweet Link</th>
        <th className="py-3">Likes</th>
        <th className="py-3">Impressions</th>
        <th className="py-3">AI Score</th>
      </tr>
    </thead>
    <tbody>
      {data.map((post) => (
        <tr key={post.id} className="border-b border-gray-700">
          <td className="py-3 text-blue-400 underline">
            <a href={post.tweet} target="_blank" rel="noopener noreferrer">
              {post.tweet}
            </a>
          </td>
          <td className="py-3">{post.likes}</td>
          <td className="py-3">{post.impressions}</td>
          <td className="py-3">{post.aiScore}</td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr className="border-t border-gray-600 font-semibold">
        <td className="py-3 text-right">Total:</td>
        <td className="py-3">{data.reduce((sum, post) => sum + post.likes, 0)}</td>
        <td className="py-3">{data.reduce((sum, post) => sum + post.impressions, 0)}</td>
        <td className="py-3">{(data.reduce((sum, post) => sum + post.aiScore, 0) / data.length).toFixed(1)}</td>
      </tr>
    </tfoot>
  </table>
</div>

    </div>
  );
};

export default Analytics;
