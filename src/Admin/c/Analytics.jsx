import React from 'react';
import RatioChart from './RatioChart';
import RatioChart2 from './RatioChart2';

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <RatioChart />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <RatioChart2 />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
