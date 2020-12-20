/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IErrorState {
  errorMessage?: string;
  windowOpen: boolean;
}

const initialState: IErrorState = {
  windowOpen: false,
};

const errorState = createSlice({
  name: "error",
  initialState,
  reducers: {
    showError: (state, { payload }: PayloadAction<string | undefined>) => {
      if (payload) state.errorMessage = payload;
      state.windowOpen = true;
    },
    hideError: (state) => {
      state.windowOpen = false;
    },
  },
});

export default errorState.reducer;

export const { showError, hideError } = errorState.actions;
