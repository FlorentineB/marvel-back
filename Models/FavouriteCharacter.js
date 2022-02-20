const mongoose = require("mongoose");

let FavouriteCharacterSchema = mongoose.Schema({
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

FavouriteCharacterSchema.index({ apiid: 1, user: 1 }, { unique: true });

const FavouriteCharacter = mongoose.model(
  "FavouriteCharacter",
  FavouriteCharacterSchema
);

module.exports = FavouriteCharacter;
