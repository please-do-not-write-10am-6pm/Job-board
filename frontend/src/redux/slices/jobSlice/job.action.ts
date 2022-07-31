import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  approveJob,
  blockJob,
} from "api/apiCaller";

export const getAllJobsAction = createAsyncThunk(
  "getAllJobsAction",
  async () => {
    const res = await getAllJobs();
    return res.data;
  }
);

export const getJobAction = createAsyncThunk(
  "getJobAction",
  async (id: number) => {
    const res = await getJob(id);
    return res.data;
  }
);

export const createJobAction = createAsyncThunk(
  "createJobAction",
  async (data: object) => {
    const res = await createJob(data);
    return res.data;
  }
);

export const updateJobAction = createAsyncThunk(
  "api/update/user",
  async (data: { data: object; id: number }) => {
    const res = await updateJob(data);
    return res.data;
  }
);

export const deleteJobAction = createAsyncThunk(
  "deleteUserAction",
  async (id: number) => {
    const res = await deleteJob(id);
    return res.data;
  }
);

export const approveJobAction = createAsyncThunk(
  "approvedJob",
  async (id: number) => {
    const res = await approveJob(id);
    return res.data;
  }
);

export const blockJobAction = createAsyncThunk(
  "blockJobAction",
  async (id: number) => {
    const res = await blockJob(id);
    return res.data;
  }
);
