const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);