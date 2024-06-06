import React from "react";
import { useDispatch } from "react-redux";
import { selectRow } from "../reduxStore/calendarSlice";
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import Checkbox from "./Checkbox";

const Row = ({ data, count, index, onDelete, onChange, isChecked }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectRow({ index, data }));
    onChange(index, !isChecked);
  };

  const styles = {
    td: {
      padding: "8px",
      border: "1px solid #ddd",
      textAlign: "left",
    },
  };

  return (
    <tr>
      <td style={styles.td}>
        <Checkbox isChecked={isChecked} onChange={handleClick} />
      </td>
      <td style={styles.td}>{count}</td>
      <td style={styles.td}>{data.date}</td>
      <td style={styles.td}>{data.value}</td>
      <td style={styles.td}>
        <button disabled={!isChecked} onClick={() => onDelete(index)}>
          <FaRegTrashCan color={isChecked ? "red" : "black"} />
        </button>
        <button style={{ marginLeft: "5px" }}>
          <FaPencil color={isChecked ? "blue" : "black"} />
        </button>
      </td>
    </tr>
  );
};

export default Row;
