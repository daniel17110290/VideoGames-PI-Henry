const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const router = Router();
const apikey = "b93baff03b7f4a6b91cbfad06b264509";

// GET de los videogames por query, sino muestra todos
router.get("/", async (req, res) => {
  let { name } = req.query;
  if (name) {
    //PARA TRAER LOS GAMES CON QUERY
    let dataGames = [];
    try {
      //PARA TRAER DATA DE LA BDD
      dataGames = await Videogame.findAll({
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
        attributes: ["id", "name", "urlImg"],
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      dataGames = dataGames.map((e) => {
        return (gameBdd = {
          id: e.id,
          name: e.name,
          urlImg: e.urlImg,
          genres: e.genres.map((e) => e.name),
        });
      });
    } catch (e) {
      res.status(404).send("Error de la bases de datos: ", e);
    }
    try {
      //PARA TRAER DATA DE LA API
      let games = await axios.get(
        `https://api.rawg.io/api/games?key=${apikey}&search=${name}`
      );
      games = games.data.results.map((e) => {
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
      dataGames = [...dataGames, games];
    } catch (e) {
      res.status(404).send("Error de la consulta a la Api", e);
    }
    dataGames = dataGames.flat().slice(0, 15);
    res.json(dataGames);
  } else {
    //PARA TRAER TODOS LOS GAMES SIN EL QUERY
    let dataGames = []; //Un array para concatenar los games
    try {
      //Traigo la data de la Api

      let dataAux = await axios.get(
        `https://api.rawg.io/api/games?key=${apikey}`
      );
      dataGames.push(dataAux);
      let next = dataAux.data.next;
      for (let i = 2; i <= 5; i++) {
        let aux = await axios.get(next);
        next = aux.data.next;
        dataGames.push(aux);
      }

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

    try {
      //Traigo la data de la db
      let dataBdd = await Videogame.findAll({
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
        attributes: ["id", "name", "urlImg", "fromDB"],
      });
      dataBdd = dataBdd.map((e) => {
        return (gameBdd = {
          id: e.id,
          name: e.name,
          urlImg: e.urlImg,
          genres: e.genres.map((e) => e.name),
          fromDB: e.fromDB,
        });
      });

      dataGames = [...dataGames, dataBdd];
    } catch (e) {
      res.send("Hubo con error con la Base de Datos:", e);
    }
    dataGames = dataGames.flat();
    res.json(dataGames);
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
      platforms,
    });
    await videogame.addGenres(genres);
    res.json(videogame);
  } catch (e) {
    console.log("Error del post", e);
  }
});

//GET de un videogame con id por params
router.get("/videogame/:idVideogame", async (req, res) => {
  //TRAER DETALLES DE BDD
  let { idVideogame } = req.params;
  if (isNaN(idVideogame)) {
    try {
      let videogame = await Videogame.findByPk(idVideogame, {
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      //NO ENCONTRE OTRA FORMA DE MAPEAR
      generos = videogame.genres.map((e) => {
        return e.name;
      });
      let videogameNew = {
        name: videogame.name,
        description: videogame.description,
        rating: videogame.rating,
        genres: generos,
        platforms: videogame.platforms,
        urlImg: videogame.urlImg,
        released: videogame.release_date,
      };
      res.json(videogameNew);
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
        description: videogame.description_raw,
      };
      res.json(game);
    } catch (e) {
      res.status(404).send("Error de la API: ", e);
    }
  }
});

module.exports = router;
