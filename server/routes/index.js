const express = require("express");
const artistController = require('../controllers/arstist') 

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json('Welcome to Deezer')
});

routes.get('/artists', artistController.getArtists)
routes.get('/artists/:id', artistController.getArtist)
routes.get('/artists/:id/top', artistController.getArtistTopTracks)
routes.get('/artists/:id/albums', artistController.getArtistAlbums)

module.exports = routes;
