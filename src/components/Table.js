
// import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  deleteRow  } from '../reduxStore/calendarSlice' // Import actions
import Row from './Row';

const Table = () => {
    const dispatch = useDispatch();

    const {rows, selectedRows} = useSelector((store) => store.calendar);
    
  
    console.log(selectedRows,"612: selected rows")
    

    const handleDelete = (index) => { 
        dispatch(deleteRow({ index }));
      };

    const styles = {
        table: {
          borderCollapse: 'collapse',
          width: '100%',
        },
        th: {
          padding: '8px',
          border: '1px solid #ddd',
          textAlign: 'left',
        },
      };
  
    return (
      <div>
        <h2>Table</h2>
        <button style={{textAlign:'right'}} disabled={selectedRows.length<1}>Make Chart</button>
        <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>checkbox</th> 
            <th style={styles.th}>count</th>
            <th style={styles.th}>date</th>
            <th style={styles.th}>value</th>
            <th style={styles.th}>action</th>

          </tr>
        </thead>
          <tbody>
            {rows.map((row,index) => (
              <Row key={row} data={row} count={index+1} index={index} onDelete={handleDelete}/>
            ))}
          </tbody>
        </table>
  
      </div>
    );
};

export default Table;