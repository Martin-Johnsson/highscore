import express, { Request, Response } from 'express';
import GamesModel from '../../models/Games';

const router = express.Router();

router.get('/api/games', async (req: Request, res: Response) => {
  const games = await GamesModel.find({});

  return res.status(200).send(games);
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

export { router as gamesRouter };
