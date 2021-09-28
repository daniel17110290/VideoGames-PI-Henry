const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const router = Router();
const apikey = "b93baff03b7f4a6b91cbfad06b264509";
const urlApi = `https://api.rawg.io/api/games?key=${apikey}&page=`;

router.get("/", async (req, res) => {
  let dataApi = []; //Un array para concatenar los games
  try {
    //Traigo la data de la Api
    dataApi = await axios.all([
      axios.get(urlApi + "1"),
      axios.get(urlApi + "2"),
      axios.get(urlApi + "3"),
      axios.get(urlApi + "4"),
      axios.get(urlApi + "5"),
    ]);
    dataApi = dataApi.map((e) =>
      e.data.results.map((e) => {
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
      })
    );
  } catch (e) {
    console.log("Hubo un error con la Api: ", e);
  }
  dataApi[0] = dataApi[0].concat(
    dataApi[1],
    dataApi[2],
    dataApi[3],
    dataApi[4]
  );
  dataApi = dataApi[0];
  res.json(dataApi);
  try {
    //Traigo la data de la db
    dataGames = await Videogame.findAll({
      include: Genre,
    });
  } catch (e) {
    console.log("Hubo con error con la Base de Datos:", e);
  }
});

//POST de un videogame
router.post("/videogame", async (req, res) => {
  let { name, description, release_date, rating, genres, platforms } = req.body;
  try {
    let videogame = await Videogame.create({
      name,
      description,
      release_date,
      rating,
      genres,
      platforms,
    });
    res.send(videogame);
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
