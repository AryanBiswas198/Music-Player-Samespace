import React from 'react';
import SongItem from './SongItem';

const SongList = ({ songs, currentSongIndex, onSongClick }) => {
  return (
    <div className="flex flex-col justify-between">
      {songs.map((song, index) => (
        <SongItem key={song.id} song={song} onSongClick={() => onSongClick(index)}
          isActive={currentSongIndex === index}
         />
      ))}
    </div>
  );
};

export default SongList;
