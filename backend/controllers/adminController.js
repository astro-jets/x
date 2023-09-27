
const imageMimeTypes = ['image/jpeg','image/png','image/ico']
const Artist = require('../models/Artist');
const Song = require('../models/Song');
const Playlist = require('../models/Playlist');

//Artists Page
module.exports.allArtists = async (req,res)=>{
    try{
        const artists = await Artist.find();
        res.render('admin/artists',{
            artists:artists,
            layout:'layouts/admin'
        })
    }
    catch(err){}
}
//New Artist page
module.exports.newArtist = async (req,res)=>{
    try{
        res.render('admin/artistNew',{layout:'layouts/admin'})
    }
    catch(err){}
}
//Save Artist
module.exports.saveArtist = async (req,res)=>{
    try
    {
        const artistDetails = {
            artistname:req.body.name,
            fb:req.body.fb,
            tw:req.body.tw,
            ig:req.body.ig,
        }
        saveThumbnail(artistDetails,req.body.avatar)
        const newArtist = await Artist.create(artistDetails);
        if(newArtist)
        {
            res.render('admin/artistNew',{layout:'layouts/admin'})
        }
    }
    catch(err){
        res.send(err.message);
    }
}

// All Events
module.exports.allEvents = async (req,res)=>{res.render("admin/events",{layout:"layouts/admin"})}
module.exports.newEvent = async (req,res)=>{res.render("admin/eventsNew",{layout:"layouts/admin"})}
module.exports.saveEvent = async (req,res)=>{res.send(req.body)}

// All Tracks
module.exports.allTracks = async (req,res)=>{
  try{
    const tracks = await Song.find();
    res.render("admin/tracks",{tracks,layout:"layouts/admin"})
  }
  catch(e){}
}
module.exports.newSong =async (req,res)=>{
    try{
        const artists = await Artist.find();
        res.render('admin/tracksNew',{artists:artists,layout:'layouts/admin'})
    }
    catch(err){}
}

// Playlist or Charts
module.exports.playlist = async (req,res)=>{
  const playlists = await Playlist.find();
  res.render("admin/playlist",{
    layout:"layouts/admin",
    playlists:playlists
  })
}
module.exports.newPlaylist = async (req,res)=>{res.render("admin/playlistNew",{layout:"layouts/admin"})}
module.exports.editPlaylist = async (req,res)=>{res.render("admin/playlistEdit",{layout:"layouts/admin"})}
module.exports.savePlaylist = async (req, res) => {
  try {
    const { title, genres, tracks } = req.body;

    // Create a new playlist instance
    const playlist = new Playlist({
      title,
      genres,
      tracks
    });

    // Save the playlist to the database
    await playlist.save();

    res.json({ message: 'Playlist saved successfully!' });
  } catch (error) {
    console.error('Error saving playlist:', error);
    res.status(500).json({ error: 'Failed to save playlist.' });
  }
};
module.exports.updatePlaylist = async (req,res)=>{
  try {
    const { title, genres, tracks } = req.body;

    // Create a new playlist instance
    const playlist = new Playlist({
      title,
      genres,
      tracks
    });

    // Save the playlist to the database
    await playlist.save();

    res.json({ message: 'Playlist saved successfully!' });
  } catch (error) {
    console.error('Error saving playlist:', error);
    res.status(500).json({ error: 'Failed to save playlist.' });
  }
};
module.exports.getPlaylist = async (req,res)=>{
    const title = req.params.title;
  try{
    const playlist = await renderPlaylist(title);
    res.status(200).send(playlist);
  }
  catch(e){}
}

// Search Song
module.exports.searchSongs = async (req, res) => {
  try {
    const searchTerm = req.params.term;

    // Create a case-insensitive regular expression pattern
    const regexPattern = new RegExp(searchTerm, 'i');

    // Search the database for songs matching the search term
    const songs = await Song.find({ title: { $regex: regexPattern } });

    // Populate the 'artist' field using 'Artist.findById()'
    const results = await Promise.all(
      songs.map(async (song) => {
        const artist = await Artist.findById(song.artist);

        const artPath = song.artPath; // Get the album art path from the virtual getter

        return {
          ...song._doc,
          artist: artist.artistname,
          artPath: song.artPath, // Include the 'artPath' field in the results
        };
      })
    );

    res.json(results);
  } catch (error) {
    console.error('Error searching songs:', error);
    res.status(500).json({ error: 'Failed to perform search.' });
  }
};

// Render Playlist
async function renderPlaylist(title)
{
    const playlist = await Playlist.findOne({title:title});
    const tracks = []
    for(let i = 0; i < playlist.tracks.length; i++){
        const song = playlist.tracks[i];
        const s = await Song.findById(song.id);
        tracks.push({
            "playlist":playlist.id,
            "id":s.id,
            "position":song.position,
            "artist":song.artist,
            "title":s.title,
            "art":s.artPath,
            "audio":s.location
        });
    }
    return(tracks);
}

// Saving an avatar in the DB
function saveThumbnail(artistDetails, encodedAvatar)
{
    if(encodedAvatar == null){return}

    const avatar = JSON.parse(encodedAvatar)
    if(avatar != null && imageMimeTypes.includes(avatar.type))
    {
        artistDetails.avatar = new Buffer.from(avatar.data, 'base64')
        artistDetails.avatarType = avatar.type
    }
}
