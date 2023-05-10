const axios = require("axios");
const { Videogame, Genres, } = require('../db');
const { Op } = require("sequelize");
require("dotenv").config(); // process.env

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const STATUS_OK = 200;
const STATUS_ERROR = 404;

module.exports = {
  getAllGames: async () => {
    try {
      let apiurls = [];
      for (let i = 1; i <= 5; i++) {
        apiurls = [...apiurls, `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`]
      };
      let api = apiurls.map((url) => axios.get(url));
      api = await Promise.all(api);
      api = api?.map((response) => response.data.results).flat();
      api = api?.map((game) => {
        return {
          id: game.id,
          name: game.name,
          genres: game.genres?.map((gen) => gen.name),
          platforms: game.platforms?.map((plat) => {

            return plat.platform.name
          }),
          released: game.released,
          img: game.background_image,
          rating: game.rating,
        };
      });

      let gamesdb = await Videogame.findAll({
        include: {
          model: Genres,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      console.log("🚀 ~ file: Videogames.controller.js:39 ~ getAllGames: ~ gamesdb:", gamesdb)
      gamesdb = gamesdb?.map((game) => {
        return {
          id: game.id,
          name: game.name,
          genres: game.Genres?.map((gen) => gen.name),
          platforms: game.platforms,
          released: game.released,
          img: game.img,
          rating: game.rating,
          description: game.description,
        };
      });
      return [...gamesdb, ...api];
    } catch (error) {
      throw new Error("Cannot get the games");
    }
  },
  getGameByQuery: async (name) => {
    try {
      let gameApi = [];
      //busco los 15 resultados en la api
      const { data } = await axios.get(`https://api.rawg.io/api/games?search=${name.toLowerCase()}&key=${API_KEY}`);
      let api = data.results;
      if (api.length) {
        api = api.splice(0, 15);

        api = api?.map((game) => {
          return {
            id: game.id,
            name: game.name,
            genres: game.genres?.map((gen) => gen.name),
            platforms: game.platfoms?.map((plat) => plat.platform?.name),
            released: game.released,
            img: game.background_image,
            rating: game.rating,
            description: game.description,
          };
        });
      };
      //ahora con la database local
      let gameDb = await Videogame.findAll({
        where: {
          name: { [Op.iLike]: `%${name}%` },
        },
        include: {
          model: Genres,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      if (gameDb.length) {
        gameDb = gameDb.map((game) => {
          console.log("🚀 ~ file: Videogames.controller.js:100 ~ getGameByQuery: ~ gameDb:", game.Genres)
          return {
            id: game.id,
            name: game.name,
            genres: game.Genres?.map((gen) => gen.name),
            platforms: game.platfoms,
            released: game.released,
            img: game.img,
            rating: game.rating,
            description: game.description,
          };
        });
      };
      gameApi = [...api, ...gameDb];
      if (gameApi.length == 0) throw new Error("Could not find the game")
      return gameApi
    } catch (error) {
      throw new Error(error);
    }
  },
  getGameById: async (id) => {
    try {
      if (id.includes("-")) {
        let db = await Videogame.findOne({
          where: {
            id: id,
          },
          include: [Genres],
        });

        const gamedb = {
          id: db.dataValues.id,
          name: db.dataValues.name,
          genres: db.dataValues.Genres?.map((gen) => gen.name),
          platforms: db.dataValues.platforms,
          released: db.dataValues.released,
          img: db.dataValues.img,
          rating: db.dataValues.rating,
          description: db.dataValues.description,
        }
        console.log("🚀 ~ file: Videogames.controller.js:141 ~ getGameById: ~ gamedb:", gamedb)

        return gamedb;
      } else {
        let game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        game = game.data;
        const gamefind = {
          id: game.id,
          name: game.name,
          genres: game.genres?.map((gen) => gen.name),
          platforms: game.platforms?.map(plat => plat.platform.name),
          released: game.released,
          img: game.background_image,
          rating: game.rating,
          description: game.description,
        }
        return gamefind;
      };
    } catch (error) {
      if (error == "AxiosError: Request failed with status code 404") throw new Error(`this game by id:${id} doesn't exist`);
      throw new Error(error);
    }
  },
  createGame: async (name, description, released, rating, platforms, img) => {

    try {
      if (!name) throw new Error('It requires a valid name')
      let [game, boolean] = await Videogame.findOrCreate({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        defaults: {
          name,
          description,
          released,
          rating,
          platforms,
          img,
        }
      });
      if (!boolean) throw new Error("The game already exists");

      return game;
    } catch (error) {

      throw new Error(error);
    }
  },
  getGenres: async (req, res) => {
    const { idVideogame } = req.params
    console.log("🚀 ~ file: Videogames.controller.js:51 ~ getGameById: ~ idVideogame:", idVideogame)

    try {
      if (idVideogame) {
        const { data } = await axios.get(`${API_URL}games/${idVideogame}?key=${API_KEY}`)

        res.status(STATUS_OK).json(data);
      }


    } catch (error) {
      res.status(STATUS_ERROR).json({ message: error });
    }
  },
};
