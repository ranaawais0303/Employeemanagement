import React,{useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { selectRow } from '../reduxStore/calendarSlice';
import { FaRegTrashCan } from "react-icons/fa6";

const Row = ({ data,count,index,onDelete, check }) => {
    const dispatch = useDispatch();
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        console.log(data,"612: data")
        dispatch(selectRow({ index,data })); 
        setIsSelected(!isSelected); // 
      };
  
      useEffect(() => {
        setIsSelected(check); // Set isSelected based on received check prop
      }, [check]);

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
        <input type="checkbox" onClick={handleClick} checked={ isSelected}/>
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