const axios = require('axios').default;

const apiRequest = async ({
  method = "GET",
  url = "",
  data = null,
  headers = {},
}) => axios({
  method,
  url,
  data,
  headers
});

module.exports = apiRequest;