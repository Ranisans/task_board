/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../appTypes";
import {
  ESortDirection,
  ESortFields,
  MAX_TASKS_PER_PAGE,
} from "../appConstants";

interface ITaskList {
  taskList: ITask[];
  page: number;
  totalPages: number;
  sorting: ESortFields;
  direction: ESortDirection;
  shouldUpdate: boolean;
}

const FIRST_PAGE = 1;

const initialState: ITaskList = {
  taskList: [],
  page: FIRST_PAGE,
  totalPages: 0,
  sorting: ESortFields.ID,
  direction: ESortDirection.ASC,
  shouldUpdate: false,
};

const taskListState = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    setTaskList: (state, { payload }: PayloadAction<ITask[]>) => {
      state.taskList = payload;
    },
    setSorting: (state, { payload }: PayloadAction<ESortFields>) => {
      state.sorting = payload;
    },
    setDirection: (state, { payload }: PayloadAction<boolean>) => {
      state.direction = payload ? ESortDirection.ASC : ESortDirection.DESC;
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
    setShouldUpdate: (state, { payload }: PayloadAction<boolean>) => {
      state.shouldUpdate = payload;
    },
  },
});

export default taskListState.reducer;

export const {
  setTaskList,
  setSorting,
  setDirection,
  nextPage,
  previousPage,
  firstPage,
  lastPage,
  setTotalPages,
  setShouldUpdate,
} = taskListState.actions;
