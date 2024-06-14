import React from 'react';
import SongItem from './SongItem';

const SongList = ({ songs, onSongClick }) => {
  return (
    <div className="flex flex-col justify-between">
      {songs.map(song => (
        <SongItem key={song.id} song={song} onSongClick={onSongClick} />
      ))}
    </div>
  );
};

export default SongList;
