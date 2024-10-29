import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

// Обновляем тип для состояния, чтобы учесть все страницы
interface NavigationState {
  activePage: 'Index' | 'Index' | 'Index' | 'Index';
}

const initialState: NavigationState = {
  activePage: 'Index',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setActivePage(state, action: PayloadAction<'Index' | 'Index' | 'Index' | 'Index'>) {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage } = navigationSlice.actions;

export const selectActivePage = (state: RootState) => state.navigation.activePage;

export default navigationSlice.reducer;
