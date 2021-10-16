require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors')
const configs = require('./config');
 // get the routes
 const routes = require('./server/routes')

const app = express()
app.use(cors());
app.use(express.json())

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/v1', routes )

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'build/index.html'));
});


const port  = configs.PORT;

app.listen(port, () => {
  // logs
  console.log(`application running on port ${port}`)
})

