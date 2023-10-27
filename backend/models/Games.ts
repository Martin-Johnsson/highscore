import { model, Schema } from 'mongoose';

const GameSchema = new Schema({
  title: {
    type: String,
    required: true,
    min: 25,
    max: 50,
  },
  description: {
    type: String,
    required: true,
    min: 25,
    max: 50,
  },
  genre_id: {
    type: Number,
    required: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
    min: 1,
    max: 250,
  },
  url_slug: {
    type: String,
    required: true,
    min: 1,
    max: 50,
  },
});

const GamesModel = model('Game', GameSchema);

export default GamesModel;
