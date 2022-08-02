import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "redux/store";
import { editProfileAction, getProfileAction } from "../userSlice/user.action";
import { UserObject } from "../userSlice/user.type";
import { registerAction, loginAction } from "./auth.action";

type AuthState = {
  currentUser: UserObject;
  loading: "idle" | "pending" | "succeeded" | "failed";
};

const initialState: AuthState = {
  currentUser: {},
  loading: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogout: (state) => {
      localStorage.removeItem("token");
      state.currentUser = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.currentUser = action.payload.payload;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = "failed";
      })
      .addCase(loginAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.currentUser = action.payload.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(getProfileAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getProfileAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.currentUser = action.payload.payload;
      })
      .addCase(getProfileAction.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(editProfileAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(editProfileAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.currentUser = action.payload.payload;
      })
      .addCase(editProfileAction.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export const { setLogout } = authSlice.actions;

const currentUser = (state: RootState) => state.auth.currentUser;
const loading = (state: RootState) => state.auth.loading;

export const authSelectors = {
  currentUser,
  loading,
};

export default authSlice;
