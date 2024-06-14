import { createSlice } from "@reduxjs/toolkit";
import { id } from "../constants/constant";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    readOnly: localStorage.getItem("readOnly") || false,
    employeeData: JSON.parse(localStorage.getItem("empData")) || [],
  },
  reducers: {
    addReadOnly: (state) => {
      state.readOnly = true;
      localStorage.setItem("readOnly", true);
    },

    removeReadOnly: (state) => {
      state.readOnly = false;
      localStorage.removeItem("readOnly");
    },

    addEmployee: (state, action) => {
      const employeeId = id();
      console.log(action.payload, state.employeeData, "action payload ");
      //   const employeeDataExistence = localStorage.getItem("employeeData");
      //   if (employeeDataExistence) {
      //   state.employeeData = state.employeeData.push({
      //     id: employeeId,
      //     ...action.payload,
      //   });
      const updatedEmployeeData = [
        ...state.employeeData, // Spread existing employee data
        { id: employeeId, ...action.payload }, // New employee object with destructured data
      ];
      state.employeeData = updatedEmployeeData;
      console.log(updatedEmployeeData, "updated data");
      localStorage.setItem("empData", JSON.stringify(updatedEmployeeData));
      //   }
      //   else {
      //     localStorage.setItem("employeeData", []);
      //     state.employeeData = state.employeeData.push(action.payload);
      //     localStorage.setItem("employeeData", state.employeeData);
      //   }
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

    removeEmployee: (state) => {
      state.userData = null;
      localStorage.removeItem("employee");
    },
  },
});

export const { addEmployee, removeEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
