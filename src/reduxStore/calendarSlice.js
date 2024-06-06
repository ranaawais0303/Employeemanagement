import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    selectedDate: "",
    value: "",
    id: 0,
    rows: [],
    selectedRows: [],
    dataSet: [],
  },
  reducers: {
    selectDate: (state, action) => {
      state.selectedDate = action.payload;
    },

    addValue: (state, action) => {
      state.value = action.payload;
    },

    addRow: (state, action) => {
      // state.rows.push(action.payload);
      state.rows.push({ date: state.selectedDate, value: state.value });
      state.selectedDate = "";
      state.value = "";
    },

    selectRow: (state, action) => {
      const { index } = action.payload;
      const isSelected = state.selectedRows.includes(index);
      if (!isSelected) {
        state.selectedRows.push(index);
      } else {
        state.selectedRows = state.selectedRows.filter(
          (selectedIndex) => selectedIndex !== index
        );
      }
    },

    clearSelectedRow: (state, action) => {
      state.selectedRows = [];
    },

    deleteRow: (state, action) => {
      const { index } = action.payload;
      state.rows = state.rows.filter((row, i) => i !== index);
      state.selectedRows = state.selectedRows.filter(
        (selectedIndex) => selectedIndex !== index
      );
    },

    chartData: (state, action) => {
      state.dataSet = action.payload;
    },
  },
});
export const {
  addRow,
  selectRow,
  deleteRow,
  chartData,
  clearSelectedRow,
  selectDate,
  addValue,
} = calendarSlice.actions;
export default calendarSlice.reducer;
