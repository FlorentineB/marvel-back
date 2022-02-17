const express = require("express");
const router = express.Router();
const axios = require("axios");

// Route pour récupérer les détails des comics, en fonction du characterId ==> /comics/:characterId
router.get("/comics/:characterId", async (req, res) => {
  try {
    let queryParams = `?apiKey=${process.env.MARVEL_API_KEY}`;

    const { data } = await axios.get(
      `${process.env.MARVEL_BACKEND_URL}/comics/${req.params.characterId}${queryParams}`
    );
    res.status(200).json(data.comics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Pour afficher l'ensemble des comics
router.get("/comics", async (req, res) => {
  try {
    let queryParams = `?apiKey=${process.env.MARVEL_API_KEY}`;
    if (req.query.limit) {
      queryParams += `&limit=${req.query.limit}`;
    }
    if (req.query.skip) {
      queryParams += `&skip=${req.query.skip}`;
    }
    if (req.query.title && req.query.name !== "") {
      queryParams += `&title=${req.query.title}`;
    }

    const { data } = await axios.get(
      `${process.env.MARVEL_BACKEND_URL}/comics${queryParams}`
    );

    res.status(200).json(data.results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
