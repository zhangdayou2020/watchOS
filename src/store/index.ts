import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tasksReducer from './tasksSlice'; // 新增
import giftReducer from './giftSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer, // 注册任务切片
    gifts: giftReducer, // 注册奖励切片
    // 其他 slice 也可以加进来
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
