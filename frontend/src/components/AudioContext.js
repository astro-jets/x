// AudioContext.js
import React, { createContext, useContext, useState } from 'react';

// Create an AudioContext
const AudioContext = createContext();

// Create a custom hook to access the audio context
export const useAudioContext = () => {
  return useContext(AudioContext);
};

// Create an AudioProvider component to wrap your app
export const AudioProvider = ({ children }) => {
  const [audioElement, setAudioElement] = useState(new Audio());
  const [currentSong, setCurrentSong] = useState(null);

  // Function to play a song
  const playSong = (song) => {
    audioElement.src = song.audio;
    audioElement.play();
    setCurrentSong(song);
  };

  // Function to pause the current song
  const pauseSong = () => {
    audioElement.pause();
  };

  return (
    <AudioContext.Provider value={{ audioElement, currentSong, playSong, pauseSong }}>
      {children}
    </AudioContext.Provider>
  );
};
