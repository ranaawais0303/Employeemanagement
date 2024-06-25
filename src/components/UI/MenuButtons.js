import React from "react";
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
  handleViewPopupClose,
}) => {
  console.log(data, "here is the full data for edit case");
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
      onClick: handleViewPopupClose,
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

  return (
    <Menu
      anchorEl={menuAnchorEl}
      open={open}
      onClose={onClose}
      //   PaperProps={{
      //     elevation: 0,
      //     sx: {
      //       overflow: "visible",
      //       filter: "drop-shadow(1px 1px 3px rgba(0,0,0,0.09))",
      //       mt: 1.5,
      //       "& .MuiAvatar-root": {
      //         width: 32,
      //         height: 32,
      //         ml: -0.5,
      //         mr: 1,
      //       },
      //       "&:before": {
      //         content: '""',
      //         display: "block",
      //         position: "absolute",
      //         top: 0,
      //         right: 14,
      //         width: 10,
      //         height: 10,
      //         bgcolor: "background.paper",
      //         transform: "translateY(-50%) rotate(45deg)",
      //         zIndex: 0,
      //       },
      //     },
      //   }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
    >
      {MENU_ICONS.map(({ name, icon, onClick }) => (
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
