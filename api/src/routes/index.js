const { Router } = require('express');
// Importar todos los routers;
const videogamesRouter = require('./videogamesRouter');
const videoGameRouter = require('./videoGameRouter');
const genresRouter = require('./genresRouter');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogamesRouter);
router.use("/videogame",videoGameRouter);
router.use('/genres', genresRouter);
module.exports = router;
