var express = require('express');
var router = express.Router();

router.get('/', async function (req, res) {
  const db = req.app.locals.db;

  const sql = `
  SELECT game.id,
        game.title,
        game.release_date,
        game.genre_id,
		genre.name
  FROM game
  INNER JOIN genre
  on game.genre_id = genre.id
      `;

  const result = await db.query(sql);

  const games = result.rows;

  res.render('admin/games/index', {
    title: 'Nytt highscore',
    games,
  });
});

router.get('/new', async function (req, res) {
  const db = req.app.locals.db;

  const sql = `
  SELECT game.id,
        game.title,
        game.release_date,
        game.genre_id,
        game.url_slug,
		    genre.name
  FROM game
  INNER JOIN genre
  on game.genre_id = genre.id
      `;

  const result = await db.query(sql);

  const games = result.rows;

  res.render('admin/games/new', {
    title: 'Nytt highscore',
    games,
  });
});

// POST admin/games/new
router.post('/new', async function (req, res) {
  const { title, description, imageUrl, genre, releaseDate } = req.body;

  const db = req.app.locals.db;

  const newGame = {
    title,
    description,
    imageUrl,
    genre,
    releaseDate,
    urlSlug: getUrlSlug(title),
  };

  await addGame(newGame, db);

  res.redirect('/admin/games');
});

const getUrlSlug = (title) =>
  title.replace('-', '').replace(' ', '').toLowerCase();

async function addGame(newGame, db) {
  const sql = `
  INSERT INTO game (
    title,
    description,
    image_url,
    genre_id,
    release_date,
    url_slug
    ) VALUES ($1, $2, $3, $4, $5, $6)
    `;
  await db.query(sql, [
    newGame.title,
    newGame.description,
    newGame.imageUrl,
    newGame.genre,
    newGame.releaseDate,
    newGame.urlSlug,
  ]);
}
module.exports = router;
