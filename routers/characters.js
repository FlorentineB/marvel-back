const express = require("express");
const router = express.Router();
const axios = require("axios");

// Pour faire une recherche dans les characters ==> /characters | Method GET via Query
router.get("/characters", async (req, res) => {
  try {
    let queryParams = `?apiKey=${process.env.MARVEL_API_KEY}`;
    if (req.query.limit) {
      queryParams += `&limit=${req.query.limit}`;
    }
    if (req.query.skip) {
      queryParams += `&skip=${req.query.skip}`;
    }
    if (req.query.name && req.query.name !== "") {
      queryParams += `&name=${req.query.name}`;
    }

    const { data } = await axios.get(
      `${process.env.MARVEL_BACKEND_URL}/characters${queryParams}`
    );

    res.status(200).json(data.results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route pour récupérer les informations d'un character en particulier en fonction de son id ==> /character/:characterId
router.get("/character/:characterId", async (req, res) => {
  try {
    const query = `/character/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`;

    const { data } = await axios.get(
      `${process.env.MARVEL_BACKEND_URL}${query}`
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
