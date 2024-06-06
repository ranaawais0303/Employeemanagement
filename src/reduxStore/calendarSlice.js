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
      const id = () => {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return "_" + Math.random().toString(36).substr(2, 9);
      };
      const uid = id();
      console.log(uid, "here is the id ");
      if (action.payload || action.payload === 0) {
        const index =
          typeof action?.payload === "number"
            ? action?.payload
            : action?.payload.id;

        state.rows = state.rows.map((row) => {
          if (row.id === index) {
            return { id: row.id, date: state.selectedDate, value: state.value };
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
