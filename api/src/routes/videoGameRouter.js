const { Router } = require("express");
const { getGameById } = require("../controllers/Videogames.controller");

const router = Router();

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const game = await getGameById(id);
        res.status(200).json(game);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;