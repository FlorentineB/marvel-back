const mongoose = require("mongoose");

const FavouriteComic = mongoose.model("FavouriteComic", {
  apiid: {
    type: String,
    unique: true,
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

module.exports = FavouriteComic;
