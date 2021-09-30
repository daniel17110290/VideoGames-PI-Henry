const { Router } = require("express");
const { Genre } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    let genres = await Genre.findAll();
    res.json(genres);
  } catch (e) {
    console.log("Error de la base de Datos: ", e);
  }
});

module.exports = router;
