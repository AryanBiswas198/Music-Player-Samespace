import React from 'react';
import Logo from "../assets/Spotify.png"
import pfp from "../assets/AryanPhoto.jpeg"

const Sidebar = () => {
  return (
    <div className="flex flex-col max-h-[98vh] justify-between px-8 w-1/5 text-black sticky top-0 left-0">
      <div className='mt-3'>
        <img src={Logo} alt='Spotify' className='w-32 cursor-pointer' />
      </div>
      <div className='sticky bottom-5 left-0'>
        <img src={pfp} alt="Profile" className="rounded-full w-11 my-5" />
      </div>
    </div>
  );
};

export default Sidebar;
