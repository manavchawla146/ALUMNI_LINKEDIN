import React from 'react';

const Connection = ({ connection }) => {
  return (
    <div className="flex items-center p-4 bg-gray-800 rounded-lg" style={{ margin: '1rem' }}>
      <img
        alt={`Profile picture of ${connection.fromname || connection.toname}`}
        className="w-12 h-12 rounded-full"
        src={connection.frompic || 'https://via.placeholder.com/50'}
        width="50"
        height="50"
      />
      <div className="ml-4">
        <div className="text-lg font-semibold">
          {connection.fromname || connection.toname}
        </div>
        <div className="text-sm text-gray-400">
          {connection.position || 'No position available'}
        </div>
        <div className="text-sm text-gray-500">
          Connected {connection.connectedDate || 'some time ago'}
        </div>
      </div>
      <div className="ml-auto">
        <button className="px-4 py-2 text-blue-500 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white">
          Message
        </button>
      </div>
    </div>
  );
};

export default Connection;