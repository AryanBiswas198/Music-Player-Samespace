import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { toast } from 'react-hot-toast';

const Player = ({ currentSong, nextSong, prevSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    if (currentSong) {
      if (playerRef.current) {
        playerRef.current.unload();
      }
      const sound = new Howl({
        src: [currentSong.url],
        html5: true,
        onplay: () => {
          toast.success('Playing!');
          setIsPlaying(true);
        },
        onpause: () => {
          toast.success('Paused');
          setIsPlaying(false);
        },
        onload: () => {
          setDuration(playerRef.current.duration());
        },
        onend: () => nextSong(),  // Automatically play next song when current one ends
        onstop: () => setIsPlaying(false),
        onseek: () => setCurrentTime(playerRef.current.seek()),
      });
      playerRef.current = sound;
      sound.play();
    }
  }, [currentSong]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && isPlaying) {
        setCurrentTime(playerRef.current.seek());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

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

  const handleSliderChange = (e) => {
    const seekTime = parseFloat(e.target.value);
    playerRef.current.seek(seekTime);
    setCurrentTime(seekTime);
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 text-white w-3/5 h-full">
      {currentSong && (
        <>
          <div className="text-center mb-4">
            <img src={`https://cms.samespace.com/assets/${currentSong.cover}`} alt="Cover" className="w-64 h-64 mb-4 rounded" />
            <h3 className="text-xl">{currentSong.name}</h3>
            <p className="text-gray-400">{currentSong.artist}</p>
          </div>
          <div className="flex items-center justify-center mb-4">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSliderChange}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-center">
            <button onClick={prevSong} className="mr-4">Previous</button>
            <button onClick={isPlaying ? pauseMusic : playMusic} className="mx-4">
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button onClick={nextSong} className="ml-4">Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
