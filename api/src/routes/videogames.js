const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const router = Router();
const apikey = "b93baff03b7f4a6b91cbfad06b264509";
const urlApi = `https://api.rawg.io/api/games?key=${apikey}&page=`;

// GET de los videogames por query, sino muestra todos
router.get("/", async (req, res) => {
  let { name } = req.query;
  if (name) {
    //PARA TRAER LOS GAMES CON QUERY
    let dataGames = [];
    try {
      //PARA TRAER DATA DE LA API
      dataGames = await axios.get(
        `https://api.rawg.io/api/games?key=${apikey}&search=${name}`
      );
      dataGames = dataGames.data.results.map((e) => {
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
    } catch (e) {
      res.status(404).send("Error de la consulta a la Api", e);
    }
    try {
      //PARA TRAER DATA DE LA BDD
      let games = await Videogame.findAll({
        attributes: ["id", "name", "urlImg"],
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });

      dataGames = [...dataGames, games];
    } catch (e) {
      res.status(404).send("Error de la bases de datos: ", e);
    }

    res.send(dataGames);
  } else {
    //PARA TRAER TODOS LOS GAMES SIN EL QUERY
    let dataGames = []; //Un array para concatenar los games
    try {
      //Traigo la data de la Api
      dataGames = await axios.all([
        axios.get(urlApi + "1"),
        axios.get(urlApi + "2"),
        axios.get(urlApi + "3"),
        axios.get(urlApi + "4"),
        axios.get(urlApi + "5"),
      ]);
      dataGames = dataGames.map((e) =>
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
      res.status(404).send("Hubo un error con la Api: ", e);
    }
    dataGames[0] = dataGames[0].concat(
      dataGames[1],
      dataGames[2],
      dataGames[3],
      dataGames[4]
    );
    dataGames = dataGames[0];
    try {
      //Traigo la data de la db
      let dataBdd = await Videogame.findAll({
        attributes: ["id", "name", "urlImg"],
      });
      dataGames = [...dataGames, dataBdd];
    } catch (e) {
      res.send("Hubo con error con la Base de Datos:", e);
    }
    res.send(dataGames);
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
    res.json(videogame);
  } catch (e) {
    console.log("Error del post", e);
  }
});

//GET de un videogame con id por params
router.get("/videogame/:idVideogame", async (req, res) => {
  //TRAER DETALLES DE BDD  NO FUNCA
  let { idVideogame } = req.params;
  if (isNaN(idVideogame)) {
    try {
      let videogame = await Videogame.findByPk(idVideogame, {
        include: Genre,
      });
      res.json(videogame);
    } catch (e) {
      res.status(404).send("Error de la Base de Datos: ", e);
    }
  } else {
    try {
      //PARA DAR DETALLE DEL GAME POR API
      let videogame = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${apikey}`
      );
      videogame = videogame.data;
      let game = {
        id: videogame.id,
        urlImg: videogame.background_image,
        name: videogame.name,
        genres: videogame.genres.map((e) => e.name),
        rating: videogame.rating,
        platforms: videogame.platforms.map((e) => e.platform.name),
        released: videogame.released,
      };
      res.json(game);
    } catch (e) {
      res.status(404).send("Error de la API: ", e);
    }
  }
});

module.exports = router;
