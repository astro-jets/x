const express = require("express");
const router = express.Router();
const Controller = require("../controllers/customerController")

//index
router.get("/",Controller.index);

// blogs
router.get("/blogs", Controller.blogs);

// Single Blog
router.get("/blog/:id",Controller.blogSingle);

// Events
router.get("/events",Controller.events);

// Single Event
router.get("/events/:id",Controller.eventSingle);

// Purchase event ticket
router.get("/ticket/:id",Controller.purchaseTicket);

// Validate a ticket
router.post("/validateTicket",Controller.validateQRCode);

// Artist Profile
router.get("/artist/:id",Controller.artistProfile);

// Album
router.get("/album/:id",Controller.album);


// Single Song
router.get("/song/:id",Controller.singleSong);
router.get("/singlesong/:id",Controller.findSongbyId);

router.get("/charts",Controller.charts);

router.get("/playlist/:playlist",Controller.playlist)
router.get("/song/:playlist/:index",Controller.song)
router.get("/getplaylist/:playlist/:index",Controller.getplaylist)

// Search Song
router.post("/search",Controller.searchSong)

// Store
router.get("/store/",async (req,res)=>{res.render("store")});

// Checkout
router.get("/checkout2/",async (req,res)=>{res.render("checkout2")});

// Products
router.get("/products",async (req,res)=>{res.render("products")});
router.get("/products/new",async (req,res)=>{res.render("productsNew")});

router.get("/signup/",async (req,res)=>{res.render("signup")});

module.exports = router;