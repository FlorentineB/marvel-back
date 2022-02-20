const mongoose = require("mongoose");

let FavouriteComicSchema = mongoose.Schema({
  apiid: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  thumbnail: {
    path: {
      type: String,
    },
    extension: {
      type: String,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

FavouriteComicSchema.index({ apiid: 1, user: 1 }, { unique: true });

const FavouriteComic = mongoose.model("FavouriteComic", FavouriteComicSchema);

module.exports = FavouriteComic;
