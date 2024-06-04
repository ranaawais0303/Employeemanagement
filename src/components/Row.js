import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { selectRow } from '../reduxStore/calendarSlice';
import { FaRegTrashCan } from "react-icons/fa6";

const Row = ({ data,count,index,onDelete }) => {
    const dispatch = useDispatch();
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        dispatch(selectRow({ index })); 
        setIsSelected(!isSelected); // 
      };
  

  const styles = {
    td: {
      padding: '8px',
      border: '1px solid #ddd',
      textAlign: 'left',
    },
  };
  
  return (
    <tr>
      <td style={styles.td}>
        <input type="checkbox" onClick={handleClick} />
      </td>
      <td style={styles.td}>{count}</td>
      <td style={styles.td}>{data.date}</td>
      <td style={styles.td}>{data.value}</td>
      <td style={styles.td}>
        <button disabled={!isSelected} onClick={() => onDelete(index)}>
          <FaRegTrashCan color={isSelected&&'red'}/>
        </button>
      </td>
    </tr>
  );
};

export default Row;