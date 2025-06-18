import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from './tokenSlice';
import tasksReducer from './tasksSlice'; // 新增

const store = configureStore({
  reducer: {
    token: tokenReducer,
    tasks: tasksReducer, // 注册任务切片
    // 其他 slice 也可以加进来
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
