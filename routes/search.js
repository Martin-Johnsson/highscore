var express = require('express');
var router = express.Router();

/* GET http://localhost:3000/search?q=tetris */
router.get('/', async function (req, res) {
  const searchTerm = req.query.q;

  const db = req.app.locals.db;

  const sql = `
	SELECT title,
         genre_id,
         name,
	   	   release_date,
	       image_url,
         url_slug
	FROM GAME
	  RIGHT JOIN genre
	    ON game.genre_id = genre.id
      WHERE title ILIKE '%' || $1 || '%'
`;

  const result = await db.query(sql, [searchTerm]);

  res.render('search', {
    title: searchTerm,
    games: result.rows,
    searchTerm: searchTerm,
  });
});

module.exports = router;
