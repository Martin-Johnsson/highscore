var express = require('express');
var router = express.Router();

// GET http://localhost:3000/games/tetris (URI segment)

router.get('/:urlSlug', async function (req, res) {
  const urlSlug = req.params.urlSlug;

  const db = req.app.locals.db;

  const sql = `
    SELECT game_id,
           title,
           description,
           genre_id,
           name,
           release_date,
           image_url,
           url_slug,
		       player,
		       score,
		       score_date
    FROM game
      INNER JOIN score
        ON game.id = score.game_id
      INNER JOIN genre
          ON game.genre_id = genre.id
      WHERE url_slug = $1
`;

  const result = await db.query(sql, [urlSlug]);

  const { title, name, description, release_date, image_url } = result.rows[0];

  const game = {
    title: title,
    name: name,
    description: description,
    release_date: release_date,
    image_url: image_url,
  };

  const highscores = result.rows.map((score) => ({
    player: score.player,
    score: score.score,
    score_date: score.score_date,
  }));

  res.render('games/details', {
    title: game.title,
    game,
    highscores,
  });
});

module.exports = router;
