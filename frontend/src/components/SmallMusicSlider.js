import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import OwlCarousel from 'react-owl-carousel';

import 'owl.carousel/dist/owl.carousel.js'; // Owl Carousel JavaScript
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
  faDownload,
}

from '@fortawesome/free-solid-svg-icons';
const SmallMusicSlider = ({ music,title }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
  const audio = document.getElementById('mainAudio');

  // Define the event handler for the 'ended' event
  const handleAudioEnded = () => {
    if (currentSongIndex < music.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0); // Loop back to the first song
    }
  };

  // Add the 'ended' event listener
  audio.addEventListener('ended', handleAudioEnded);

  // Watch for changes in isPlaying and play/pause the audio accordingly
  if (isPlaying) {
    audio.play();
  } else {
    audio.pause();
  }

  // Cleanup function to remove the 'ended' event listener
  return () => {
    audio.removeEventListener('ended', handleAudioEnded);
  };
}, [currentSongIndex, isPlaying, music]);


  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playPrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      setCurrentSongIndex(music.length - 1); // Go to the last song when at the first song
    }
    setIsPlaying(true); // Start playing the previous song automatically
  };

  const playNext = () => {
    if (currentSongIndex < music.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0); // Go to the first song when at the last song
    }
    setIsPlaying(true); // Start playing the next song automatically
  };

  const currentSong = music[currentSongIndex];

  return (
    <div className="small-music-slider">
      <section className="music-slider col-12 py-3 mt-2">
        <h3 className="text-center text-primary mb-3">{title}</h3>
        <div className="container-fluid">
        <OwlCarousel className='owl-theme' loop items={2} dots={false}  margin={10}>
          {music.map((song, index) => (
            <div key={index} className={`music-item ${currentSongIndex === index ? 'active' : ''}`}>
              <div className="box bg-secondary py-2 flex f-col ac jc" data-id={index} 
                onClick={() => {
                  setCurrentSongIndex(index);
                  setIsPlaying(true);
                  console.log(index)
                }}>
                <img src={song.art} className="rounded"  alt="" />
                <p className="text-light my-1">{song.artist}</p>
                <p className="text-primary m-0">{song.title}</p>
              </div>
            </div>
          ))}
          </OwlCarousel>
        </div>
      </section>
      <section 
      className={`music-list ${isPlaying ? '' : 'hidden'} col-12 py-3 mb-2 px-2`} 
      style={{ position: 'fixed', bottom: 0, zIndex: 800 }}>
        <div className="music-item flex px-2 ac mb-2 col-lg-4 bg-primary-gradient" style={{ background: 'linear-gradient(45deg, rgba(207, 0, 0, 0.85), #000000c2)' }}>
          <div className="avatar w-30">
            <img className={isPlaying ? 'music-art-spin' : ''} src={currentSong?.art} alt="" id="musicArt" />
          </div>
          <div className="music-details mx-4 w-60">
            <div className="stats flex sb col-12" style={{ height: '5vh' }}>
              <div className="stat flex sa ac">
                <FontAwesomeIcon icon={faBackward} id="prev" onClick={playPrevious} />
              </div>
              <div className="stat flex sa ac">
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} id="play" onClick={togglePlayPause} />
              </div>
              <div className="stat flex sa ac col-2">
                <FontAwesomeIcon icon={faForward} id="forward" onClick={playNext} />
              </div>
              <Link to={`/song/${currentSong?.playlist}/${currentSong?.position}`} className="stat text-light flex sa ac">
                <FontAwesomeIcon icon={faDownload} />
              </Link>
            </div>
            <small className="text-light" id="musicTitle">
              {currentSong?.artist} - {currentSong?.title}
            </small>
          </div>
        </div>
        <audio src={`./uploads/songs/${currentSong?.audio}`} id="mainAudio"></audio>
      </section>
    </div>
  );
};

export default SmallMusicSlider;
