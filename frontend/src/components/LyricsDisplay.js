import React, { useState, useEffect } from 'react';
import './css/lyrics.css'

const LyricsDisplay = ({ song, audioElement,lyrics }) => {
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

  useEffect(() => {
    const audio = audioElement.current;

    const updateLyrics = () => {
      const currentTime = audio.currentTime;

      // Loop through the lyrics and find the one that matches the current time
      for (let i = 0; i < lyrics.length; i++) {
        const lyricTime = lyrics[i].time;

        if (lyricTime >= currentTime) {
          setCurrentLyricIndex(i);
          break; // Stop searching once we find the correct lyric
        }
      }
    };

    audio.addEventListener('timeupdate', updateLyrics);

    // Clean up the event listener when the component unmounts
    return () => {
      audio.removeEventListener('timeupdate', updateLyrics);
    };
  }, [song, audioElement]);

  return (
    <div className="lyrics-container">
      <p className="current-lyric">{lyrics[currentLyricIndex].text}</p>
    </div>
  );
};

export default LyricsDisplay;