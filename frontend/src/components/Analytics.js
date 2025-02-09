"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const dummyData = [
  {
    id: 1,
    tweet: "https://x.com/nextbrains26825/status/123456789",
    likes: 132,
    impressions: 3426,
    engagement: 132, // New Metric: Engagement
  },
  {
    id: 2,
    tweet: "https://x.com/nextbrains26825/status/987654321",
    likes: 136,
    impressions: 4577,
    engagement: 221,
  },
];

const Analytics = () => {
  const [data, setData] = useState(dummyData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://autonome.alt.technology/marketai-sbqzos/latest-tweet-analytics");
        const tweetStats = await response.json();

        // Construct tweet link and calculate engagement
        const newData = {
          id: data.length + 1,
          tweet: `https://x.com/nextbrains26825/status/${tweetStats.tweet_id}`,
          likes: tweetStats.likes,
          impressions: tweetStats.impressions,
          engagement: tweetStats.likes + tweetStats.retweets + tweetStats.replies + tweetStats.quotes, // Engagement Score
        };

        setData((prevData) => [newData, ...prevData]); // Add new data on top
      } catch (error) {
        console.error("Error fetching tweet stats:", error);
      }
    };

    fetchData();
  }, []);

  // Calculating Total Stats
  const totalPosts = data.length;
  const totalLikes = data.reduce((sum, post) => sum + post.likes, 0);
  const totalImpressions = data.reduce((sum, post) => sum + post.impressions, 0);
  const totalEngagement = data.reduce((sum, post) => sum + post.engagement, 0);

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

  const engagementChartData = {
    labels: data.map((post) => `Post ${post.id}`),
    datasets: [
      {
        label: "Total Engagement",
        data: data.map((post) => post.engagement),
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

        {/* Third Column - Engagement Chart */}
        <div className="bg-[#232627] p-6 rounded-lg border border-gray-600">
          <h2 className="text-lg font-semibold mb-4">Engagement per Post</h2>
          <Bar data={engagementChartData} />
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
              <th className="py-3">Engagement</th>
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
                <td className="py-3">{post.engagement}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-600 font-semibold">
              <td className="py-3 text-right">Total:</td>
              <td className="py-3">{totalLikes}</td>
              <td className="py-3">{totalImpressions}</td>
              <td className="py-3">{totalEngagement}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
