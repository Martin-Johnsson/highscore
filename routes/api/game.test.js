const request = require('supertest');
const app = require('../../app.js');

describe('GET /api/games', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/api/games').send();

    expect(response.statusCode).toBe(200);
  });

  test('should specify application/json in the content type header', async () => {
    const response = await request(app).get('/api/games').send();

    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('application/json')
    );
  });

  test('should return array of games', async () => {
    const response = await request(app).get('/api/games').send();

    expect(Array.isArray(response.body)).toBe(true);

    const game = response.body[0];

    expect(game).toHaveProperty('game_id');
    expect(game).toHaveProperty('title');
    expect(game).toHaveProperty('description');
    expect(game).toHaveProperty('genre_id');
    expect(game).toHaveProperty('name');
    expect(game).toHaveProperty('release_date');
    expect(game).toHaveProperty('title');
    expect(game).toHaveProperty('image_url');
    expect(game).toHaveProperty('url_slug');
    expect(game).toHaveProperty('player');
    expect(game).toHaveProperty('score');
    expect(game).toHaveProperty('score_date');
  });
});
