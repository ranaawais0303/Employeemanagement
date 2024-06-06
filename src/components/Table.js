import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  chartData,
  clearSelectedRow,
  deleteRow,
} from "../reduxStore/calendarSlice";
import Row from "./Row";
import ChartComp from "./Chart";

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

  //handle overall change in checkbox so that clear all
  //or operation on all checkboxes will be easy
  const handleCheckboxChange = (rowIndex, isChecked) => {
    setCheckedItems((prevItems) => ({
      ...prevItems,
      [rowIndex]: isChecked,
    }));
  };

  //make row data for dataSet so that forward this data to chart
  //when click on make chart button
  const rowData = selectedRows.map((index) => rows[index]);
  const dataSets = useMemo(() => groupByDateAndSumValue(rowData), [rowData]);

  const handleDelete = (index) => {
    dispatch(deleteRow({ index }));
    setCheckedItems((checkedItems[index] = !checkedItems[index]));
  };

  //render rows according to the data
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
      {showChart && <ChartComp setShowPieChart={setShowChart} />}
    </div>
  );
};

export default Table;
