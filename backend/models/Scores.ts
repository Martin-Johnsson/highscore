import { model, Schema } from 'mongoose';

const ScoreSchema = new Schema({
  game: {
    type: String,
    required: true,
    min: 25,
    max: 50,
  },
  player: {
    type: String,
    required: true,
    min: 25,
    max: 50,
  },
  score: {
    type: String,
    required: true,
    min: 25,
    max: 50,
  },
  score_date: {
    type: Date,
    required: true,
    default: () => Date.now(),
    immutable: true,
  },
});

const ScoresSchema = model('scores', ScoreSchema);

export default ScoresSchema;
