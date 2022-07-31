import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllBidsOnEachJob,
  getBid,
  createBid,
  updateBid,
  deleteBid,
} from "api/apiCaller";
import { accessSync } from "fs";

export const getAllBidsOnEachJobAction = createAsyncThunk(
  "getAllBidsOnEachJobAction",
  async (jobId: number) => {
    const res = await getAllBidsOnEachJob(jobId);
    return res.data;
  }
);

export const getBidAction = createAsyncThunk(
  "getBidAction",
  async (ids: { jobId: number; bidId: number }) => {
    const res = await getBid(ids);
    return res.data;
  }
);

export const createBidAction = createAsyncThunk(
  "createBidAction",
  async (data: { data: object; jobId: number }) => {
    const res = await createBid(data);
    return res.data;
  }
);

export const updateBidAction = createAsyncThunk(
  "updateBidAction",
  async (data: { data: object; jobId: number; bidId: number }) => {
    const res = await updateBid(data);
    return res.data;
  }
);

export const deleteBidAction = createAsyncThunk(
  "deleteBidAction",
  async (ids: { jobId: number; bidId: number }) => {
    const res = await deleteBid(ids);
    return res.data;
  }
);
