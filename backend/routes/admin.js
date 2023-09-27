const imageMimeTypes = ['image/jpeg','image/png','image/ico']
const express = require("express");
const router = express.Router();
const multer = require('multer');
const songUpload = multer({ 
    dest: 'public/uploads/songs',
    limits: {
    fieldSize: 18 * 1024 * 1024,
  },
});
const Song = require('../models/Song')  
const controller = require('../controllers/adminController')  

router.get("/",async (req,res)=>{res.render("admin/index",{layout:"layouts/admin"})});

router.get("/artists/",controller.allArtists);
router.get("/artists/new",controller.newArtist);
router.post("/artists/new",controller.saveArtist);

router.get("/events",controller.allEvents);
router.get("/events/new",controller.newEvent);
router.post("/events/new",controller.saveEvent);

router.get("/playlist",controller.playlist);
router.get("/playlist/new",controller.newPlaylist);
router.post("/playlist/new",controller.savePlaylist);
router.get("/playlist/:id/edit",controller.editPlaylist);

// Get Playlist by title asychronously
router.get("/getPlaylist/:title/",controller.getPlaylist);
router.post("/playlist/updatePlaylist",controller.updatePlaylist);


router.get("/tracks",controller.allTracks);
router.get("/tracks/new",controller.newSong);
router.post("/tracks/new", songUpload.single("song"), async (req, res) => {
    
    const song = req.file != null ? req.file.filename : null;

    const songDetails = {
      artist: req.body.artist,
      featuring: req.body.featuring,
      title: req.body.title,
      genre: req.body.genre,
      location: song,
      duration: req.body.duration,
      lyrics: req.body.lyrics
    };
    // Save thumbnail
    saveThumbnail(songDetails, req.body.art);
    try {
        const newSong = await Song.create(songDetails);
        if (newSong) {
        res.redirect("/admin/tracks/new");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
})

// Searching a song
router.get("/search/:term",controller.searchSongs);

// Products
router.get("/products/",controller.searchSongs);
router.get("/products/new",async(req,res)=>{res.render("admin/productsNew",{layout:"layouts/admin"})});
router.post("/products/new",async(req,res)=>{
    try{
    console.log("this is the body => ",req.body)
    res.send(req.body.name)
    }
    catch(e){
        res.send(e.message)
    }
});


// Saving an art in the DB
function saveThumbnail(artistDetails, encodedart)
{
    if(encodedart == null){return}

    const art = JSON.parse(encodedart)
    if(art != null && imageMimeTypes.includes(art.type))
    {
        artistDetails.art = new Buffer.from(art.data, 'base64')
        artistDetails.artType = art.type
    }
}


module.exports = router;