import axios from 'axios'

const { REACT_APP_BASE_URL: reqUrl } = process.env;

const axiosInstance = axios.create({
  baseURL: reqUrl || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});


export default axiosInstance;