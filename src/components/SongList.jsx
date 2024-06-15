import React from 'react';
import SongItem from './SongItem';

const SongList = ({ songs, onSongClick, currentSong }) => {
  return (
    <div className="flex flex-col justify-between">
      {songs.map(song => (
        <SongItem key={song.id} song={song} onSongClick={onSongClick}
          isActive={currentSong && currentSong.id === song.id}
         />
      ))}
    </div>
  );
};

export default SongList;
