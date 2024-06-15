import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { toast } from 'react-hot-toast';

const Player = ({ currentSong, nextSong, prevSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);


  useEffect(() => {
    if (currentSong) {
      if (playerRef.current) {
        playerRef.current.unload();
      }
      const sound = new Howl({
        src: [currentSong.url],
        html5: true,
        onplay: () => toast.success('Playing!'),
        onpause: () => toast.success('Paused'),
        onend: () => nextSong(),  // Automatically play next song when current one ends
      });
      playerRef.current = sound;
      sound.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  const playMusic = () => {
    if (playerRef.current) {
      playerRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseMusic = () => {
    if (playerRef.current) {
      playerRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col justify-between p-4 text-white w-1/3">
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
