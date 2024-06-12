import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PropTypes from "prop-types";

const OutlinedCard = ({ children, ...props }) => (
  <Card
    variant="outlined"
    className=" drop-shadow-2xl m-4"
    sx={{ borderRadius: "15px", minHeight: 400 }}
    {...props}
  >
    <CardContent>{children}</CardContent>
  </Card>
);

OutlinedCard.propTypes = {
  children: PropTypes.node,
};

export default OutlinedCard;
