import React, { useState, useEffect } from 'react';
import Tabs from './Tabs';
import Search from './Search';
import SongList from './SongList';

const Content = ({ songs, currentSongIndex, onSongClick }) => {
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [shuffledSongs, setShuffledSongs] = useState([]);
  const [activeTab, setActiveTab] = useState('For You');

  // useEffect(() => {
  //   setFilteredSongs(songs);
  // }, [songs]);

  useEffect(() => {
    filterSongs(songs, activeTab);
  }, [songs, activeTab]);

  // const filterSongs = (songs, tab) => {
  //   if (tab === 'Top Tracks') {
  //     setFilteredSongs(shuffleArray([...songs]));
  //   } else {
  //     setFilteredSongs(songs);
  //   }
  // };

  const filterSongs = (songs, tab) => {
    if (tab === 'Top Tracks') {
      const shuffled = shuffleArray([...songs]);
      setFilteredSongs(shuffled);
      setShuffledSongs(shuffled);
    } else {
      setFilteredSongs(songs);
      setShuffledSongs([]);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // const handleSearch = (query) => {
  //   setFilteredSongs(
  //     songs.filter(song => song.name.toLowerCase().includes(query.toLowerCase()))
  //   );
  // };

  const handleSearch = (query) => {
    setFilteredSongs(
      (activeTab === 'Top Tracks' ? shuffledSongs : songs).filter(song => song.name.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    filterSongs(songs, tab);
  };

  const handleSongClick = (index) => {
    const songToPlay = activeTab === 'Top Tracks' ? shuffledSongs[index] : filteredSongs[index];
    const actualIndex = songs.findIndex(song => song.id === songToPlay.id);
    onSongClick(actualIndex);
  };

  return (
    <div className="flex flex-col w-2/5 p-4">
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      <Search onSearch={handleSearch} />
      <SongList songs={filteredSongs} currentSongIndex={currentSongIndex} onSongClick={handleSongClick} />
    </div>
  );
};

export default Content;
