import React from 'react';

const TopControl: React.FC = () => {
  return (
    <div className="w-full h-12 my-2 flex items-center">
      <div className="w-1/4" />
      <div className="w-2/4 text-center">Top Control</div>
      <div className="w-1/4 text-right">
        <button
          type="button"
          className="bg-white text-gray-600 hover:bg-blue-500 hover:text-white focus:outline-none focus:shadow-outline font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default TopControl;
