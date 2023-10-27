import mongoose from 'mongoose';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
require('dotenv').config();

import GenreModel from '../models/Genres';

const MONGODBURL = process.env.MONGODB_URL;
const DATABASENAME = process.env.DATABASE_NAME;

const app: Application = express();

// Connect to mongoose db
mongoose.connect(MONGODBURL ?? '', {
  dbName: DATABASENAME,
});

console.log('App listen on port 5000');
app.use(express.json());
app.use(cors());

app.get('/getGenres', (req: Request, res: Response) => {
  GenreModel.find().then((data) => {
    res.json(data);
  });
});

// app.post('/game', async (req, resp) => {
//   try {
//     const genre = new Genre(req.body);

//     let result = await genre.save();
//     result = result.toObject();

//     if (result) {
//       delete result.password;
//       resp.send(req.body);
//       console.log(result);
//     } else {
//       console.log('Error');
//     }
//   } catch (e) {
//     resp.send('something went wrong');
//   }
// });

app.listen(5000);
