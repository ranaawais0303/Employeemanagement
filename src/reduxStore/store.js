import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "./calendarSlice";
import authSlice from "./authSlice";
import employeeSlice from "./employeeSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarSlice,
    auth: authSlice,
    employee: employeeSlice,
  },
});
