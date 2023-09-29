const express = require("express");
const router = express.Router();
const controller = require('../controllers/adminController')  

// Get Playlist by title asychronously
router.get("/getPlaylist/:title/",controller.getPlaylist);


module.exports = router;