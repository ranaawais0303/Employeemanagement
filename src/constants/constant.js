export const styles = {
  backgroundColor: "#14452F",
  textGreen: "#489840",
  textColor: "#052965",
  fontFamily: "sans-serif",
};
export const id = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
};
