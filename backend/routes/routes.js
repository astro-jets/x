const express = require("express");
const router = express.Router();
const Controller = require("../controllers/customerController")

// Events
router.get("/events",Controller.events);

// Single Event
router.get("/events/:id",Controller.eventSingle);

// Purchase event ticket
router.get("/ticket/:id",Controller.purchaseTicket);

// Validate a ticket
router.post("/validateTicket",Controller.validateQRCode);

router.get("/singlesong/:id",Controller.findSongbyId);

router.get("/playlist/:playlist",Controller.playlist)
router.get("/getplaylist/:pid/:index",Controller.getplaylistByID)
router.get("/getPlaylist/:title/",Controller.getplaylistByTitle);

// Search Song
router.post("/search",Controller.searchSong)


module.exports = router;