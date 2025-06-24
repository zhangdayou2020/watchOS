import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Award {
  aid: string;
  aname: string;
  integral: string;
  img: string;
}

const initialState: Award[] = [];

const giftSlice = createSlice({
  name: 'gifts',
  initialState,
  reducers: {
    setAwards(state, action: PayloadAction<Award[]>) {
      return action.payload;
    },
    clearAwards() {
      return [];
    },
  },
});

export const { setAwards, clearAwards } = giftSlice.actions;
export default giftSlice.reducer; 