import { createAsyncThunk } from "@reduxjs/toolkit";
import { register, login } from "api/apiCaller";

export const registerAction = createAsyncThunk(
  "api/signUp",
  async (data: object) => {
    const res = await register(data);
    return res.data;
  }
);

export const loginAction = createAsyncThunk(
  "api/signIn",
  async (data: object) => {
    const res = await login(data);
    return res.data;
  }
);
