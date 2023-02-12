const { mongoose, Schema } = require('mongoose');

const itemSchema = mongoose.Schema({
  name: String,
  localization: {
    uk: String,
    ru: String,
  },
  image: String,
  description: String,
  price: Number,
  weight: Number,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

const ItemModel = mongoose.model('Item', itemSchema);

module.exports = ItemModel;
