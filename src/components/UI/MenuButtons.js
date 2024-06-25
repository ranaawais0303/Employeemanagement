import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Assignment } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { styles } from "../../constants/constant";

const styled = { color: styles.textColor };

const MenuButtons = ({
  open,
  onClose,
  menuAnchorEl,
  data,
  onEdit,
  onDelete,
  onSubmit,
}) => {
  console.log(data, "here is the full data for edit case", menuAnchorEl);
  const [iconName, setIconName] = useState([]);

  const MENU_ICONS = [
    {
      id: 1,
      name: "Edit",
      icon: <EditIcon style={styled} />,
      onClick: onEdit,
    },
    {
      id: 2,
      name: "View",
      icon: <VisibilityOutlinedIcon style={styled} />,
      onClick: onEdit,
    },
    {
      id: 3,
      name: "Delete",
      icon: <DeleteForeverIcon style={styled} />,
      onClick: onDelete,
    },
    {
      id: 4,
      name: "Submit For Review",
      icon: <Assignment style={styled} />,
      onClick: onSubmit,
    },
  ];

  const selectedIcons = () => {
    if (data.readOnly) setIconName(MENU_ICONS.filter((icon) => icon.id !== 1));
    else setIconName(MENU_ICONS.filter((icon) => icon.id !== 2));
  };

  useEffect(() => {
    selectedIcons();
  }, [open]);

  return (
    <Menu anchorEl={menuAnchorEl} open={open} onClose={onClose}>
      {iconName.map(({ name, icon, onClick }) => (
        <MenuItem
          key={name}
          style={{ fontFamily: styles.fontFamily, color: styles.textColor }}
          onClick={() => {
            onClick();
            onClose();
          }}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          {name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default MenuButtons;
