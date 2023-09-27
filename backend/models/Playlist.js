const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genres: [{type: String}],
  tracks: [
    {
      type: Object
    }
  ]
});

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist;
