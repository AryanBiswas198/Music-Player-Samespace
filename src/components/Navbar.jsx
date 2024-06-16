import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import pfp from '../assets/AryanPhoto.jpeg';
import Logo from '../assets/Spotify.png';

const Navbar = ({ onMenuClick }) => {
  return (
    <div className="flex h-10 justify-between items-center p-4 text-white md:hidden mt-3 mb-6">
      <div className="flex items-center">
        <FaBars size={32} className="mr-4 cursor-pointer" onClick={onMenuClick} />
        <img src={Logo} alt="Spotify" className="w-32 cursor-pointer" />
      </div>
      <a href="https://aryanbiswas198.vercel.app/" target="_blank" rel="noopener noreferrer">
        <img src={pfp} alt="Profile" className="rounded-full w-11 cursor-pointer" />
      </a>
    </div>
  );
};

export default Navbar;
