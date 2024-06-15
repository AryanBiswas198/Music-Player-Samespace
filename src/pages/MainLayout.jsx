import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import Player from '../components/Player';
import ColorThief from 'color-thief-browser';

const MainLayout = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState({});

    useEffect(() => {
        if (currentSong) {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = `https://cms.samespace.com/assets/${currentSong.cover}`;
        img.onload = () => {
            const colorThief = new ColorThief();
            const colors = colorThief.getColor(img);
            const darkenedColor = colors.map(color => Math.floor(color * 0.5)); // Darken the color by reducing brightness
            setBackgroundStyle({
            background: `linear-gradient(to left, rgba(${darkenedColor[0]}, ${darkenedColor[1]}, ${darkenedColor[2]}, 2), rgba(${darkenedColor[0]}, ${darkenedColor[1]}, ${darkenedColor[2]}, 1))`
            });
        };
        }
    }, [currentSong]);


  const handleSongClick = (song) => {
    setCurrentSong(song);
  };

  return (
    <div className="flex h-full bg-slate-950 py-5" style={backgroundStyle}>
      <Sidebar />
      <Content onSongClick={handleSongClick} currentSong={currentSong} />
      <Player currentSong={currentSong} />
    </div>
  );
};

export default MainLayout;
