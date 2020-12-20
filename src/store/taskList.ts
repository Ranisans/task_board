/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../appTypes";
import { ESortFields, MAX_TASKS_PER_PAGE } from "../appConstants";

interface ITaskList {
  taskList: ITask[];
  page: number;
  totalPages: number;
  sorting: ESortFields;
}

const FIRST_PAGE = 1;

const initialState: ITaskList = {
  taskList: [],
  page: FIRST_PAGE,
  totalPages: 0,
  sorting: ESortFields.ID,
};

const taskListState = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    setTaskList: (state, { payload }: PayloadAction<ITask[]>) => {
      state.taskList = payload;
    },
    sortById: (state) => {
      state.sorting = ESortFields.ID;
    },
    sortByUser: (state) => {
      state.sorting = ESortFields.USERNAME;
    },
    sortByEmail: (state) => {
      state.sorting = ESortFields.EMAIL;
    },
    sortByStatus: (state) => {
      state.sorting = ESortFields.STATUS;
    },
    nextPage: (state) => {
      if (Math.ceil(state.totalPages / MAX_TASKS_PER_PAGE) > state.page) {
        state.page += 1;
      }
    },
    previousPage: (state) => {
      if (state.page > FIRST_PAGE) {
        state.page -= 1;
      }
    },
    firstPage: (state) => {
      state.page = FIRST_PAGE;
    },
    lastPage: (state) => {
      state.page = Math.ceil(state.taskList.length / MAX_TASKS_PER_PAGE);
    },
    setTotalPages: (state, { payload }: PayloadAction<number>) => {
      state.totalPages = payload;
    },
  },
});

export default taskListState.reducer;

export const {
  setTaskList,
  sortById,
  sortByUser,
  sortByEmail,
  sortByStatus,
  nextPage,
  previousPage,
  firstPage,
  lastPage,
  setTotalPages,
} = taskListState.actions;
