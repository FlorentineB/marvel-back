const mongoose = require("mongoose");

const FavouriteCharacter = mongoose.model("FavouriteCharacter", {
  apiid: {
    type: String,
  },
  name: {
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

module.exports = FavouriteCharacter;
