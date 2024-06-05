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
    const date = row.date;
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
  const [checkedItems, setCheckedItems] = useState({});

  const dispatch = useDispatch();
  const { rows, selectedRows } = useSelector((store) => store.calendar);

  const handleCheckboxChange = (rowIndex, isChecked) => {
    setCheckedItems((prevItems) => ({
      ...prevItems,
      [rowIndex]: isChecked,
    }));
  };

  const dataSets = groupByDateAndSumValue(rows);

  const handleDelete = (index) => {
    dispatch(deleteRow({ index }));
  };

  const tableRows = rows.map((item, index) => (
    <Row
      key={index}
      data={item}
      count={index + 1}
      index={index}
      isChecked={!!checkedItems[index]}
      onDelete={handleDelete}
      onChange={handleCheckboxChange}
    />
  ));

  const handleChart = () => {
    setShowChart(true);
    dispatch(chartData(dataSets));
    dispatch(clearSelectedRow());
    setCheckedItems({});
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
        <tbody>{tableRows}</tbody>
      </table>
      {showChart && <Chart3 />}
    </div>
  );
};

export default Table;
