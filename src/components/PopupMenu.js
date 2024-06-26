import { useState } from "react";
import { IconButton } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import MenuButtons from "./UI/MenuButtons";
import { useDispatch } from "react-redux";
import { addReadOnly } from "../reduxStore/employeeSlice";

const PopupMenu = ({
  data,
  setDataForEdit,
  setDeleteData,
  setShowDeleteDialog,
  setShowForm,
}) => {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowData(data);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (data) => {
    setDataForEdit(data);
    setShowForm(true);
  };

  const handleDelete = (data) => {
    setDeleteData(data);
    setShowDeleteDialog(true);
    handleClose();
  };

  const handleSubmit = (data) => {
    dispatch(addReadOnly(data));
    handleClose();
    // Add your submit for review logic here
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertOutlinedIcon />
      </IconButton>
      {selectedRowData?.id === data.id && (
        <MenuButtons
          menuAnchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          data={selectedRowData}
          onEdit={() => handleEdit(selectedRowData)}
          onDelete={() => handleDelete(selectedRowData)}
          onSubmit={() => handleSubmit(selectedRowData)}
        />
      )}
    </>
  );
};
export default PopupMenu;
