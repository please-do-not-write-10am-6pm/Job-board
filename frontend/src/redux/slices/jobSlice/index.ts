import { createSlice } from "@reduxjs/toolkit";
import { JobObject } from "./job.type";
import { RootState } from "../../store";
import {
  createJobAction,
  deleteJobAction,
  getAllJobsAction,
  getJobAction,
  updateJobAction,
} from "./job.action";

type JobState = {
  allJobs: JobObject[];
  job: any;
  approvedJobs: JobObject[];
  loading: "idle" | "pending" | "succeeded" | "failed";
};

const initialState: JobState = {
  allJobs: [],
  job: {},
  approvedJobs: [],
  loading: "idle",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobsAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllJobsAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.allJobs = action.payload.payload;
      })
      .addCase(getAllJobsAction.rejected, (state, action) => {
        state.loading = "failed";
      })
      .addCase(getJobAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getJobAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.job = action.payload.payload;
      })
      .addCase(getJobAction.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createJobAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createJobAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.job = action.payload.payload;
        state.allJobs = [action.payload.payload, ...state.allJobs];
      })
      .addCase(createJobAction.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(updateJobAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateJobAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.job = action.payload.payload;
      })
      .addCase(updateJobAction.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(deleteJobAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteJobAction.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(deleteJobAction.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

const allJobs = (state: RootState) => state.job.allJobs;
const job = (state: RootState) => state.job.job;
const approvedJobs = (state: RootState) => state.job.approvedJobs;
const loading = (state: RootState) => state.job.loading;

export const jobSelectors = {
  allJobs,
  job,
  approvedJobs,
  loading,
};

export default jobSlice;
