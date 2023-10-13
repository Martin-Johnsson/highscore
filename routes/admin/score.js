var express = require('express');
var router = express.Router();

/* GET http://localhost:3000/admin/score */

router.get('/', async function (req, res) {
  const db = req.app.locals.db;

  res.render('admin/score/index', {
    title: 'Nytt highscore',
  });
});

router.get('/new', async function (req, res) {
  const db = req.app.locals.db;

  const sql = `
    SELECT game.id,
         game.title
    FROM game
    `;

  const result = await db.query(sql);

  const games = result.rows;

  res.render('admin/score/new', {
    title: 'Nytt highscore',
    games,
  });
});

router.post('/new', async (req, res) => {
  const { gameId, player, date, score } = req.body;

  const db = req.app.locals.db;

  const gameTitle = await getGameTitle(gameId, db);

  const newScore = {
    gameId,
    gameTitle: gameTitle.title,
    player,
    date,
    score,
  };

  await addScore(newScore, db);

  res.redirect('/admin/games');
});

const getGameTitle = async (id, db) => {
  const sql = `
    SELECT game.title
    FROM game
      WHERE game.id = $1
  `;
  const result = await db.query(sql, [id]);

  return result.rows[0];
};

async function addScore(newScore, db) {
  const sql = `
  INSERT INTO score (
    game_id,
    game,
    player,
    score_date,
    score
  ) VALUES ( $1, $2, $3, $4, $5)
`;

  await db.query(sql, [
    newScore.gameId,
    newScore.gameTitle,
    newScore.player,
    newScore.date,
    newScore.score,
  ]);
}

module.exports = router;
