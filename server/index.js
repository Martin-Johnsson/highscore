const mongoose = require('mongoose');

const Genre = require('./schemas/genres');

// Connection to mongoose db
mongoose.connect(
  MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Highscore',
  }
);
// run();

// async function run() {
//   const genre = new Genre({ genre: 'Test' });
//   await genre.save();
//   console.log(genre);
// }

const express = require('express');

const app = express();

const cors = require('cors');

console.log('App liston on port 3000');
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  resp.send('App is working');
});
