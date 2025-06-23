import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tasksReducer from './tasksSlice'; // 新增
import type {UserInfo} from './userSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer, // 注册任务切片
    // 其他 slice 也可以加进来
  },
});

export type RootState = {
  user: UserInfo | null;
  tasks: ReturnType<typeof tasksReducer>;
};
export type AppDispatch = typeof store.dispatch;
export default store;
