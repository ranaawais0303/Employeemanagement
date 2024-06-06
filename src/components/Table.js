import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addValue,
  chartData,
  clearSelectedRow,
  deleteRow,
  selectDate,
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

const Table = ({ setIndex }) => {
  const [showChart, setShowChart] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});

  const dispatch = useDispatch();
  const { rows, selectedRows } = useSelector((store) => store.calendar);

  //handle overall change in checkbox so that clear all
  //or operation on all checkboxes will be easy
  const handleCheckboxChange = (index, isChecked) => {
    setCheckedItems((prevItems) => {
      return {
        ...prevItems,
        [index]: isChecked,
      };
    });
  };

  //make row data for dataSet so that forward this data to chart
  //when click on make chart button
  const rowData = selectedRows.map((id) => rows.find((row) => row.id === id));
  const dataSets = useMemo(() => groupByDateAndSumValue(rowData), [rowData]);

  const handleDelete = (id) => {
    dispatch(deleteRow({ index: id }));
    setCheckedItems((id = !checkedItems[id]));
  };

  const handleUpdate = (id) => {
    const rowDataForEdit = rows.find((row) => row.id === id);
    setIndex(id);

    dispatch(selectDate(rowDataForEdit.date));
    dispatch(addValue(rowDataForEdit.value));
  };

  //render rows according to the data
  const tableRows = rows.map((item, index) => (
    <Row
      key={index}
      data={item}
      count={index + 1}
      index={index}
      isChecked={!!checkedItems[index]}
      onDelete={() => handleDelete(item.id)}
      onChange={handleCheckboxChange}
      handleUpdate={handleUpdate}
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
            <th style={styles.th}>Select</th>
            <th style={styles.th}>Count</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Value</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      {showChart && <ChartComp setShowPieChart={setShowChart} />}
    </div>
  );
};

export default Table;
