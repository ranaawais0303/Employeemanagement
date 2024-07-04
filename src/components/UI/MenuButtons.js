import React, { useEffect, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Assignment } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { styles } from "../../constants/constant";
import { useSelector } from "react-redux";

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
  const [iconName, setIconName] = useState([]);

  const { isAdmin } = useSelector((store) => store.auth);
  console.log(data?.readOnly, isAdmin, "readonly and is admin");

  const MENU_ICONS = [
    {
      id: 1,
      name: "Edit",
      icon: <EditIcon style={styled} />,
      onClick: onEdit && onEdit,
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
    {
      id: 5,
      name: "Ready For Review",
      icon: <Assignment style={styled} />,
      onClick: "",
    },
    {
      id: 6,
      name: "Review",
      icon: <VisibilityOutlinedIcon style={styled} />,
      onClick: onEdit,
    },
  ];

  const selectedIcons = () => {
    const filterIcons = (excludedIds) =>
      MENU_ICONS.filter((icon) => !excludedIds.includes(icon.id));

    if (data?.status === "Is Processed") {
      setIconName(filterIcons([1, 3, 4, 5, 6]));
      return;
    }
    if (data?.status === "Is Rejected") {
      setIconName(filterIcons([2, 3, 4, 5, 6]));
      return;
    }

    const excludedIds = data?.readOnly
      ? isAdmin
        ? [1, 2, 4, 5]
        : [1, 4, 6]
      : [2, 5, 6];

    setIconName(filterIcons(excludedIds));

    // if (data?.readOnly && !isAdmin) {
    //   setIconName(filterIcons([1, 4, 6]));
    // } else if (data?.readOnly && isAdmin) {
    //   setIconName(filterIcons([1, 2, 4, 5]));
    // } else {
    //   setIconName(filterIcons([2, 5, 6]));
    // }
  };

  console.log(iconName, "icon name");

  useEffect(() => {
    selectedIcons();
  }, [open]);

  return (
    <Menu anchorEl={menuAnchorEl} open={open} onClose={onClose}>
      {iconName.map(({ name, icon, onClick }) => (
        <MenuItem
          key={name}
          style={{ fontFamily: styles.fontFamily, color: styles.textColor }}
          disabled={name === "Ready For Review"}
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
