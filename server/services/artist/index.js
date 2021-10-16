const configs = require("../../../config");
const apiRequest = require("../../apiRequest");

module.exports = {
  getArtists: async (req, res) => {
    try {
      const { name } = req.query;
      const result = await apiRequest({
        method: "GET",
        url: `${configs.DEEZER_URL}/search/artist?q=${name}`,
      });
      res.json(result.data?.data);
    } catch (ex) {
      let error;
      if(ex.response) error = ex.response.data;
      else error = {message: "something went wrong"}
      res.json(error);
    }
  },
  getArtist: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await apiRequest({
        method: "GET",
        url: `${configs.DEEZER_URL}/artist/${id}`,
      });
      res.json(result.data);
    } catch (ex) {
      let error;
      if(ex.response) error = ex.response.data;
      else error = {message: "something went wrong"}
      res.json(error);
    }
  },
  getArtistTopTracks: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await apiRequest({
        method: "GET",
        url: `${configs.DEEZER_URL}/artist/${id}/top`,
      });
      res.json(result.data?.data);
    } catch (ex) {
      let error;
      if(ex.response) error = ex.response.data;
      else error = {message: "something went wrong"}
      res.json(error);
    }
  },
  getArtistAlbums: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id)
      const result = await apiRequest({
        method: "GET",
        url: `${configs.DEEZER_URL}/artist/${id}/albums`,
      });
      res.json(result.data?.data);
    } catch (ex) {
      let error;
      if(ex.response) error = ex.response.data;
      else error = {message: "something went wrong"}
      res.json(error);
    }
  }
};
