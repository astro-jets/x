const mongoose = require('mongoose')
const {isEmail} = require('validator')

const artistSchema = new mongoose.Schema({
    
    artistname:{
        type:String,
        unique:[true,'That artist is already registered'],
        required:[true,'Please enter a name']
    },
    ig:{
        type:String
    },
    fb:{
        type:String
    },
    tw:{
        type:String
    },
    avatar: {
        type: Buffer
    },
    avatarType: {
        type: String
    },
    created_on:{
        type:Date,
        required:true,
        default:Date.now()
    }
})

artistSchema.virtual('avatarPath').get(function(){
  if(this.avatar != null && this.avatarType != null)
  {
    return `data:${this.avatarType};charset=utf-8;base64,${this.avatar.toString('base64')}`
  }
})

const Artist = mongoose.model('Artist',artistSchema);
module.exports = Artist;