import React from "react"
import Variables from "../jss/Variables"

const HomebgSVG = props => (
  <svg id="homebgsvg" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M85.087 11.294C79.07 43.074 95.14 116.975 207.556 158.336c57.191 21.042 100.95 26.429 137.342 30.91 14.395 1.772 27.637 3.403 40.102 5.804V0H85.087v11.294z"
      fill="url(#prefix__paint0_linear)"
      fillOpacity={0.25}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.573 0c1.019 27.186 18.705 93.349 115.594 107.996 81.537 12.327 113.594 40.497 140.078 63.769 12.854 11.296 24.395 21.438 39.644 28.055 23.577 10.231 54.243 19.542 81.111 25.678V0H8.573z"
      fill="url(#prefix__paint1_linear)"
      fillOpacity={0.5}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 0c22.67 20.562 60.615 73.101 101.896 77.798 8.588.977 16.839 1.817 24.829 2.63 53.239 5.421 94.86 9.659 146.767 45.345 27.044 18.592 46.738 38.722 63.52 55.876 17.482 17.869 31.805 32.509 47.988 38.822V0H0z"
      fill="url(#prefix__paint2_linear)"
    />
    <defs>
      <linearGradient
        id="prefix__paint0_linear"
        x1={368.824}
        y1={39.25}
        x2={113.975}
        y2={32.059}
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stopColor={
            Variables.dark_base_color ? Variables.dark_base_color : "#ff9900"
          }
        />
        <stop
          offset={1}
          stopColor={
            Variables.dark_base_color_2
              ? Variables.dark_base_color_2
              : "#FFC400"
          }
        />
      </linearGradient>
      <linearGradient
        id="prefix__paint1_linear"
        x1={368.736}
        y1={65.716}
        x2={144.502}
        y2={143.305}
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stopColor={
            Variables.dark_base_color ? Variables.dark_base_color : "#ff9900"
          }
        />
        <stop
          offset={1}
          stopColor={
            Variables.dark_base_color_2
              ? Variables.dark_base_color_2
              : "#FFC400"
          }
        />
      </linearGradient>
      <linearGradient
        id="prefix__paint2_linear"
        x1={204.816}
        y1={11.404}
        x2={202.812}
        y2={191.96}
        gradientUnits="userSpaceOnUse"
      >
        <stop
          stopColor={
            Variables.dark_base_color ? Variables.dark_base_color : "#ff9900"
          }
        />
        <stop
          offset={1}
          stopColor={
            Variables.dark_base_color_2
              ? Variables.dark_base_color_2
              : "#FFC400"
          }
        />
      </linearGradient>
    </defs>
  </svg>
)

export default HomebgSVG
