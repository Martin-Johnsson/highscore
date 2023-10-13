var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res) {
  const db = req.app.locals.db;

  const sql = `
  SELECT  DISTINCT ON(title) 
                      title,
                      score,
                      player,
                      score_date,
                      url_slug
  FROM game 
    INNER JOIN score 
      ON game.id = score.game_id
  ORDER BY title, score  DESC
`;

  const result = await db.query(sql);

  res.render('index', {
    title: 'Highscore',
    games: result.rows,
  });
});

module.exports = router;
