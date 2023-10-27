import { createSlice } from '@reduxjs/toolkit';

import { IGamesState } from '../../types/interfaces';

const initialState: IGamesState = {};

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {},
});

export const {} = genresSlice.actions;
export default genresSlice.reducer;
