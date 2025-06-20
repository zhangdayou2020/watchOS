import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  desc?: string;
  reward?: string;
}

export interface TasksState {
  unfinished: Task[];
  finished: Task[];
}

// 这里写入 mock 数据
const initialState: TasksState = {
  unfinished: [
    {id: '1', title: '朗读课文', desc: '朗读第5课课文'},
    {id: '2', title: '背诵古诗', desc: '背诵《静夜思》'},
    {id: '3', title: '做家务', desc: '整理房间'},
  ],
  finished: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<TasksState>) {
      return action.payload;
    },
    clearTasks() {
      return initialState;
    },
  },
});

export const {setTasks, clearTasks} = tasksSlice.actions;
export default tasksSlice.reducer;
