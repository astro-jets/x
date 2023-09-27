const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
     event:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Event"
    },
    expiry:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"unused"
    }
});

const ticket = mongoose.model('ticket',ticketSchema);
module.exports = ticket;