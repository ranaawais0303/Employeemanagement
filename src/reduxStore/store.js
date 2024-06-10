import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "./calendarSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarSlice,
    auth: authSlice,
  },
});
