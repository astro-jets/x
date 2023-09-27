const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
  },
  description:[{type: Object}]
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
