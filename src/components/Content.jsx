import React, { useState, useEffect } from 'react';
import Tabs from './Tabs';
import Search from './Search';
import SongList from './SongList';

const Content = ({ songs, currentSongIndex, onSongClick }) => {
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [shuffledSongs, setShuffledSongs] = useState([]);
  const [currentShuffledIndex, setCurrentShuffledIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('For You');
  const [originalIndices, setOriginalIndices] = useState([]);

  useEffect(() => {
    filterSongs(songs, activeTab);
  }, [songs, activeTab]);


  const filterSongs = (songs, tab) => {
    if (tab === 'Top Tracks') {
      const shuffled = shuffleArray([...songs]);
      setFilteredSongs(shuffled);
      setShuffledSongs(shuffled);
      setCurrentShuffledIndex(null); 
      setOriginalIndices(shuffled.map(song => songs.indexOf(song)));
    } else {
      setFilteredSongs(songs);
      setShuffledSongs([]);
      setCurrentShuffledIndex(null); 
      setOriginalIndices(songs.map((_, index) => index));
    }
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = songs.filter(song => song.name.toLowerCase().includes(lowercasedQuery));
    setFilteredSongs(filtered);

    if (activeTab === 'Top Tracks') {
      const shuffledFiltered = filtered.filter(song => shuffledSongs.some(shuffledSong => shuffledSong.id === song.id));
      setFilteredSongs(shuffledFiltered);
      setOriginalIndices(shuffledFiltered.map(song => songs.indexOf(song)));
    } else {
      setOriginalIndices(filtered.map(song => songs.indexOf(song)));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    filterSongs(songs, tab);
  };

  const handleSongClick = (index) => {
    const actualIndex = originalIndices[index];
    onSongClick(actualIndex);
    if (activeTab === 'Top Tracks') {
      setCurrentShuffledIndex(index);
    }
  };

  return (
    <div className="flex flex-col md:w-2/5 p-4">
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      <Search onSearch={handleSearch} />
      <SongList
        songs={filteredSongs}
        currentSongIndex={currentShuffledIndex !== null ? currentShuffledIndex : originalIndices.indexOf(currentSongIndex)}
        onSongClick={handleSongClick}
      />
    </div>
  );
};

export default Content;
