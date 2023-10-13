var express = require('express');
var router = express.Router();

/**
 * @swagger
 * /api/scores/highscores:
 *    get:
 *      description: Get all highscores
 *      tags: [Scores]
 *      responses:
 *        200:
 *           description: Games found
 *           content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                $ref: '#/components/schemas/Scores'
 */
router.get('/highscores', async (req, res) => {
  const db = req.app.locals.db;

  const scores = await getGlobalScores(db);

  res.status(200).send(scores);
});

/**
 * @swagger
 * /api/scores/:
 *    post:
 *      description: Create score
 *      tags: [Scores]
 *      consumes:
 *        - application/json
 *      requestBody:
 *        title: Game details
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/NewScore'
 *      produces:
 *        - application/json
 *      responses:
 *        201:
 *           description: Score details
 *           content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/Scores'
 *        400:
 *            description: Missing required information
 */

router.post('/', async (req, res) => {
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

  if (!gameId || !gameTitle || !player || !date || !score) {
    res.status(400).end();
  } else {
    await saveScore(newScore, db);

    res.location('/api/scores');

    res.status(201).send(newScore);
  }
});

async function getGlobalScores(db) {
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

  return result.rows;
}

const getGameTitle = async (id, db) => {
  const sql = `
    SELECT game.title
    FROM game
      WHERE game.id = $1
  `;
  const result = await db.query(sql, [id]);

  return result.rows[0];
};

async function saveScore(newScore, db) {
  const sql = `
  INSERT INTO score (
    game_id,
    game,
    player,
    score_date,
    score
  ) VALUES ( $1, $2, $3, $4, $5)
  `;

  const result = await db.query(sql, [
    newScore.gameId,
    newScore.gameTitle,
    newScore.player,
    newScore.date,
    newScore.score,
  ]);

  return result.rows[0];
}
module.exports = router;

/**
 * @swagger
 * components:
 *  schemas:
 *    Scores:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: game title
 *        score:
 *          type: integer
 *          description: score of the game
 *        player:
 *          type: string
 *          description: name of the player who scored the score
 *        score_date:
 *          type: date
 *          description: score date
 *        url_slug:
 *          type: string
 *          description: game url slug
 *    NewScore:
 *      type: object
 *      properties:
 *        gameId:
 *          type: number
 *          description: Game id
 *        player:
 *          type: string
 *          description: Score player
 *        date:
 *          type: number
 *          description: Score date
 *        score:
 *          type: number
 *          description: Score
 */
