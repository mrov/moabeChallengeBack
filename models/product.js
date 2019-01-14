const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: String,
  category: String,
  sales: { type: Number, default: 0 }
});

var productModel = mongoose.model('product', productSchema);

module.exports = productModel;