import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';

const SongItem = ({ song, onSongClick, isActive }) => {
  const [songLength, setSongLength] = useState(null);

  useEffect(() => {
    const sound = new Howl({
      src: [song.url],
      html5: true,
      preload: true,
      onload: () => {
        setSongLength(formatTime(sound.duration()));
      }
    });
  }, [song.url]);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div
      className={`p-4 flex items-center justify-between cursor-pointer ${isActive ? 'bg-white bg-opacity-20 rounded-lg' : ''}`}
      onClick={onSongClick}
    >
      <div className="flex items-center">
        <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.title} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h3 className="text-lg lg:text-xl py-0.5 font-normal leading-6 text-white">{song.name}</h3>
          <p className="text-sm lg:text-md font-normal text-gray-400">{song.artist}</p>
        </div>
      </div>
      {songLength && <div className="text-md leading-6 font-normal text-gray-400">{songLength}</div>}
    </div>
  );
};

export default SongItem;
 