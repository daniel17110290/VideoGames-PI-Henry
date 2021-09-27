const { Router } = require("express");
// const { Videogame } = require("../models/Videogame");
// const { Genre } = require("../models/Genre");
const { API_KEY } = process.env;
let axios = require("axios");
const router = Router();

router.get("/genres", async (req, res) => {
  res.json("soy genres");
});

module.exports = router;
