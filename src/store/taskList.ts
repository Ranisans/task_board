/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../appTypes";
import { ESortDirection, ESortFields } from "../appConstants";

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
  totalPages: FIRST_PAGE,
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
    setPage: (state, { payload }: PayloadAction<number>) => {
      if (state.totalPages < payload) {
        state.page = state.totalPages;
      } else if (payload < FIRST_PAGE) {
        state.page = FIRST_PAGE;
      } else {
        state.page = payload;
      }
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
  setPage,
  setTotalPages,
  setShouldUpdate,
} = taskListState.actions;
