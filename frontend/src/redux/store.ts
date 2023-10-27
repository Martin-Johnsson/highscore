import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './reducers/gamesReducer';

const store = configureStore({
  reducer: {
    games: projectsReducer,
    //   scores: ,
    //   genres: ,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
