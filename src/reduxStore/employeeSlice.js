import { createSlice } from "@reduxjs/toolkit";
import { id } from "../constants/constant";
import { startTransition } from "react";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    readOnly: localStorage.getItem("readOnly") || false,
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
            };
          } else {
            return row;
          }
        });
      }
      state.employeeData = updatedEmployeeData;
      console.log(updatedEmployeeData, "updated data");
      localStorage.setItem("empData", JSON.stringify(updatedEmployeeData));
      // state.readOnly = true;
      // localStorage.setItem("readOnly", true);
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
            };
          } else {
            return row;
          }
        });
      } else {
        const employeeId = id();
        console.log("id------------", employeeId);
        updatedEmployeeData = [
          ...state.employeeData, // Spread existing employee data
          { ...action.payload, id: employeeId }, // New employee object with destructured data
        ];
      }
      state.employeeData = updatedEmployeeData;
      console.log(updatedEmployeeData, "updated data");
      localStorage.setItem("empData", JSON.stringify(updatedEmployeeData));
    },

    updateEmployee: (state, action) => {
      //   const existingData = localStorage.getItem(localStorageKey);
      //   const existingDataJSON = existingData ? JSON.parse(existingData) : {};
      //   const { avatar, firstName, lastName } = action.payload;
      //   const data = {
      //     ...existingDataJSON,
      //     avatar: avatar,
      //     fullName: lastName + " " + firstName,
      //   };
      //   state.userData = data;
      //   localStorage.setItem(localStorageKey, JSON.stringify(data));
    },

    removeEmployee: (state, action) => {
      console.log("id delet--------", action.payload.id);
      let updatedEmployeeData = state.employeeData;
      updatedEmployeeData = updatedEmployeeData.filter(
        (row) => row.id !== action.payload.id
      );

      state.employeeData = updatedEmployeeData;
      console.log(updatedEmployeeData, "updated data");
      localStorage.setItem("empData", JSON.stringify(updatedEmployeeData));
      // state.userData = null;
      // localStorage.removeItem("employee");
    },
  },
});

export const { addEmployee, removeEmployee, addReadOnly } =
  employeeSlice.actions;
export default employeeSlice.reducer;
