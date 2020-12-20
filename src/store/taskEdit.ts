/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../appTypes";

interface ITaskEditState {
  taskData: ITask | null;
  windowOpen: boolean;
  createTask: boolean;
}

const initialState: ITaskEditState = {
  taskData: null,
  windowOpen: false,
  createTask: false,
};

const taskEditState = createSlice({
  name: "taskEdit",
  initialState,
  reducers: {
    editTask: (state, { payload }: PayloadAction<ITask>) => {
      state.taskData = payload;
      state.windowOpen = true;
    },
    createTask: (state) => {
      state.taskData = null;
      state.windowOpen = true;
    },
    writeTask: (state) => {
      state.createTask = true;
    },
    closeTaskEditWindow: (state) => {
      state.windowOpen = false;
    },
    reset: (state) => {
      state.taskData = null;
      state.windowOpen = false;
      state.createTask = false;
    },
  },
});

export default taskEditState.reducer;

export const {
  editTask,
  createTask,
  writeTask,
  closeTaskEditWindow,
  reset,
} = taskEditState.actions;
