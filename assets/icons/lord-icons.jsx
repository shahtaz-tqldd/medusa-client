import React from "react";

const LordIcon = ({
  icon = "",
  height = 60,
  width = 60,
  target = "div",
  trigger = "hover",
  primary = "#9cf4a7",
  secondary = "#30c9e8",
  rotate = "0deg",
}) => {
  return (
    <lord-icon
      target={target}
      src={`https://cdn.lordicon.com/${icon}.json`}
      trigger={trigger}
      colors={`primary:${primary},secondary:${secondary}`}
      style={{ width: `${width}px`, height: `${height}px`, rotate: rotate }}
    />
  );
};

export default LordIcon;
