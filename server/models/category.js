const { mongoose, Schema } = require('mongoose');
const categorySchema = mongoose.Schema(
  {
    name: String,
    localization: {
      uk: String,
      ru: String,
    },
    items: [{ type: Schema.Types.ObjectId, ref: "Person" }],
  },
  { _id: false }
);

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
