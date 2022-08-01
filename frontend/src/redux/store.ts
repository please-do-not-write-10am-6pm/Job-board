import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { createLogger } from "redux-logger";

import userSlice from "./slices/userSlice";
import jobSlice from "./slices/jobSlice";
import bidSlice from "./slices/bidSlice";
import authSlice from "./slices/authSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  job: jobSlice.reducer,
  bid: bidSlice.reducer,
  auth: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
