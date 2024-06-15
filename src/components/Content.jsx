import React, { useState, useEffect } from 'react';
import Tabs from './Tabs';
import Search from './Search';
import SongList from './SongList';
import axios from 'axios';

const Content = ({ onSongClick, currentSong }) => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [activeTab, setActiveTab] = useState('For You');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('https://cms.samespace.com/items/songs');
        setSongs(response.data.data);
        setFilteredSongs(response.data.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  const handleSearch = (query) => {
    setFilteredSongs(
      songs.filter(song => song.title.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Additional logic to filter songs based on tab can be added here
  };

  return (
    <div className="flex flex-col w-2/6 p-4">
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      <Search onSearch={handleSearch} />
      <SongList songs={filteredSongs} onSongClick={onSongClick} currentSong={currentSong} />
    </div>
  );
};

export default Content;
