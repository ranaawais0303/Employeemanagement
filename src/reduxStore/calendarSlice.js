import { createSlice } from '@reduxjs/toolkit';

const calendarSlice = createSlice({
    name:'calendar',
    initialState:{
        date:null,
        value:0,
        id: 0,
        rows: [],
        selectedRows: [],

    },
    reducers: {
        addRow: (state, action) => {
          state.rows.push(action.payload);
        },
        selectRow: (state, action) => {
            const { index } = action.payload;
      const isSelected = state.selectedRows.includes(index);
      if (!isSelected) {
        state.selectedRows.push(index);
      } else {
        state.selectedRows = state.selectedRows.filter((selectedIndex) => selectedIndex !== index);
      }
        },
        deleteRow: (state, action) => {
            const { index } = action.payload;
            state.rows = state.rows.filter((row, i) => i !== index);
            state.selectedRows = state.selectedRows.filter((selectedIndex) => selectedIndex !== index);
          },
      },
});
export const { addRow, selectRow, deleteRow } = calendarSlice.actions;
export default calendarSlice.reducer;