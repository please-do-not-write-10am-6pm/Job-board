import { createSlice } from "@reduxjs/toolkit";

import { BidObject } from "./bid.type";
import { RootState } from "redux/store";
import {
  createBidAction,
  deleteBidAction,
  getAllBidsOnEachJobAction,
  getBidAction,
  updateBidAction,
} from "./bid.action";

type BidState = {
  allBidsOnJob: BidObject[];
  bid: any;
  loading: "idle" | "pending" | "succeeded" | "failed";
};

const initialState: BidState = {
  allBidsOnJob: [],
  bid: {},
  loading: "idle",
};

const bidSlice = createSlice({
  name: "bid",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBidsOnEachJobAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getAllBidsOnEachJobAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.allBidsOnJob = action.payload.payload;
      })
      .addCase(getAllBidsOnEachJobAction.rejected, (state, action) => {
        state.loading = "failed";
      })
      .addCase(getBidAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getBidAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.bid = action.payload.payload;
      })
      .addCase(getBidAction.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(createBidAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(createBidAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.bid = action.payload.payload;
      })
      .addCase(createBidAction.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(updateBidAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateBidAction.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.bid = action.payload.payload;
      })
      .addCase(updateBidAction.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(deleteBidAction.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteBidAction.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(deleteBidAction.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

const allBidsOnJob = (state: RootState) => state.bid.allBidsOnJob;
const bid = (state: RootState) => state.bid.bid;

export const bidSelectors = {
  allBidsOnJob,
  bid,
};

export default bidSlice;
