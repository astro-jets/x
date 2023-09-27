const imageMimeTypes = ['image/jpeg','image/png','image/ico']
const Song = require('../models/Song');
const Artist = require('../models/Artist');

//Index Page
module.exports.index = async (req,res)=>{
    try{
        const songs = await Song.find();
        res.render('admin/tracks',{
            songs:songs,
            layout:'layouts/admin'
        })
    }
    catch(err){}
}

//New Song page


// Save Song
module.exports.save = async (req, res) => {
    
    const song = req.file != null ? req.file.filename : null;

    const songDetails = {
      artist: req.body.artist,
      featuring: req.body.featuring,
      title: req.body.title,
      location: song,
      duration: req.body.duration,
      lyrics: req.body.lyrics
    };
    // Save thumbnail
    saveThumbnail(songDetails, req.body.art);
    res.send(songDetails)
    try {
        const newSong = await Song.create(songDetails);
        if (newSong) {
        res.render('admin/tracksNew', { layout: 'layouts/admin' });
        }
    } catch (err) {
        res.send(err);
    }
};

// Saving an avatar in the DB
function saveThumbnail(songDetails, encodedAvatar)
{
    if(encodedAvatar == null){return}

    const avatar = JSON.parse(encodedAvatar)
    if(avatar != null && imageMimeTypes.includes(avatar.type))
    {
        songDetails.avatar = new Buffer.from(avatar.data, 'base64')
        songDetails.avatarType = avatar.type
    }
}
