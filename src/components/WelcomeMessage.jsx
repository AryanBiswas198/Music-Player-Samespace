import React from 'react';
import welcomeImage from '../assets/WelcomeMemoji.png';

const WelcomeMessage = ({onButtonClick}) => {
  return (
    <div className="flex flex-col mx-auto items-center justify-center md:justify-normal text-white py-12 md:py-16 p-0 sm:p-4 w-full md:w-3/5 h-full">
        <img src={welcomeImage} alt="Welcome" className="mb-4 w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96" />
        <h1 className="text-4xl lg:text-5xl font-bold my-1.5 md:my-3">Welcome to <span className='text-green-400'>Spotify</span></h1>
        <p className="text-lg md:text-xl text-gray-400 mb-4">Select a song to start playing music</p>
        <button onClick={onButtonClick} className="bg-green-600 text-white text-lg font-semibold py-2 px-4 rounded-lg md:hidden">Choose a Song</button>
    </div>
  );
};

export default WelcomeMessage;
