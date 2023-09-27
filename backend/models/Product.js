const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:{type:String},
  price: {type: Int},
  description:{type: Object}
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
