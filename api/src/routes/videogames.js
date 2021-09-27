const { Router } = require("express");
const { Videogame } = require("../models/Videogame");
const { Genre } = require("../models/Genre");
const axios = require("axios");
const { API_KEY } = process.env;
const router = Router();
const apikey = "b93baff03b7f4a6b91cbfad06b264509";
const urlApi = `https://api.rawg.io/api/games?key=${apikey}`;

//https://desarrolloactivo.com/blog/axios/ metodo axios.all
router.get("/", async (req, res) => {
  try {
    let dataApi = await axios.get(urlApi);
    for (let i = 1; i <= 5; i++) {
      dataApi = dataApi.data.results.map((e) => {
        let games = {
          id: e.id,
          urlImg: e.background_image,
          name: e.name,
          genres: e.genres.map((e) => e.name),
          rating: e.rating,
          platforms: e.platforms.map((e) => e.platform.name),
          released: e.released,
        };
        return games;
      });
    }

    res.json(dataApi);
  } catch (e) {
    console.log("Error: ", e);
  }
});

module.exports = router;
