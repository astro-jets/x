import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slider';
import Carousel from 'react-bootstrap/Carousel'

import LyricsDisplay from './LyricsDisplay';

import {
  faPlay,
  faPause,
  faDownload,
  faShare,
  faThumbsUp,
  faForward,
  faBackward,
}
from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./css/audio.css"

const SingleSongPlayer = ({ music }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlaylist, setIsPlaylist] = useState(false);
  const initialIndex = music.index - 1 || 0;
  const [currentSongIndex, setCurrentSongIndex] = useState(initialIndex);
  const [audioProgress, setAudioProgress] = useState(0); // Track audio progress

  const audioElement = useRef(null);
  const lyrics = [
    {
      "time": 11.00, // The time in seconds when this lyric line should be displayed
      "text": `Yeah, shit, yeah
      Yeah Still stoned 
      Nigga, you know`
    },
    {
      "time": 18.00,
      "text": "Just got in this bitch, I'm already ready to go Look around, I just see hoes that me and my niggas done had before"
    },
    {
      "time": 23.00,
      "text": "Triple OG at this point, what am I in here for?I could just play the crib and roll up the smoke"
    },
    {
      "time": 34.00,
      "text": `When the smoke let out, invite the coldest bitches to my house
              That's the safer route, bro, that's the player route
              Lay 'em on the couch and bring them flavors out
              Blazing trees up, we making clouds`
    },
    {
      "time": 49.00,
      "text": `Then I hit the stu', they playin' music down
              Picking money up, buying new trucks and riding 'round
              Done it all my life, to me it's second nature now
              Dangerous lifestyle, weak swimmers, they drown
              We all in the castle, I'm the king, you just a court jester clown
`
    },
    {
      "time": 64.00,
      "text": `
          Crew neck, basketball shorts, no socks, low-top Air Force
          I'm all boss, bitch, what you thought? (What you thought?)
          Crew neck, ball shorts, no socks, low-top Air Force
          I'm all boss, bitch, what you thought?
          That's where you lost (That's where you lost) Hahaha`
    },
    {
      "time": 86.00,
      "text": `Still stoned, still home Still thrown, at the same time, I'm still home Yeah`
    },
    {
      "time": 105.00,
      "text": `How much? ($43 thousand fully equipped) That all? (The machine gun turret's extra)
        This is a funny guy Come here, baby (And here, okay, heavy windows) Okay`
    },
    {
      "time": 110.00,
      "text": `And give me one of them phones, you know, with the scrambler (Scrambler?) And a radio with the scanners, to pick up flying saucers
      (Don't forget the fog lights) Oh, in case I get caught in a swamp, that's a good idea
      Get out of the way, lady, we're trying to drive here, man (I thought you were taking me to Frank)
      We've got an hour, you hungry?`
    },

  ]
  useEffect(() => {
    const audio = document.getElementById('mainAudio');

    if (music.playlist) {
      setIsPlaylist(true);
    }

    // Define the event handler for the 'ended' event
    const handleAudioEnded = () => {
      if(isPlaylist){
        if (currentSongIndex < music.playlist.length - 1) {
          setCurrentSongIndex(currentSongIndex + 1);
        } else {
          setCurrentSongIndex(0); // Loop back to the first song
        }
      }else{
        setIsPlaying(false)
        setAudioProgress(0)
      }
    };

    // Define the event handler for the 'timeupdate' event
    const handleTimeUpdate = () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      setAudioProgress(progress);
    };

    // Add the 'ended' and 'timeupdate' event listeners
    audio.addEventListener('ended', handleAudioEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    // Watch for changes in isPlaying and play/pause the audio accordingly
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }

    // Cleanup function to remove the 'ended' and 'timeupdate' event listeners
    return () => {
      audio.removeEventListener('ended', handleAudioEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentSongIndex, isPlaying, music]);

  // Function to handle changing the playback position
  const handleSeek = (value) => {
    const newTime = (value * audioElement.current.duration) / 100;
    audioElement.current.currentTime = newTime;
    setAudioProgress(value);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playPrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      setCurrentSongIndex(music.playlist.length - 1); // Go to the last song when at the first song
    }
    setIsPlaying(true); // Start playing the previous song automatically
  };

  const playNext = () => {
    if (currentSongIndex < music.playlist.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0); // Go to the first song when at the last song
    }
    setIsPlaying(true); // Start playing the next song automatically
  };

  const currentSong = isPlaylist ? music.playlist[currentSongIndex] : music;

  return (
    <div className="music-player col-12 mt-5">
      <Carousel controls={false} indicators={false} interval={null}>
        <Carousel.Item>
          <div className="avatar col-12" style={{height: '300px', overflow: 'hidden'}}>
            <img
              src={currentSong?.art}
              style={{height: "100%", width: "100%", objectFit: "cover"}}
              id="cover"
              alt=""
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <h1 className="text-center mt-3"> Lyrics</h1>
          <LyricsDisplay
            song={`/uploads/songs/${currentSong?.location}`}
            audioElement={audioElement}
            lyrics={lyrics}
          />
        </Carousel.Item>
      </Carousel>

      <div className="col-12 track-details flex f-col ac jc my-3">
        <h3 className="text-light" id="artist">{currentSong?.artist}</h3>
        <p className="text-primary" id="title">{currentSong?.title}</p>
      </div>

      {/* Audio Seek */}
      <div className="col-12 mb-4 flex ac jc f-col">
        <Slider
          min={0}
          max={100}
          value={audioProgress}
          onChange={handleSeek}
          className="custom-slider" // You can add your custom class for styling
        />
      </div>

      <div className="col-12 track-controls flex ac sa mb-5 text-light font-lg">
        {isPlaylist ? <FontAwesomeIcon icon={faBackward} className='fa-2x' onClick={playPrevious}/> : ''}
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay}
          className="fa-3x"
          onClick={togglePlayPause}/>
        {isPlaylist ? <FontAwesomeIcon icon={faForward}  className='fa-2x' onClick={playNext}/> : ''}
      </div>

      <div className="col-12 track-actions flex ac sa mb-5">
        <a
          href="#"
          className="btn btn-secondary rounded-pill p-2 text-primary flex sb"
        >
          <FontAwesomeIcon icon={faThumbsUp}  className='mx-1 text-light'></FontAwesomeIcon>
          <span>7K</span>
        </a>
        <a
          href={`/uploads/songs/${currentSong?.location}`}
          download
          className="btn btn-secondary rounded-pill p-2 text-primary flex sb"
        >
        <FontAwesomeIcon icon={faDownload}  className='text-light mx-1'></FontAwesomeIcon>
          <span>12K</span>
        </a>
        <a
          href="#"
          className="btn btn-secondary rounded-pill p-2 text-primary flex sb"
        >
          <FontAwesomeIcon icon={faShare} className='mx-1 text-light'></FontAwesomeIcon>
          <span>500</span>
        </a>
      </div>

      <audio id="mainAudio" ref={audioElement} src={`/uploads/songs/${currentSong?.location}`} preload='auto'></audio>
    </div>
  );
};

export default SingleSongPlayer;
