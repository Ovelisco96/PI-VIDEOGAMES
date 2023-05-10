const {Router} = require("express");
const {createGame, getAllGames, getGameByQuery} = require("../controllers/Videogames.controller");

const {Genres} = require("../db");
const router = Router();

router.get("/", async (req,res) => {
    let {name} = req.query;
    let games;
    try {
        if (name) games = await getGameByQuery(name);
        else games = await getAllGames();        
        res.status(200).json(games);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, description, released, rating, genres, platforms, img} = req.body;
        const newGame = await createGame(name, description, released, rating, platforms, img);
        let genresdb = await Genres.findAll({
            where: {
                name: genres,
            },
        });
        
        newGame.addGenres(genresdb);
        res.status(200).json(newGame);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = router;