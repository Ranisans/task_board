/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IErrorState {
  message?: string;
  isError: boolean;
  windowOpen: boolean;
}

const initialState: IErrorState = {
  isError: false,
  windowOpen: false,
};

interface IPayload {
  message?: string;
  isError: boolean;
}

const alertState = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, { payload }: PayloadAction<IPayload>) => {
      if (payload.message) state.message = payload.message;
      state.isError = payload.isError;
      state.windowOpen = true;
    },
    hideAlert: (state) => {
      state.windowOpen = false;
    },
  },
});

export default alertState.reducer;

export const { showAlert, hideAlert } = alertState.actions;
