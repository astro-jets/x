const mongoose = require('mongoose')
const songSchema = new mongoose.Schema({
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Artist"
    },
    featuring:{
        type:String,
    },
    title:{
        type: String,
        required:true
    },
    duration:{
        type: String,
        required:true
    },
    location:{
        type: String,
        required:true
    },
    lyrics: {
        type: String,
        required:true
    },
    art:{
        type:Buffer,
        required:true
    },
    artType:{
        type:String,
        required:true
    },
    genre:[{
        type:String,
        required:false
    }]
})

songSchema.virtual('artPath').get(function(){
  if(this.art != null && this.artType != null)
  {
    return `data:${this.artType};charset=utf-8;base64,${this.art.toString('base64')}`
  }
})
const song = mongoose.model('Song',songSchema);
module.exports = song;