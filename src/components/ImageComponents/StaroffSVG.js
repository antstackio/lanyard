import React from "react";
import Variables from "../jss/Variables";

const StaroffSVG = props => (
  <svg width={48} height={46} viewBox="0 0 48 46" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M29.613 17.2747L24.0001 0L18.3872 17.2747H0.223633L14.9183 27.9509L9.30542 45.2253L24.0001 34.5491L38.6947 45.2253L33.0819 27.9509L47.7765 17.2747H29.613ZM28.7149 18.5107L24.0001 4L19.2853 18.5107H4.02789L16.3714 27.4788L11.6566 41.9893L24.0001 33.0212L36.3436 41.9893L31.6288 27.4788L43.9723 18.5107H28.7149Z"
      fill={Variables.dark_base_color ? Variables.dark_base_color : "#ff9900"}
    />
  </svg>
);

export default StaroffSVG;