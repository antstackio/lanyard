import React from "react";

import Variables from "../jss/Variables";

const closeSVG = props => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <g clipPath="url(#clip0)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.38578 0L0 2.38578L14.3147 16.7004L21.472 23.8578L23.8578 21.472L16.7005 14.3147L2.38578 0Z"
        fill="#FF9900"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.8578 2.38578L21.472 0L7.15734 14.3147L0 21.472L2.38578 23.8578L9.54313 16.7005L23.8578 2.38578Z"
        fill="#FF9900"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width={24} height={24} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default closeSVG;