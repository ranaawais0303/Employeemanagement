import { Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styles } from "../../constants/constant";
const PopupHeader = ({ name, onCancel }) => {
  return (
    <Grid display="flex" alignItems="center" justifyContent="space-between">
      <Typography
        variant="h5"
        style={{
          margin: "1vh",
          fontFamily: styles.fontFamily,
          color: styles.textColor,
        }}
      >
        {name}
      </Typography>
      <IconButton onClick={onCancel}>
        <CloseIcon />
      </IconButton>
    </Grid>
  );
};

export default PopupHeader;
