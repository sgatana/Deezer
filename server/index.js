require('dotenv').config();
const express = require('express');
const cors = require('cors')
const configs = require('../config');

 // get the routes
 const routes = require('./routes')

const app = express()
app.use(cors());
app.use(express.json())

app.use('/api/v1', routes )

const port  = configs.PORT;

app.listen(port, () => {
  // logs
  console.log(`application running on port ${port}`)
})

