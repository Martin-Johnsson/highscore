import express, { Request, Response } from 'express';
import GenreModel from '../../models/Genres';

const router = express.Router();

router.get('/api/genres', async (req: Request, res: Response) => {
  const genres = await GenreModel.find({});

  return res.status(200).send(genres);
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

export { router as genresRouter };
