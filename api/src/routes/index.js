const { Router, response } = require("express");

const videogames = require("./videogames");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use("/videogames", videogames);
router.use("/videogames", videogames);

module.exports = router;
