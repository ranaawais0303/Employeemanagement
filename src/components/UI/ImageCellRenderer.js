// src/components/ImageCellRenderer.jsx
import React from "react";

const ImageCellRenderer = ({ value }) => {
  return (
    <img
      src={value}
      alt="Employee"
      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
    />
  );
};

export default ImageCellRenderer;
