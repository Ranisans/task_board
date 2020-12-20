/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILoginState {
  authKey: string;
  windowOpen: boolean;
}

const initialState: ILoginState = {
  authKey: "",
  windowOpen: false,
};

const loginState = createSlice({
  name: "loginKey",
  initialState,
  reducers: {
    setKey: (state, { payload }: PayloadAction<string>) => {
      state.authKey = payload;
    },
    resetKey: (state) => {
      state.authKey = "";
    },
    openLoginWindow: (state) => {
      state.windowOpen = true;
    },
    closeLoginWindow: (state) => {
      state.windowOpen = false;
    },
  },
});

export default loginState.reducer;

export const {
  setKey,
  resetKey,
  openLoginWindow,
  closeLoginWindow,
} = loginState.actions;
