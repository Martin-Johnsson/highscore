import { call, put, takeLatest } from 'redux-saga/effects';

import { setGenreData } from '../reducers/genresReducer';
import { GENRE_FETCH } from '../actions';
import { IGenresData } from '../../types/interfaces';

function* fetchGenres() {
  try {
    const response: Response = yield call(
      fetch,
      'http://localhost:5000/api/genres'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch genres');
    }

    const data: IGenresData[] = yield response.json();
    console.log(data);

    yield put(setGenreData(data));
  } catch (error) {
    console.error('Error:', error);
    yield put(setGenreData([]));
  }
}

export default function* sagas() {
  yield takeLatest(GENRE_FETCH, fetchGenres);
}
