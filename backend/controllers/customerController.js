require('dotenv').config();
const QRCode = require('qrcode');
const crypto = require('crypto');

const Song = require("../models/Song")
const Playlist = require("../models/Playlist")
const Artist = require("../models/Artist")
const Event = require("../models/Event")
const Ticket = require("../models/Ticket")

// Studio XLanding Page
module.exports.index = async (req,res)=>{res.render('index')};

// Studio X Playlists/Charts Page
module.exports.charts = async (req,res)=>{
    const playlist = await Playlist.find();
    const charts = playlist.map(p => p.title);
    res.render('playlists',{charts})
}

// Studio X GET Playlists with playlist ID and the current selected track
module.exports.playlist = async (req,res)=>{
    try{
        const playlist = await renderPlaylist(req.params.playlist);
        res.status(200).send(playlist);
    }
    catch(err){
        console.log(err.message)
        res.status(500).send(err.message)
    }
}

// Studio X Blogs Page
module.exports.blogs = async (req,res)=>{res.render('blogs')}

// Studuio X single Blog
module.exports.blogSingle = async (req,res)=>{res.render('blogsingle')}

// Studuio X Events Page
module.exports.events = async (req,res)=>{
    try{
        const results = await Event.find();

        const events = results?.map(r=>(
            {
                id:r._id,
                name:r.name,
                venue:r.venue,
                time:r.time,
                date:r.date,
                poster:r.poster
            })
        );

        res.status(200).send(events)
    }
    catch(e){
        res.status(500).send(e.message);
    }
};

// Studuio X Event Single
module.exports.eventSingle = async (req,res)=>{
    const id = req.params.id
    try{
        const results = await Event.findById(id);
        if(results){
            const event = 
            {
                id:results._id,
                name:results.name,
                venue:results.venue,
                time:results.time,
                date:results.date,
                poster:results.poster,
                tickets:results.availableTickets
            };
            res.status(200).send(event);
        }
    }
    catch(e){
        res.status(500).send(e.message);
    }
}

// Studuio X Artist Profile
module.exports.artistProfile = async (req,res)=>{res.render('profile')}

// Studuio X Album
module.exports.album = async (req,res)=>{res.render('album')}

// Studuio X One Song
module.exports.findSongbyId = async (req,res)=>{
    const id = req.params.id;
    try{
        const song = await Song.findById(id);
        const artist = await Artist.findById(song.artist);

        const track = {
            id:song.id,
            location:song.location,
            art:song.artPath,
            title:song.title,
            features:song.featuring,
            artist:artist.artistname
        }
        res.status(200).json(track)
    }catch(e){
        res.status(500).send(e.message);
    }
}
module.exports.song = async (req,res)=>{
    res.render('song');
}
module.exports.singleSong = async (req,res)=>{
    const song = await Song.findById(req.params.id);
    res.render('singleSong',{song});
}
module.exports.getplaylist = async (req,res)=>{
    try{
        const index = req.params.index;
        const playlist = await renderPlaylist(req.params.playlist);
        data = {
            index,
            playlist
        }
        res.status(200).send(data);
    }catch(e){res.status(500).send(e);}
}

// Studio X Search Song
module.exports.searchSong = async (req, res) => {
  try {
    const searchQuery = req.body.search;
    
    // Search for songs that match the title
    const songResults = await Song.find({
      title: { $regex: searchQuery, $options: 'i' },
    }).populate('artist');

    // Search for artists that match the artist name
    const artist = await Artist.find({
      artistname: { $regex: searchQuery, $options: 'i' },
    });

    if(songResults || artist){
    console.log(artist.length,"=>",songResults.length)

    const combinedResults = [];

    // Convert song and artist results into the desired format and push to the combined array
    songResults.forEach(song => {
      combinedResults.push({
        song:song,
        artist: song.artist.artistname
      });
    });

    for (let i = 0; i < artist.length - 1; i++) {
        const a = artist[i];
        const tracks = await Song.find({artist:a.id});
        for (let i = 0; i < tracks.length - 1; i++) {
            const t = tracks[i];
            combinedResults.push({
                song:t,
                artist: a.artistname,
            });  
        }
    }
    
    res.status(200).json(combinedResults);
}
  } 
  
// try{
//     const query  = req.body.search;
//     console.log(query)
//     // Split the user's query into individual terms
//     const searchTerms = query.split(' ').filter(term => term.trim() !== '');

//     // Create an array to hold the MongoDB query conditions
//     const queryConditions = [];

//     // Construct conditions for each search term
//     for (const term of searchTerms) {
//       queryConditions.push({ artistname: new RegExp(term, 'i') }); // Case-insensitive artist name search
//       queryConditions.push({ title: new RegExp(term, 'i') }); // Case-insensitive song title search
//     }

//     // Construct the final MongoDB query using the $or operator
//     const searchQuery = { $or: queryConditions };

//     // Execute the query and retrieve matching songs
//     const searchResults = await Song.find(searchQuery);
//     res.send(searchResults)
//   }
  catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ error: `An error occurred while searching. ${error.message}` });
  }
};

// Purchase a ticket for an event (simulated)
module.exports.purchaseTicket = async (req, res) => {
  const eventId = req.params.id;

  // Find the event by eventId (you'd typically query your database here)
  const event = await Event.findById(eventId);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  // Simulate ticket purchase logic (marking the ticket as sold)
  if (event.availableTickets > 0) {
    event.availableTickets -= 1;
    await event.save();

    // Ticket Details
    const ticketData = {
      event: event.id,
      expiry: '2023-12-31',
    };

    try {
      // Store the purchased ticket (you'd typically update your database here)
      const ticket = await Ticket.create(ticketData);

      const encryptedToken = JSON.stringify(encryptToken(ticket._id));
      
      // Generate a QR code with the ticket ID as a JSON string
      const qrCode = await QRCode.toDataURL(JSON.stringify(encryptedToken));

      // Respond with the QR code data (you'd send this to the user's email)
      res.json({ qrCode, ticket });

      // You can now send the QR code via email to the user for scanning.
    } catch (error) {
      console.error('Error generating QR code:', error);
      res.status(500).json({ error: 'Ticket purchase failed' });
    }
  } else {
    res.status(400).json({ error: 'No available tickets' });
  }
};


module.exports.validateQRCode = async (req, res) => {
    const data = req.body.qrCodeData;
    let message = "";
    try {
        // Parse the JSON data from the 'data' string
        const qrCodeData = JSON.parse(data);
        const a = JSON.parse(qrCodeData.text);
        const b = JSON.parse(a)
        const c = decryptTokenData(b.data,b.iv);

        const ticket = await Ticket.findById(c);

        if(ticket){
            if(ticket.status === "unused")
            {
                ticket.status = "used";
                await ticket.save();
                message = "Ticket Approved!";
            }else{message = "Already Used";}
        } 
        res.status(200).send({msg:message});
    } catch (error) {
        if(error.name === "CastError")
        {
            res.status(200).send({msg:"Ivalid Ticket!"})
        }
        
    }
};


// Render playlist
async function renderPlaylist(id)
{
    const playlist = await Playlist.findById(id);
    const tracks = []
    for(let i = 0; i < playlist.tracks.length; i++){
        const song = playlist.tracks[i];
        const s = await Song.findById(song.id);
        tracks.push({
            "id":s.id,
            "position":song.position,
            "artist":song.artist,
            "title":s.title,
            "art":s.artPath,
            "location":s.location
        });
    }
    return(tracks);
}

// Encrypt Token
function encryptToken(token) {
  const algorithm = 'aes-256-cbc';
  const encryptionKey = process.env.KEY;
  const iv = crypto.randomBytes(16);

  const encryptionKeyBuffer = Buffer.from(encryptionKey, 'hex');
  const cipher = crypto.createCipheriv(algorithm, encryptionKeyBuffer, iv);
  const encryptedToken = Buffer.concat([cipher.update(token.toString()), cipher.final()]);

  // Return the encrypted token and initialization vector (iv)
  return {
    data: encryptedToken.toString('hex'),
    iv: iv.toString('hex'),
  };
}

// Decrypt Function
function decryptTokenData(encryptedTokenData, iv) {
    const algorithm = 'aes-256-cbc';
    const encryptionKey = process.env.KEY;
    const ivBuffer = Buffer.from(iv, 'hex');
    const encryptedTokenBuffer = Buffer.from(encryptedTokenData, 'hex');

    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionKey, 'hex'), ivBuffer);
    const decryptedToken = Buffer.concat([decipher.update(encryptedTokenBuffer), decipher.final()]);

    return decryptedToken.toString();
}