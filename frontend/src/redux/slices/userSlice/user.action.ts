import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  approveUser,
  blockUser,
  createUser,
  deleteUser,
  getAllUser,
  getProfile,
  editProfile,
  getUser,
  updateUser,
} from "api/apiCaller";

export const approveUserAction = createAsyncThunk(
  "approveUserAction",
  async (id: number) => {
    const res = await approveUser(id);
    return res.data;
  }
);

export const blockUserAction = createAsyncThunk(
  "blockUserAction",
  async (id: number) => {
    const res = await blockUser(id);
    return res.data;
  }
);

export const getAllUserAction = createAsyncThunk(
  "getAllUserAction",
  async () => {
    const res = await getAllUser();
    return res.data;
  }
);

export const getUserAction = createAsyncThunk(
  "getUserAction",
  async (id: number) => {
    const res = await getUser(id);
    return res.data;
  }
);

export const createUserAction = createAsyncThunk(
  "createUserAction",
  async (data: object) => {
    const res = await createUser(data);
    return res.data;
  }
);

export const updateUserAction = createAsyncThunk(
  "api/update/user",
  async (data: { data: object; id: number }) => {
    const res = await updateUser(data);
    return res.data;
  }
);

export const deleteUserAction = createAsyncThunk(
  "deleteUserAction",
  async (id: number) => {
    const res = await deleteUser(id);
    return res.data;
  }
);

export const getProfileAction = createAsyncThunk(
  "getProfileAction",
  async () => {
    const res = await getProfile();
    return res.data;
  }
);

export const editProfileAction = createAsyncThunk(
  "editProfileAction",
  async (data: object) => {
    const res = await editProfile(data);
    return res.data;
  }
);
