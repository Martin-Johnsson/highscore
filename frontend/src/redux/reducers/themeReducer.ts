import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { lightTheme } from 'src/globalStyles/themes/lightTheme';
import { darkTheme } from 'src/globalStyles/themes/darkTheme';

const initialState = {
  selectedTheme: () => {
    const themeCookie = localStorage.getItem('theme');
    if (themeCookie === 'lightMode') {
      return darkTheme;
    } else if (themeCookie === 'darkMode') {
      return lightTheme;
    } else if (!lightTheme) {
      return lightTheme;
    }
  },
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<() => string>) => {
      state.selectedTheme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
