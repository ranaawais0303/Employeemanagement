import { createSlice } from "@reduxjs/toolkit";
import { id } from "../constants/constant";

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
      const uid = id();
      if (state.selectedDate && state.value) {
        if (action.payload || action.payload === 0) {
          const index =
            typeof action?.payload === "number"
              ? action?.payload
              : action?.payload.id;

          state.rows = state.rows.map((row) => {
            if (row.id === index) {
              return {
                id: row.id,
                date: state.selectedDate,
                value: state.value,
              };
            } else {
              return row;
            }
          });
          state.selectedDate = "";
          state.value = "";
        } else {
          state.rows.push({
            id: uid,
            date: state.selectedDate,
            value: state.value,
          });
          state.selectedDate = "";
          state.value = "";
        }
      }
    },

    selectRow: (state, action) => {
      const { id } = action.payload;
      const isSelected = state.selectedRows.includes(id);
      if (!isSelected) {
        state.selectedRows.push(id);
      } else {
        state.selectedRows = state.selectedRows.filter((uid) => uid !== id);
      }
    },

    clearSelectedRow: (state, action) => {
      state.selectedRows = [];
    },

    deleteRow: (state, action) => {
      const { index } = action.payload;
      state.rows = state.rows.filter((row, i) => row.id !== index);
      state.selectedRows = state.selectedRows?.filter((selectedIndex) => {
        return selectedIndex !== index;
      });
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
