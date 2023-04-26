const axios = require("axios");
const {Genres} = require("../db");

require("dotenv").config(); // process.env

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

module.exports = {
  getGenres: async (req, res) => {

    try {
      let { data } = await axios.get(`${API_URL}genres?key=${API_KEY}`);
      genrApi = data.results;
      genrApi = genrApi?.map((genre) => {
        return {
          name: genre.name,
        }
      });

      genrApi.forEach(async (genre) => {
          await Genres.findOrCreate({
              where: {
                  name: genre.name,
              },
          });
      });
      let genres = await Genres.findAll();
      return genres;
    } catch (error) {
      throw new Error(error)
    }
  },
};