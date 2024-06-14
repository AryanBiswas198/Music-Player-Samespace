import React from 'react';

const SongItem = ({ song, onSongClick }) => {
  return (
    <div
      className="p-2 flex items-center border-b border-gray-200 cursor-pointer"
      onClick={() => onSongClick(song)}
    >
      <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.title} className="w-12 h-12 mr-4" />
      <div>
        <h3 className="text-lg">{song.title}</h3>
        <p className="text-white">{song.artist}</p>
      </div>
    </div>
  );
};

export default SongItem;
