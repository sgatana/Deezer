const artistService = require('../services/artist')

module.exports = {
  getArtists: async (req, res) => {
    await artistService.getArtists(req, res)
  },
  getArtist: async (req, res) => {
    await artistService.getArtist(req, res)
  },
  getArtistTopTracks: async (req, res) => {
    await artistService.getArtistTopTracks(req, res)
  },
  getArtistAlbums: async (req, res) => {
    await artistService.getArtistAlbums(req, res)
  },
}