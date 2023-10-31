import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IGenresData, IGenresState } from '../../types/interfaces';

const initialState: IGenresState = {
  genreData: [],
};

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    setGenreData: (state, action: PayloadAction<IGenresData[]>) => {
      state.genreData = action.payload;
    },
  },
});

export const { setGenreData } = genresSlice.actions;
export default genresSlice.reducer;
