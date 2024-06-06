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

    clearCheck: (state, action) => {
      state.selectedRows = state.selectedRows.filter(
        (selectedIndex) => selectedIndex !== action.payload
      );
    },

    addRow: (state, action) => {
      if (action.payload || action.payload === 0) {
        const index =
          typeof action?.payload === "number"
            ? action?.payload
            : action?.payload.index;

        state.rows = state.rows.map((row, i) => {
          if (i === index) {
            return { date: state.selectedDate, value: state.value };
          } else {
            return row;
          }
        });
        state.selectedDate = "";
        state.value = "";
      } else {
        state.rows.push({ date: state.selectedDate, value: state.value });
        state.selectedDate = "";
        state.value = "";
      }
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
  clearCheck,
} = calendarSlice.actions;
export default calendarSlice.reducer;
