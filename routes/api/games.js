var express = require('express');
var router = express.Router();

// GET /api/games
/**
 * @swagger
 * /api/games:
 *    get:
 *      description: Get all games
 *      tags: [Games]
 *      parameters:
 *          - name: title
 *            in: query
 *            description: Game title
 *            required: false
 *      responses:
 *        200:
 *           description: Return list of games
 *           content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Games'
 */
router.get('/', async (req, res) => {
  const { title } = req.query;

  const db = req.app.locals.db;

  const games = title ? await getSearchProduct(title, db) : await getGames(db);

  res.json(games);
});

/**
 * @swagger
 * /api/games/{urlSlug}:
 *    get:
 *      description: Get game by urlSlug
 *      tags: [Games]
 *      parameters:
 *          - name: urlSlug
 *            in: path
 *            description: Game url slug
 *            required: true
 *      responses:
 *        200:
 *           description: Return game and score
 *           content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Games'
 *        404:
 *          description: Game not found
 */

router.get('/:urlSlug', async (req, res) => {
  const { urlSlug } = req.params;

  const db = req.app.locals.db;

  const game = await getGame(urlSlug, db);

  if (!game) {
    res.status(404).end();
    return;
  }

  res.json(game);
});

/**
 * @swagger
 * /api/games/:
 *  post:
 *    description: Create game
 *    tags: [Games]
 *    consumes:
 *      - application/json
 *    requestBody:
 *      title: Game details
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/NewGame'
 *    produces:
 *      - application/json
 *    responses:
 *      201:
 *        description: Returns game
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Games'
 *      400:
 *        description: Invalid game
 */
router.post('/', async (req, res) => {
  const { title, description, imageUrl, genreId, releaseDate } = req.body;

  const game = {
    title,
    description,
    imageUrl,
    genreId,
    releaseDate,
    urlSlug: getUrlSlug(title),
  };

  if (!title || !description || !imageUrl || !genreId) {
    res.status(400).end();
  } else {
    const db = req.app.locals.db;

    game.id = await saveGame(game, db);

    res.location(`/api/games/${game.urlSlug}`);

    res.status(201).send(game);
  }
});

/**
 * @swagger
 * /api/games/{urlSlug}:
 *    delete:
 *      description: delete game by urlSlug
 *      tags: [Games]
 *      parameters:
 *          - name: urlSlug
 *            in: path
 *            description: Game url slug
 *            required: true
 *      responses:
 *        201:
 *           description: Game created
 *           content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Games'
 *        400:
 *            description: Incorrect urlSlug
 */

router.delete('/:urlSlug', async (req, res) => {
  const { urlSlug } = req.params;

  const db = req.app.locals.db;

  game = await deleteGame(urlSlug, db);

  res.status(204).end();
});

/**
 * @swagger
 * /api/games/{urlSlug}/highscores:
 *    get:
 *      description: Get all highscores for game
 *      tags: [Games]
 *      parameters:
 *          - name: urlSlug
 *            in:   path
 *            description: Game url slug
 *            required: true
 *      responses:
 *        201:
 *           description: Game highscores
 *           content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                $ref: '#/components/schemas/Scores'
 */
router.get('/:urlSlug/highscores', async (req, res) => {
  const { urlSlug } = req.params;

  const db = req.app.locals.db;

  const score = await getGameScores(urlSlug, db);

  if (!score) {
    res.json([]);
    return;
  }

  res.json(score);
});

const getGames = async (db) => {
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
`;

  const result = await db.query(sql);

  return result.rows;
};

const getSearchProduct = async (title, db) => {
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
  const result = await db.query(sql, [title]);

  return result.rows;
};

const getGame = async (urlSlug, db) => {
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

  const game = result.rows.length > 0 ? result.rows[0] : undefined;

  return game;
};

async function saveGame(game, db) {
  const sql = `
    INSERT INTO game (
      title,
      description,
      image_url,
      genre_id,
      release_date,
      url_slug
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
      `;
  const result = await db.query(sql, [
    game.title,
    game.description,
    game.imageUrl,
    game.genreId,
    game.releaseDate,
    game.urlSlug,
  ]);

  return result.rows[0].id;
}

async function deleteGame(urlSlug, db) {
  const sql = `
  DELETE FROM game 
  WHERE url_slug = $1
  `;

  await db.query(sql, [urlSlug]);
}

async function getGameScores(urlSlug, db) {
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
  ORDER BY score DESC
`;
  const result = await db.query(sql, [urlSlug]);

  const score = result.rows.length > 0 ? result.rows[0] : undefined;

  return score;
}

const getUrlSlug = (title) =>
  title.replace('-', '').replace(' ', '').toLowerCase();

module.exports = router;

/**
 * @swagger
 * components:
 *  schemas:
 *    Games:
 *      type: object
 *      properties:
 *        game_id:
 *          type: integer
 *          description: Game id
 *        title:
 *          type: string
 *          description: Game name
 *        description:
 *          type: string
 *          description: Game description
 *        genre_id:
 *          type: integer
 *          description: Genre id game belongs to
 *        name:
 *          type: string
 *          description: Genre name game belongs to
 *        release_date:
 *          type: date
 *          description: Game release date
 *        image_url:
 *          type: string
 *          description: Game image url
 *        url_slug:
 *          type: string
 *          description: Game url slug
 *        player:
 *          type: string
 *          description: Name of the player who scored the score
 *        score:
 *          type: integer
 *          description: Player score
 *        score_date:
 *          type: date
 *          description: Score date
 *    NewGame:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: Game title
 *        description:
 *          type: string
 *          description: Game description
 *        imageUrl:
 *          type: string
 *          description: Game image url
 *        genreId:
 *          type: number
 *          description: Game genre id
 *        releaseDate:
 *          type: number
 *          description: Game release date
 */
