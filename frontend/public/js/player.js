// -----------------------  Single Song Player -------------- //
const singleSongplayer = document.createElement('template');
singleSongplayer.innerHTML=`
<head>
  <link rel="stylesheet" href="../../assets/fontawesome/css/all.min.css" />
  <link rel="stylesheet" href="../../assets/fontawesome/css/fontawesome.min.css" />
  <link rel="stylesheet" href="../../css/style.min.css" />
</head>

<div class="music-player col-12 mt-5">
<audio src="" id="audio"></audio>
  <div class="avatar col-12" style="height: 300px; overflow: hidden">
    <img
      src=""
      style="height: 100%; width: 100%; object-fit: cover"
      id="cover"
      alt=""
    />
  </div>

  <div class="col-12 track-details flex f-col ac jc my-3">
    <h3 class="text-light" id="artist"></h3>
    <p class="text-primary" id="title"></p>
  </div>

  <div class="col-12 track-controls flex ac sa mb-5 text-light font-lg">
    <i id="prev" class="fas fa-backward fa-2x"></i>
    <i id="play" class="fas fa-play fa-3x"></i>
    <i id="next" class="fas fa-forward fa-2x"></i>
  </div>

  <div class="col-12 track-actions flex ac sa mb-5">
    <a
      href="#"
      id="likeBtn"
      class="btn btn-secondary rounded-pill p-2 text-primary flex sb"
    >
      <i class="text-light fas fa-arrow-up mx-2"></i><span>7K</span>
    </a>
    <a
      href="#"
      id="downloadBtn"
      download
      class="btn btn-secondary rounded-pill p-2 text-primary flex sb"
    >
      <i class="text-light fas fa-download mx-2"></i><span>12K</span>
    </a>
    <a
      href="#"
      id="shareBtn"
      class="btn btn-secondary rounded-pill p-2 text-primary flex sb"
    >
      <i class="text-light fas fa-share mx-2"></i><span>500</span>
    </a>
  </div>
  </div>


`
class SingleSongPlayer extends HTMLElement{
    constructor()
    {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(singleSongplayer.content.cloneNode(true));    

        // DOM elements
        this.trackTitle = this.shadowRoot.querySelector("#title");
        this.trackArtist = this.shadowRoot.querySelector("#artist");
        this.coverImage = this.shadowRoot.getElementById("cover");
        this.audio = this.shadowRoot.getElementById('audio');
        this.playBtn = this.shadowRoot.getElementById("play");
        this.nextBtn = this.shadowRoot.getElementById("next");
        this.prevBtn = this.shadowRoot.getElementById("prev");
        this.likeBtn = this.shadowRoot.getElementById("likeBtn");
        this.downloadBtn = this.shadowRoot.getElementById("downloadBtn");
        this.shareBtn = this.shadowRoot.getElementById("shareBtn");

        // Local Variables
        this.music = {};
    }

    // Functions
    togglePlayPause() 
    {
        if (this.audio.paused || this.audio.ended) 
        {
            this.playBtn.classList.remove("fa-play")
            this.playBtn.classList.add("fa-pause")
            this.audio.play();
        } 
        else {
            this.playBtn.classList.add("fa-play")
            this.playBtn.classList.remove("fa-pause")
            this.audio.pause();
        }
    }
    
    initializePlayer()
    {

      try{
        this.coverImage.src =  this.music.art;
        this.audio.src =  "/uploads/songs/"+this.music.location;
        this.trackArtist.innerText = this.music.artist;
        this.trackTitle.innerText = this.music.title;
        let songname = this.music.artist+" - "+this.music.title;
        this.downloadBtn.setAttribute("download", `${songname}.mp3`);
        this.downloadBtn.href = `/uploads/songs/${this.music.location}`;
      }
      catch(e){
        console.log(e.message)
      }
    }

    updatePlayer()
    {
      console.log(this.music)
      this.coverImage.src = this.music.art;
      this.audio.src =  "/uploads/songs/"+this.music.location;
      this.trackArtist.innerText = this.music.artist;
      this.trackTitle.innerText = this.music.title;
      let songname = this.music.artist+" - "+this.music.title;
      this.downloadBtn.setAttribute("download", `${songname}.mp3`);
      this.downloadBtn.href = `/uploads/songs/${this.music.location}`;
      this.togglePlayPause();
    }

    connectedCallback()
    {

      this.fetchData().then(() => {
        this.initializePlayer();
      })
      //Event Listeners
      this.playBtn.addEventListener('click',()=>{
          this.togglePlayPause()
      })
    }

    async fetchData() {
      const id = window.location.href.split("/")[4];
      try {
        const response = await fetch(`/singlesong/${id}`);
        const data = await response.json();
        console.log(data)
        this.music = data;
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }
}
// -----------------------  Single Song Player -------------- //

// -----------------------  Playlist Player -------------- //
const musicplayer = document.createElement('template');
musicplayer.innerHTML=`
<head>
  <link rel="stylesheet" href="../../assets/fontawesome/css/all.min.css" />
  <link rel="stylesheet" href="../../assets/fontawesome/css/fontawesome.min.css" />
  <link rel="stylesheet" href="../../css/style.min.css" />
</head>

<div class="music-player col-12 mt-5">
<audio src="" id="audio"></audio>
  <div class="avatar col-12" style="height: 300px; overflow: hidden">
    <img
      src=""
      style="height: 100%; width: 100%; object-fit: cover"
      id="cover"
      alt=""
    />
  </div>

  <div class="col-12 track-details flex f-col ac jc my-3">
    <h3 class="text-light" id="artist"></h3>
    <p class="text-primary" id="title"></p>
  </div>

  <div class="col-12 track-controls flex ac sa mb-5 text-light font-lg">
    <i id="prev" class="fas fa-backward fa-2x"></i>
    <i id="play" class="fas fa-play fa-3x"></i>
    <i id="next" class="fas fa-forward fa-2x"></i>
  </div>

  <div class="col-12 track-actions flex ac sa mb-5">
    <a
      href="#"
      id="likeBtn"
      class="btn btn-secondary rounded-pill p-2 text-primary flex sb"
    >
      <i class="text-light fas fa-arrow-up mx-2"></i><span>7K</span>
    </a>
    <a
      href="#"
      id="downloadBtn"
      download
      class="btn btn-secondary rounded-pill p-2 text-primary flex sb"
    >
      <i class="text-light fas fa-download mx-2"></i><span>12K</span>
    </a>
    <a
      href="#"
      id="shareBtn"
      class="btn btn-secondary rounded-pill p-2 text-primary flex sb"
    >
      <i class="text-light fas fa-share mx-2"></i><span>500</span>
    </a>
  </div>
  </div>


`
class Player extends HTMLElement{
    constructor()
    {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(musicplayer.content.cloneNode(true));    

        // DOM elements
        this.trackTitle = this.shadowRoot.querySelector("#title");
        this.trackArtist = this.shadowRoot.querySelector("#artist");
        this.coverImage = this.shadowRoot.getElementById("cover");
        this.audio = this.shadowRoot.getElementById('audio');
        this.playBtn = this.shadowRoot.getElementById("play");
        this.nextBtn = this.shadowRoot.getElementById("next");
        this.prevBtn = this.shadowRoot.getElementById("prev");
        this.likeBtn = this.shadowRoot.getElementById("likeBtn");
        this.downloadBtn = this.shadowRoot.getElementById("downloadBtn");
        this.shareBtn = this.shadowRoot.getElementById("shareBtn");

        // Local Variables
        this.music = [];
        this.i = 0;
    }

    // Functions
    togglePlayPause() 
    {
        if (this.audio.paused || this.audio.ended) 
        {
            this.playBtn.classList.remove("fa-play")
            this.playBtn.classList.add("fa-pause")
            this.audio.play();
        } 
        else {
            this.playBtn.classList.add("fa-play")
            this.playBtn.classList.remove("fa-pause")
            this.audio.pause();
        }
    }
    
    initializePlayer()
    {

      try{
        this.coverImage.src =  this.music[this.i].art;
        this.audio.src =  "/uploads/songs/"+this.music[this.i].audio;
        this.trackArtist.innerText = this.music[this.i].artist;
        this.trackTitle.innerText = this.music[this.i].title;
        let songname = this.music[this.i].artist+" - "+this.music[this.i].title;
        this.downloadBtn.setAttribute("download", `${songname}.mp3`);
        this.downloadBtn.href = `/uploads/songs/${this.music[this.i].audio}`;
      }
      catch(e){
        console.log(e.message)
      }
    }

    updatePlayer()
    {
      this.coverImage.src = this.music[this.i].art;
      this.audio.src =  "/uploads/songs/"+this.music[this.i].audio;
      this.trackArtist.innerText = this.music[this.i].artist;
      this.trackTitle.innerText = this.music[this.i].title;
      let songname = this.music[this.i].artist+" - "+this.music[this.i].title;
      this.downloadBtn.setAttribute("download", `${songname}.mp3`);
      this.downloadBtn.href = `/uploads/songs/${this.music[this.i].audio}`;
      this.togglePlayPause();
    }

    connectedCallback()
    {

      this.fetchData().then(() => {
        this.initializePlayer();
      })
      //Event Listeners
      this.nextBtn.addEventListener('click',()=>{
          this.i < this.music.length-1 ? this.i++ : this.i = 0;
          this.updatePlayer()
      })        
      this.prevBtn.addEventListener('click',()=>{
          this.i > 0 ? this.i-- : this.i =0;
          this.updatePlayer()
      })
      this.playBtn.addEventListener('click',()=>{
          this.togglePlayPause()
      })
    }

    async fetchData() {
      const index = window.location.href.split("/")[5]-1;
      const playlist = window.location.href.split("/")[4];

    try {
        const response = await fetch(`/getplaylist/${playlist}/${index}`);
        const data = await response.json();
        this.i = data.index;
        this.music = data.playlist; // Assign the fetched data to the component's variable
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
}
// -----------------------  Playlist Player -------------- //

// -----------------------  Music Slider -------------- //
const musicSlider = document.createElement('template');
musicSlider.innerHTML = `
  <link rel="stylesheet" href="css/style.min.css" />
  <style>
  .owl-stage{
    display:flex;
  }
  box{
    margin:0 2rem;
  }
  </style>
  <section class="music-slider col-12 py-3 mt-2">
    <h3 class="text-center text-primary mb-3" id="playlistName"></h3>
    <div id="musicSlider" class="component-carousel owl-carousel">
    </div>
    <div class="col-12 text-center">
      <small class="text-primary">View all...</small>
    </div>
  </section>
`;

class MusicSlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(musicSlider.content.cloneNode(true));

    // DOM Elements
    this.slider = this.shadowRoot.getElementById('musicSlider');
    this.playlistName = this.shadowRoot.getElementById('playlistName');

    // Local Variables
    this.music = [];
  }

  connectedCallback() {
    this.fetchData().then(() => {
      this.initiateSlider(this.music);
    });
  }

  initiateSlider(data) {
    // Load Music in the slider
    data.forEach(m => {
      const item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML = `
        <div 
          class="box bg-secondary py-2 flex f-col ac jc" 
          data-playlist="${m.playlist}"
          data-id="${m.position}"
        >
          <img src="${m.art}" class="rounded" alt="" />
          <p class="text-light my-1">${m.artist}</p>
          <p class="text-primary m-0">${m.title}</p>
        </div>
      `;

      // Add click event listener to each item
      item.addEventListener('click', () => {
        // Retrieve the song position
        const position = item.firstElementChild.getAttribute('data-id');
        const playlist = item.firstElementChild.getAttribute('data-playlist');

        // Redirect to player with song position as a query parameter
        window.location.href = `/song/${playlist}/${position}`;
      });

      this.slider.appendChild(item);
    })

    // Initialize Owl Carousel
    $(this.slider).owlCarousel({
      loop:true,
	    autoplay: true,
	    margin:30,
	    nav:false,
	    dots: false,
	    autoplayHoverPause: false,
	    pauseHoverPause: true,
	    responsive:{
	      0:{
	        items:2
	      },
	      600:{
	        items:2
	      },
	      1000:{
	        items:3
	      }
	    }
    });
  }

  async fetchData() {
  // Get the value of the "data-url" attribute
  const dataUrl = this.getAttribute('data-url');
  this.playlistName.innerText = dataUrl;
  if (!dataUrl) {
    console.error('Data URL not provided.');
    return Promise.reject('Data URL not provided.');
  }

  try {
      const response = await fetch(`/admin/getPlaylist/${dataUrl}`);
      const data = await response.json();
      console.log(data);
      this.music = data; // Assign the fetched data to the component's variable
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
// -----------------------  Music Slider -------------- //


// ----------------------- Small Music Slider -------------- //
const smallmusicSlider = document.createElement('template');
smallmusicSlider.innerHTML = `
  <link rel="stylesheet" href="../assets//fontawesome/css/all.min.css" />
  <link rel="stylesheet" href="../assets//fontawesome/css/fontawesome.min.css" />
  <link rel="stylesheet" href="css/style.min.css" />
  <style>
    .owl-stage {
      display: flex;
    }
    .box {
      margin: 0 2rem;
    }
    
    /* CSS to hide the player by default */
    .hidden {
      display: none;
    }
    
    /* CSS animation to spin the musicArt image */
    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    
    .music-art-spin {
      animation: spin 3s linear infinite;
    }
  </style>
  <section class="music-slider col-12 py-3 mt-2">
    <h3 class="text-center text-primary mb-3">Top 100 Hits</h3>
    <div id="musicSlider" class="component-carousel owl-carousel"></div>
    <div class="col-12 text-center">
      <small class="text-primary">View all...</small>
    </div>
  </section>

  <section class="music-list hidden col-12 py-3 mb-2 px-2" style="position: fixed; bottom: 0; z-index: 800">
    <div class="music-item flex px-2 ac mb-2 col-lg-4 bg-primary-gradient" style="background: linear-gradient(45deg, rgba(207, 0, 0, 0.85), #000000c2);">
      <div class="avatar w-30">
        <img src="" id="musicArt" alt="" />
      </div>
      <div class="music-details mx-4 w-60">
        <div class="stats flex sb col-12" style="height: 5vh">
          <div class="stat flex sa ac">
            <i class="fas fa-backward mx-2" id="prev"></i>
          </div>
          <div class="stat flex sa ac">
            <i class="fas fa-play mx-2" id="play"></i>
          </div>
          <div class="stat flex sa ac col-2">
            <i class="fas fa-forward mx-2" id="forward"></i>
          </div>
          <a id="downloadBtn" href="" class="stat text-light flex sa ac">
            <i class="fas fa-download mx-2"></i>
          </a>
        </div>
        <small class="text-light" id="musicTitle"></small>
      </div>
    </div>
    <audio src="" id="mainAudio"></audio>
  </section>
`;
class SmallMusicSlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(smallmusicSlider.content.cloneNode(true));

    // DOM Elements
    this.slider = this.shadowRoot.getElementById('musicSlider');
    this.audio = this.shadowRoot.getElementById("mainAudio");
    this.playBtn = this.shadowRoot.getElementById("play");
    this.nextBtn = this.shadowRoot.getElementById("forward");
    this.prevBtn = this.shadowRoot.getElementById("prev");
    this.coverImage = this.shadowRoot.getElementById("musicArt");
    this.trackTitle = this.shadowRoot.getElementById("musicTitle");
    this.downloadBtn = this.shadowRoot.getElementById("downloadBtn");

    // Local Variables
    this.music = [];
    this.i = 0;
  }

  connectedCallback() {
    this.fetchData().then(() => {
      this.initiateSlider(this.music);
      
      //Event Listeners
      this.nextBtn.addEventListener('click',()=>{
          this.i < this.music.length-1 ? this.i++ : this.i = 0;
          this.updatePlayer()
      })        
      this.prevBtn.addEventListener('click',()=>{
          this.i > 0 ? this.i-- : this.i =0;
          this.updatePlayer()
      })
      this.playBtn.addEventListener('click',()=>{
          this.togglePlayPause()
      })
    });
  }

  updatePlayer()
  {
    this.coverImage.src =  this.music[this.i].art;
    this.audio.src =  "uploads/songs/"+this.music[this.i].audio;
    this.trackTitle.innerText = this.music[this.i].artist+" - "+this.music[this.i].title;
    this.downloadBtn.href = `/song/649553d5696817f461b8ac8d/${this.music[this.i].position}`;
    this.togglePlayPause();
  }

  togglePlayPause() {
    if (this.audio.paused || this.audio.ended) {
      this.playBtn.classList.remove("fa-play");
      this.playBtn.classList.add("fa-pause");
      this.audio.play();
      this.coverImage.classList.add("music-art-spin"); // Add the CSS class for spinning animation
      this.shadowRoot.querySelector(".music-list").classList.remove("hidden"); // Remove the hidden class to show the player
    } 
    else {
      this.playBtn.classList.add("fa-play");
      this.playBtn.classList.remove("fa-pause");
      this.audio.pause();
      this.coverImage.classList.remove("music-art-spin"); // Remove the CSS class for spinning animation
    }
  }

  initiateSlider(data) {
    // Load Music in the slider
    data.forEach(m => {
      const item = document.createElement('div');
      item.classList.add('item');
      item.innerHTML = `
        <div class="box bg-secondary py-2 flex f-col ac jc" data-id="${m.position}">
          <img src="${m.art}" class="rounded" alt="" />
          <p class="text-light my-1">${m.artist}</p>
          <p class="text-primary m-0">${m.title}</p>
        </div>
      `;

      // Add click event listener to each item
      item.addEventListener('click', () => {
        // Retrieve the song ID
        const songId = item.firstElementChild.getAttribute('data-id') - 1;
        this.i = songId;
        this.updatePlayer();
      });

      this.slider.appendChild(item);
    })

    // Initialize Owl Carousel
    $(this.slider).owlCarousel({
      loop:true,
	    autoplay: true,
	    margin:30,
	    nav:false,
	    dots: false,
	    autoplayHoverPause: false,
	    pauseHoverPause: true,
	    responsive:{
	      0:{
	        items:2
	      },
	      600:{
	        items:2
	      },
	      1000:{
	        items:3
	      }
	    }
    });
  }

  fetchData() {
  const dataUrl = this.getAttribute('data-url'); // Get the value of the "data-url" attribute
  if (!dataUrl) {
    console.error('Data URL not provided.');
    return Promise.reject('Data URL not provided.');
  }

  return fetch(dataUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.music = data; // Assign the fetched data to the component's variable
    })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }
}
// ----------------------- Small Music Slider -------------- //

window.customElements.define('small-music-slider',SmallMusicSlider);
window.customElements.define('music-slider',MusicSlider);
window.customElements.define('audio-player',Player);
window.customElements.define('single-player',SingleSongPlayer);
