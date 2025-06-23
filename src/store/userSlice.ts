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

const initialState: UserInfo | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      return action.payload;
    },
    clearUserInfo() {
      return null;
    },
  },
});

export const {setUserInfo, clearUserInfo} = userSlice.actions;
export default userSlice.reducer;
