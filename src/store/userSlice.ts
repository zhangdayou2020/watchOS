import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserInfo {
  loginid: string;
  cid: string;
  cname: string;
  familyid: string;
  tel: string | null;
  img: string;
  grade: string;
  cardnumber: string;
  bday: string;
  sex: string;
  totalgp?: string;
  token: string;
}

interface UserState {
  user: UserInfo | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
    },
    clearUserInfo(state) {
      state.user = null;
    },
  },
});

export const {setUserInfo, clearUserInfo} = userSlice.actions;
export default userSlice.reducer;
