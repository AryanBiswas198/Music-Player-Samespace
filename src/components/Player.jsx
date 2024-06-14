import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { Toaster, toast } from 'react-hot-toast';

const Player = ({ currentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (currentSong) {
      if (player) {
        player.unload();
      }
      const sound = new Howl({
        src: [currentSong.file],
        html5: true,
        onplay: () => toast.success('Playing!'),
        onpause: () => toast('Paused'),
      });
      setPlayer(sound);
      sound.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  const playMusic = () => {
    if (player) {
      player.play();
      setIsPlaying(true);
    }
  };

  const pauseMusic = () => {
    if (player) {
      player.pause();
      setIsPlaying(false);
    }
  };

  const nextSong = () => {
    // Logic for next song
  };

  const prevSong = () => {
    // Logic for previous song
  };

  return (
    <div className="flex flex-col justify-between p-4 text-white w-1/5">
      <Toaster />
      {currentSong && (
        <>
          <img src={`https://cms.samespace.com/assets/${currentSong.cover}`} alt="Cover" className="mb-4 rounded" />
          <h3 className="text-xl">{currentSong.title}</h3>
          <p className="text-gray-400">{currentSong.artist}</p>
          <div className="flex items-center justify-between mt-4">
            <button onClick={prevSong}>Previous</button>
            <button onClick={isPlaying ? pauseMusic : playMusic}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button onClick={nextSong}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
