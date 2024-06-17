import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import Player from '../components/Player';
import WelcomeMessage from '../components/WelcomeMessage';
import ColorThief from 'color-thief-browser';
import { FaTimes } from 'react-icons/fa';
import Logo from "../assets/Spotify.png"
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const MainLayout = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
  });

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL);
        const fetchedSongs = response.data.data.map((song, index) => ({
          ...song,
          originalIndex: index
        }));
        setSongs(fetchedSongs);
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

    useEffect(() => {
      if (currentSongIndex !== null && songs.length > 0) {
        const currentSong = songs[currentSongIndex];
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = `${process.env.REACT_APP_IMAGE_URL}${currentSong.cover}`;
        img.onload = () => {
          const colorThief = new ColorThief();
          const colors = colorThief.getColor(img);
          const darkenedColor = colors.map(color => Math.floor(color * 0.5));
          setBackgroundStyle({
            background: `linear-gradient(to left, rgba(${darkenedColor[0]}, ${darkenedColor[1]}, ${darkenedColor[2]}, 2), rgba(${darkenedColor[0]}, ${darkenedColor[1]}, ${darkenedColor[2]}, 1))`,
            transition: 'background-position 0.5s ease-in-out'
          });
        };
      }
    }, [currentSongIndex, songs]);

  const handleSongClick = (index) => {
    setCurrentSongIndex(index);
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[100vh] min-w-[100vw] h-full bg-gray-950 py-5" style={backgroundStyle}>
      <Navbar onMenuClick={toggleMenu} />
      <Sidebar />
      <div className='flex w-full mx-auto md:ml-1 xl:ml-8'>
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <ClipLoader size={150} color={"#ffffff"} loading={loading} />
          </div>
        ) : (
          <>
            {isDesktopOrLaptop && (
              <Content songs={songs} currentSongIndex={currentSongIndex} onSongClick={handleSongClick} />
            )}
            {currentSongIndex !== null ? (
              <Player
                currentSong={songs[currentSongIndex]}
                nextSong={nextSong}
                prevSong={prevSong}
              />
            ) : (
              <WelcomeMessage onButtonClick={toggleMenu} />
            )}
          </>
        )}
      </div>

      <div
        className={`fixed md:hidden top-0 left-0 h-full bg-gray-950 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '75%', overflowY: 'auto' } }
      >
        {/* Cross Icon */}
        <div className="flex justify-between p-4 mt-1">
          <img src={Logo} alt="Spotify" className="w-32 cursor-pointer" />
          <FaTimes size={32} className="text-white cursor-pointer" onClick={toggleMenu} />
        </div>
        <Content songs={songs} currentSongIndex={currentSongIndex} onSongClick={handleSongClick} />
      </div>
    </div>
  );
};

export default MainLayout;
