const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    venue:{
        type: String,
        required:true
    },
    date:{
        type: String,
        required:true
    },
    time:{
        type: String,
        required:true
    },
    availableTickets: {
        type: Number,
        required:true
    },
    avatar:{
        type:Buffer,
        required:true
    },
    avatarType:{
        type:String,
        required:true
    },
})

eventSchema.virtual('poster').get(function(){
  if(this.avatar != null && this.avatarType != null)
  {
    return `data:${this.avatarType};charset=utf-8;base64,${this.avatar.toString('base64')}`
  }
})
const event = mongoose.model('Event',eventSchema);
module.exports = event;