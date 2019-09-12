import React from "react";
import Variables from "../jss/Variables";

const StaronSVG = props => (
  <svg width={48} height={46} viewBox="0 0 48 46" fill="none" {...props}>
    <path
      d="M24 0L29.6129 17.2746H47.7764L33.0818 27.9508L38.6946 45.2254L24 34.5491L9.30542 45.2254L14.9182 27.9508L0.223633 17.2746H18.3871L24 0Z"
      fill={Variables.dark_base_color ? Variables.dark_base_color : "#ff9900"}
    />
  </svg>
);

export default StaronSVG;