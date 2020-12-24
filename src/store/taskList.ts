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
    updatePage: (state, { payload }: PayloadAction<ITask>) => {
      const changedRecordIndex = state.taskList.findIndex(
        (task) => task.id === payload.id
      );
      if (changedRecordIndex >= 0) {
        const newArray = state.taskList.map((task) => task);
        const changedTask = state.taskList[changedRecordIndex];
        if (changedTask.text !== payload.text) {
          payload.isTextChanged = true;
        }
        newArray[changedRecordIndex] = payload;
        state.taskList = newArray;
      }
    },
    setTotalPages: (state, { payload }: PayloadAction<number>) => {
      state.totalPages = payload;
    },
  },
});

export default taskListState.reducer;

export const {
  setTaskList,
  setSorting,
  setDirection,
  setPage,
  updatePage,
  setTotalPages,
} = taskListState.actions;
