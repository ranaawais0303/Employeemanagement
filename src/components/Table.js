import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  chartData,
  clearSelectedRow,
  deleteRow,
} from "../reduxStore/calendarSlice"; // Import actions
import Row from "./Row";
import Chart3 from "./Chart"; // Import Chart component

const groupByDateAndSumValue = (rows) => {
  const groupedData = {};

  for (const row of rows) {
    const date = row.date; // Assuming 'date' and 'value' are properties in your row object
    const value = Number(row.value);

    if (groupedData.hasOwnProperty(date)) {
      groupedData[date].count++;
      groupedData[date].total += value;
    } else {
      groupedData[date] = { count: 1, total: value };
    }
  }

  return groupedData;
};

const Table = () => {
  const [showChart, setShowChart] = useState(false);
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();

  const { rows, selectedRows } = useSelector((store) => store.calendar);

  const dataSets = groupByDateAndSumValue(rows); // Calculate data sets from rows

  console.log(selectedRows, "712: selected Rows");
  const handleDelete = (index) => {
    dispatch(deleteRow({ index }));
  };

  const handleChart = () => {
    setShowChart(true);
    setCheck(false); // Clear selection
    dispatch(chartData(dataSets)); // Dispatch action with data sets
    dispatch(clearSelectedRow()); // Clear selected rows
  };

  const styles = {
    table: {
      borderCollapse: "collapse",
      width: "100%",
    },
    th: {
      padding: "8px",
      border: "1px solid #ddd",
      textAlign: "left",
    },
  };

  return (
    <div>
      <h2>Table</h2>
      <div style={{ textAlign: "right", marginBottom: "5px" }}>
        <button disabled={selectedRows.length < 1} onClick={handleChart}>
          Make Chart
        </button>
      </div>
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
          {rows.map((row, index) => (
            <Row
              key={row.id || index} // Use a unique key for rows
              data={row}
              count={index + 1}
              index={index}
              onDelete={handleDelete}
              check={check}
            />
          ))}
        </tbody>
      </table>
      {showChart && <Chart3 />}
      {/* Conditionally render Chart */}
    </div>
  );
};

export default Table;
