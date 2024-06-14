import * as React from "react";
import { Modal, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import CenteredWrapper from "pages/updatePassword/CenteredWrapper";
import { styles } from "../../constants/constant";
import CenteredWrapper from "./CenteredWrapper";
import OutlinedCard from "./OutlinedCard";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const ModalComponent = ({
  open,
  setOpen,
  children,
  header,
  sx,
  modalWidth,
  max,
  onCancle,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Modal
      style={sx}
      open={open}
      fullstocreen={fullScreen}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CenteredWrapper>
        <OutlinedCard
          sx={{
            minWidth: modalWidth,
            maxWidth: max,
            overflowY: "auto",
          }}
        >
          <Grid sx={{ width: "100%" }}>
            {header && (
              <>
                <Grid
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="h5"
                    style={{
                      margin: "1vh",
                      fontFamily: styles.fontFamily,
                      color: styles.textColor,
                    }}
                  >
                    {header}
                  </Typography>
                  <IconButton
                    onClick={() => {
                      setOpen(false);
                      localStorage.removeItem("visited");
                      onCancle && onCancle();
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Grid>

                <hr />
              </>
            )}
            {children}
          </Grid>
        </OutlinedCard>
      </CenteredWrapper>
    </Modal>
  );
};

export default ModalComponent;
