import { model, Schema } from 'mongoose';

const GenreSchema = new Schema({
  name: { type: String },
});

const GenreModel = model('genres', GenreSchema);

export default GenreModel;
