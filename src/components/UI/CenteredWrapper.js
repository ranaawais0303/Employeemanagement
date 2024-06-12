import { Grid } from "@mui/material";

const CenteredWrapper = ({ children }) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "98vh",
      }}
    >
      {children}
    </Grid>
  );
};

export default CenteredWrapper;
