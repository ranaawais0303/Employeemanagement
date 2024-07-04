import { createSlice } from "@reduxjs/toolkit";
import { id } from "../constants/constant";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employeeData: JSON.parse(localStorage.getItem("empData")) || [],
  },
  reducers: {
    addReadOnly: (state, action) => {
      let updatedEmployeeData = state.employeeData;
      if (action.payload?.id) {
        updatedEmployeeData = state.employeeData.map((row) => {
          if (row.id === action.payload.id) {
            return {
              ...action.payload,
              readOnly: true,
              status: "In review",
            };
          } else {
            return row;
          }
        });
      }
      state.employeeData = updatedEmployeeData;
      localStorage.setItem("empData", JSON.stringify(updatedEmployeeData));
    },

    isProcessed: (state, action) => {
      let updatedEmployeeData = state.employeeData;
      console.log(action.payload);
      if (action.payload) {
        updatedEmployeeData = state.employeeData.map((row) => {
          if (row.id === action.payload) {
            return {
              ...row,
              status: "Is Processed",
            };
          } else {
            return row;
          }
        });
      }
      state.employeeData = updatedEmployeeData;
      localStorage.setItem("empData", JSON.stringify(updatedEmployeeData));
    },

    isRejected: (state, action) => {
      let updatedEmployeeData = state.employeeData;
      console.log(action.payload);
      if (action.payload) {
        updatedEmployeeData = state.employeeData.map((row) => {
          if (row.id === action.payload) {
            return {
              ...row,
              status: "Is Rejected",
              readOnly: false,
            };
          } else {
            return row;
          }
        });
      }
      state.employeeData = updatedEmployeeData;
      localStorage.setItem("empData", JSON.stringify(updatedEmployeeData));
    },

    removeReadOnly: (state, action) => {
      // state.readOnly = false;
      // localStorage.removeItem("readOnly");
    },

    addEmployee: (state, action) => {
      let updatedEmployeeData = state.employeeData;

      if (action.payload?.id) {
        updatedEmployeeData = state.employeeData.map((row) => {
          if (row.id === action.payload.id) {
            return {
              ...action.payload,
              status: "Submit for review",
            };
          } else {
            return row;
          }
        });
      } else {
        const employeeId = id();
        updatedEmployeeData = [
          ...state.employeeData, // Spread existing employee data
          { ...action.payload, id: employeeId, status: "Submit for review" }, // New employee object with destructured data
        ];
      }
      state.employeeData = updatedEmployeeData;
      localStorage.setItem("empData", JSON.stringify(updatedEmployeeData));
    },

    removeEmployee: (state, action) => {
      let updatedEmployeeData = state.employeeData;
      updatedEmployeeData = updatedEmployeeData.filter(
        (row) => row.id !== action.payload.id
      );

      state.employeeData = updatedEmployeeData;
      localStorage.setItem("empData", JSON.stringify(updatedEmployeeData));
      // state.userData = null;
      // localStorage.removeItem("employee");
    },
  },
});

export const {
  addEmployee,
  removeEmployee,
  addReadOnly,
  isProcessed,
  isRejected,
} = employeeSlice.actions;
export default employeeSlice.reducer;
