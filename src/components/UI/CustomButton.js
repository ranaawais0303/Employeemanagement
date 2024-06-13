import React from "react";
import { Button, Grid } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { styles } from "../../constants/constant";

const CustomButton = ({
  children,
  sx,
  disabled,
  add,
  buttonClose,
  ...props
}) => (
  <Grid
    item
    sx={[{ textAlign: "center", mt: "3vh", ml: "3vh", mb: "3vh" }, sx]}
  >
    <Button
      disabled={disabled}
      disableElevation
      variant="contained"
      sx={{ fontFamily: styles.fontFamily, height: "40px", padding: 2 }}
      endIcon={
        buttonClose && (buttonClose === "Save" ? <PostAddIcon /> : <SaveIcon />)
      }
      style={{
        backgroundColor: disabled ? "" : add ? "green" : styles.backgroundColor,
        textTransform: "none",
      }}
      {...props}
    >
      {children}
    </Button>
  </Grid>
);

export default CustomButton;
