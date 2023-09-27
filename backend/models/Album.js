const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema({
     artist:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Artist"
    },
    title:{
        String,
        required:true
    },
    tracks:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Song"
        }
    ]
});

const album = mongoose.model('album',albumSchema);
module.exports = album;