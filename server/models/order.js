const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  name: String,
//  id: Number,
  _id: Number,
  first_name: String,
  last_name: String,
  created: Date,
  contact: String
})

const OrderModel = mongoose.model('Order', orderSchema)

module.exports = OrderModel