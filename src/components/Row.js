import React from "react";
import { useDispatch } from "react-redux";
import { selectRow } from "../reduxStore/calendarSlice";
import { FaRegTrashCan, FaPencil } from "react-icons/fa6";
import Checkbox from "./Checkbox";

const Row = ({
  data,
  count,
  index,
  isChecked,
  onDelete,
  onChange,
  handleUpdate,
}) => {
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(selectRow({ id, data }));
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
        <Checkbox
          id={data.id}
          isChecked={isChecked}
          onChange={() => handleClick(data.id)}
        />
      </td>
      <td style={styles.td}>{count}</td>
      <td style={styles.td}>{data.date}</td>
      <td style={styles.td}>{data.value}</td>
      <td style={styles.td}>
        <button onClick={() => onDelete(data.id)}>
          <FaRegTrashCan color="red" />
        </button>
        <button
          style={{ marginLeft: "5px" }}
          onClick={() => handleUpdate(data.id)}
        >
          <FaPencil color="blue" />
        </button>
      </td>
    </tr>
  );
};

export default Row;
