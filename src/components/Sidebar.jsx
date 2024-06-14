import React from 'react';
import Logo from "../assets/Spotify.png"
import pfp from "../assets/AryanPhoto.jpeg"

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between px-8 w-1/5 text-black">
      <div>
        <img src={Logo} alt='Spotify' className='w-32 cursor-pointer' />
      </div>
      <div>
        <img src={pfp} alt="Profile" className="rounded-full w-11 my-5" />
      </div>
    </div>
  );
};

export default Sidebar;
