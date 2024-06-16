import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { toast } from 'react-hot-toast';
import { BsThreeDots, BsFillPlayFill, BsFillPauseFill, BsFillVolumeUpFill, BsFillVolumeMuteFill } from 'react-icons/bs';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import "../App.css";

const Player = ({ currentSong, nextSong, prevSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    if (currentSong) {
      if (playerRef.current) {
        playerRef.current.unload();
      }
      const sound = new Howl({
        src: [currentSong.url],
        html5: true,
        mute: isMuted,
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
        onend: () => nextSong(), // Automatically play next song when current one ends
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

  const toggleMute = () => {
    if (playerRef.current) {
      playerRef.current.mute(!isMuted); // Toggle mute state
      setIsMuted(!isMuted); // Update state
    }
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="flex flex-col mx-auto sm:mx-0 items-center justify-center md:justify-normal py-11 md:py-12 p-0 sm:p-4 text-white w-full md:w-3/5 h-full">
      {currentSong && (
        <>
          <div className="mb-4 flex flex-col items-start">
            <h3 className="text-4xl md:text-3xl leading-9 font-bold tracking-wide text-center md:text-left">{currentSong.name}</h3>
            <p className="text-gray-400 text-xl md:text-lg font-normal leading-6 tracking-wide pb-8 pt-2 text-center md:text-left">{currentSong.artist}</p>
            <img 
              src={`https://cms.samespace.com/assets/${currentSong.cover}`} 
              alt="Cover" 
              className="w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] md:w-[360px] md:h-[360px] lg:w-[470px] lg:h-[470px] rounded-lg" 
            />
          </div>
          <div className="flex items-center justify-center mb-4 w-[320px] sm:w-[500px] md:w-[360px] lg:w-[470px]">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleSliderChange}
              className="w-full"
            />
          </div>
          <div className="flex justify-between w-[320px] sm:w-[500px] md:w-[360px] lg:w-[470px] my-5 gap-x-5 sm:gap-x-8 md:gap-x-8 lg:gap-x-10">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white bg-opacity-20">
              <BsThreeDots size={28} className='text-white' />
            </div>
            <div className="flex items-center justify-center space-x-8">
              <button className='text-white text-opacity-50' onClick={prevSong}><TbPlayerTrackPrevFilled size={32} /></button>
              <div className='w-12 h-12 rounded-full flex items-center justify-center bg-white'>
                <button className='text-black' onClick={isPlaying ? pauseMusic : playMusic}>
                  {isPlaying ? <BsFillPauseFill size={28} /> : <BsFillPlayFill size={28} />}
                </button>
              </div>
              <button className='text-white text-opacity-50' onClick={nextSong}><TbPlayerTrackNextFilled size={32} /></button>
            </div>
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white bg-opacity-20 cursor-pointer" onClick={toggleMute}>
              {isMuted ? <BsFillVolumeMuteFill size={28} className='text-white' /> : <BsFillVolumeUpFill size={28} className='text-white' />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
