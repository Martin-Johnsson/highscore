import express, { Application } from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { genresRouter } from '../routes/genres/genres';
import { gamesRouter } from '../routes/games/games';
const cors = require('cors');

require('dotenv').config();
const MONGODBURL = process.env.MONGODB_URL;
const DATABASENAME = process.env.DATABASE_NAME;

const app: Application = express();
app.use(json());
app.use(cors());
app.use(gamesRouter);
app.use(genresRouter);

mongoose.connect(MONGODBURL ?? '', {
  dbName: DATABASENAME,
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});

//Routes
