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

const initialState: TasksState = {
  unfinished: [],
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
