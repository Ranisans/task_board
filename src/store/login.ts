/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AUTH_KEY } from "../appConstants";

interface ILoginState {
  isAuthenticated: boolean;
  authKey: string;
  windowOpen: boolean;
}

const initialState: ILoginState = {
  isAuthenticated: false,
  authKey: "",
  windowOpen: false,
};

const loginState = createSlice({
  name: "loginKey",
  initialState,
  reducers: {
    setKey: (state, { payload }: PayloadAction<string>) => {
      state.authKey = payload;
      state.isAuthenticated = true;
      localStorage.setItem(AUTH_KEY, payload);
    },
    resetKey: (state) => {
      state.authKey = "";
      state.isAuthenticated = false;
      localStorage.setItem(AUTH_KEY, "");
    },
    restoreAuthentication: (state) => {
      const localStorageToken = localStorage.getItem(AUTH_KEY);
      if (localStorageToken) {
        state.authKey = localStorageToken;
        state.isAuthenticated = true;
      }
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
  restoreAuthentication,
  openLoginWindow,
  closeLoginWindow,
} = loginState.actions;
