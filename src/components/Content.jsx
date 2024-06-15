import React, { useState, useEffect } from 'react';
import Tabs from './Tabs';
import Search from './Search';
import SongList from './SongList';

const Content = ({ songs, currentSongIndex, onSongClick }) => {
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [activeTab, setActiveTab] = useState('For You');

  useEffect(() => {
    setFilteredSongs(songs);
  }, [songs]);

  const handleSearch = (query) => {
    setFilteredSongs(
      songs.filter(song => song.name.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col w-2/5 p-4">
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      <Search onSearch={handleSearch} />
      <SongList songs={filteredSongs} currentSongIndex={currentSongIndex} onSongClick={onSongClick} />
    </div>
  );
};

export default Content;
