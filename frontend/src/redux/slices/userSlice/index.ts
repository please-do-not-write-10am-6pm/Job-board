import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";

import { UserObject } from "./user.type";
import { RootState } from "../../store";
import {
  approveUserAction,
  blockUserAction,
  createUserAction,
  deleteUserAction,
  updateUserAction,
  getAllUserAction,
  getUserAction,
} from "./user.action";

type UserState = {
  allUsers: UserObject[];
  user?: UserObject;
  approvedUsers: UserObject[];
  loading: "idle" | "pending" | "succeeded" | "failed";
};

const initialState: UserState = {
  loading: "idle",
  allUsers: [],
  user: {},
  approvedUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(approveUserAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(approveUserAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
      })
      .addCase(approveUserAction.rejected, (state, action) => {
        state.loading = "failed";
      })
      .addCase(blockUserAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(blockUserAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
      })
      .addCase(blockUserAction.rejected, (state, action) => {
        state.loading = "failed";
      })
      .addCase(getAllUserAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllUserAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.allUsers = action.payload.payload;
      })
      .addCase(getAllUserAction.rejected, (state, action) => {
        state.loading = "failed";
      })
      .addCase(getUserAction.pending, (state, action) => {
        state.loading = "succeeded";
        state.user = action && action.payload;
      })
      .addCase(getUserAction.rejected, (state, action) => {
        state.loading = "failed";
      })
      .addCase(createUserAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createUserAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload.payload;
      })
      .addCase(createUserAction.rejected, (state, action) => {
        state.loading = "failed";
      })
      .addCase(updateUserAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload.payload;
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.loading = "failed";
      })
      .addCase(deleteUserAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
      })
      .addCase(deleteUserAction.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

const allUsers = (state: RootState) => state.user.allUsers;
const user = (state: RootState) => state.user.user;
const approvedUsers = (state: RootState) => state.user.approvedUsers;
const loading = (state: RootState) => state.user.loading;

export const userSelectors = {
  allUsers,
  user,
  approvedUsers,
  loading,
};

export default userSlice;
