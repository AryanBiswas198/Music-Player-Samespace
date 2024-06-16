import React from 'react';

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex mb-6 text-white tracking-wide leading-8 font-bold gap-x-7 lg:gap-x-8">
      <button
        className={`text-xl lg:text-2xl ${activeTab === 'For You' ? 'text-white' : 'text-gray-500'}`}
        onClick={() => onTabChange('For You')}
      >
        For You
      </button>
      <button
        className={`text-xl lg:text-2xl ${activeTab === 'Top Tracks' ? 'text-white' : 'text-gray-500'}`}
        onClick={() => onTabChange('Top Tracks')}
      >
        Top Tracks
      </button>
    </div>
  );
};

export default Tabs;
