
const imageMimeTypes = ['image/jpeg','image/png','image/ico']
const Artist = require('../models/Artist');
const Song = require('../models/Song');
const Playlist = require('../models/Playlist');


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
