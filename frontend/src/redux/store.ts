import { Store, configureStore } from '@reduxjs/toolkit';
import genresReducer from './reducers/genresReducer';
import createSagaMiddleware from 'redux-saga';

import genresSagas from './sagas/genresSagas';

const sagaMiddleware = createSagaMiddleware();

const store: Store = configureStore({
  reducer: {
    genres: genresReducer,
    //   scores: ,
    //   genres: ,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(genresSagas);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
