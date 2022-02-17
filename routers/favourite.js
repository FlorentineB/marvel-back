const express = require("express");
const router = express.Router();
const axios = require("axios");
import isAuthenticated from "./isAuthenticated.js";
import FavouriteCharacter from "../Models/FavouriteCharacter";
import FavouriteComic from "../Models/FavouriteComic";

// Route pour récupérer tous les comics favoris d'un user
router.get("/favourite/comics", isAuthenticated, async (req, res) => {
  try {
    let search = await FavouriteComic.find({ user: req.user });
    res.status(200).json(search);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour récupérer tous les characters favoris d'un user
router.get("/favourite/characters", isAuthenticated, async (req, res) => {
  try {
    let search = await FavouriteCharacter.find({ user: req.user });
    res.status(200).json(search);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Route pour enregistrer un comic favori dans la BDD, en correspondance avec le bon user
router.post("/favourite/comic", isAuthenticated, async (req, res) => {
  try {
    const favouriteInfos = req.fields;
    const newFavouriteComic = new FavouriteComic({
      apiid: favouriteInfos._id,
      title: favouriteInfos.title,
      description: favouriteInfos.description,
      thumbnail: {
        path: favouriteInfos.thumbnail.path,
        extension: favouriteInfos.thumbnail.extension,
      },
      user: req.user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Route pour enregistrer un character favori dans la BDD, en correspondance avec le bon user
router.post("/favourite/character", isAuthenticated, async (req, res) => {
  try {
    const favouriteInfos = req.fields;
    const newFavouriteCharacter = new FavouriteCharacter({
      apiid: favouriteInfos._id,
      name: favouriteInfos.name,
      description: favouriteInfos.description,
      thumbnail: {
        path: favouriteInfos.thumbnail.path,
        extension: favouriteInfos.thumbnail.extension,
      },
      user: req.user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Route pour delete un character favori dans la BDD, en correspondance avec le bon user
router.delete(
  "/favourite/character/delete",
  isAuthenticated,
  async (req, res) => {
    try {
      let status = await FavouriteCharacter.findOneAndDelete({
        apiid: req.fields.apiid,
      });
      res.status(200).json("Has been successfully deleted");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

//Route pour delete un comic favori dans la BDD, en correspondance avec le bon user
router.delete("/favourite/comic/delete", isAuthenticated, async (req, res) => {
  try {
    let status = await FavouriteComic.findOneAndDelete({
      apiid: req.fields.apiid,
    });
    res.status(200).json("Has been successfully deleted");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
