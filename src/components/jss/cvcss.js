import { css } from "@emotion/core"
import Variables from "./Variables"

export const media = {
  mn: `@media only screen and (max-width: 360px)`,
  above_mn: `@media only screen and (min-width: 360px)`,
  xs: `@media only screen and (max-width: 400px)`,
  above_xs: `@media only screen and (min-width: 400px)`,
  sm: `@media only screen and (max-width: 768px)`,
  above_sm: `@media only screen and (min-width: 768px)`,
  md: `@media only screen and (max-width: 992px)`,
  above_md: `@media only screen and (min-width: 992px)`,
  lg: `@media only screen and (max-width: 1200px)`,
  above_lg: `@media only screen and (min-width: 1200px)`,
  xl: `@media only screen and (max-width: 1650px)`,
  above_xl: `@media only screen and (min-width: 1650px)`,
  smallPhone: `@media (min-width: 361px) and (max-width: 400px)`,
  medPhone: `@media (min-width: 471px) and (max-width: 768px)`,
  tab: `@media (min-width: 767px) and (max-width: 992px)`,
  lap: `@media (min-width: 991px) and (max-width: 1200px)`,
  hi_res: `@media (min-width: 1199px) and (max-width: 1650px)`,
}

export const hexToRgb = hex => {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b
  })

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export const rgba = (hex, alpha) => {
  const color = hexToRgb(hex)
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
}

export const shadows = {
  theme_shadow: `0 4px 20px 0 ${rgba("#000", 0.14)}, 0 7px 10px -5px ${rgba(
    "#000",
    0.4
  )}`,

  blue_shadow: `0 4px 20px 0 ${rgba("#000", 0.14)},
          0 7px 10px -5px ${rgba(Variables.dark_base_color, 0.4)}`,

  red_shadow: `0 4px 20px 0 ${rgba("#000", 0.14)},
          0 7px 10px -5px ${rgba(Variables.wb_red, 0.4)}`,

  green_shadow: `0 4px 20px 0 ${rgba("#000", 0.14)},
          0 7px 10px -5px ${rgba(Variables.wb_green, 0.4)}`,
}

export const clearfix = css`
  &:before {
    content: "";
    display: table;
  }
  &:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
`

export const close_icon = css`
  font-size: 0 !important;
  position: absolute;
  height: 40px;
  width: 40px;
  right: 10px;
  top: 10px;
  font-size: 0px;
  cursor: pointer;
  z-index: 9;
  border: 0;
  background: transparent;
  &:before,
  &:after {
    content: "";
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    height: 2px;
    background: white;
    width: 50%;
    transition: all 0.25s;
    opacity: 0;
    width: 75%;
    height: 4px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    ${media.above_sm} {
      background: red;
    }
  }
  &:before {
    transform: rotate(45deg);
    opacity: 1;
  }
  &:after {
    transform: rotate(-45deg);
    opacity: 1;
  }
  &.solid {
    &:before,
    &:after {
      background: ${Variables.dark_base_color};
    }
  }
`

export const button = css`
  border: 0;
  line-height: 45px;
  height: 45px;
  padding: 0 15px;
  color: #fff;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  display: inline-block;
  background: ${Variables.dark_base_color};
  transition: all 0.25s ease;
  border-radius: 30px;
  box-shadow: ${shadows.blue_shadow};
  width: 100%;
  &:hover {
    transform: translateY(-2px);
  }
  &:active {
    ${shadows.theme_shadow}
    transform: translate(0);
    transition: none;
  }
  i,
  span {
    &:not(.material-icons) {
      display: block;
    }
  }
  &.small {
    line-height: normal;
    height: auto;
    padding: 5px;
    font-size: 12px;
    border-radius: 3px;
    font-weight: normal;
  }
  &.large {
    line-height: 45px;
    height: 45px;
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 0 25px;
  }
  &.plain {
    background: #fff;
    color: ${Variables.dark_base_color};
    border: solid 1px ${Variables.dark_base_color};
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
    &.white {
      color: #fff;
      background: transparent;
      border: solid 1px #fff;
    }
  }
  &.white {
    background: #fff;
    color: ${Variables.dark_base_color};
    border: solid 1px #fff;
  }
  &[disabled] {
    pointer-events: none;
    background: #eee !important;
    box-shadow: none;
    color: ${Variables.muted_color} !important;
    cursor: default;
  }
  &.icon-grp {
    display: flex;
    align-items: center;
    margin: auto;
    span,
    svg,
    i {
      font-size: 16px;
      margin-right: 10px;
    }
    &.right {
      span,
      svg,
      i {
        margin-left: 10px;
        margin-right: 0;
      }
    }
  }
  ${media.mn} {
    height: 40px;
    line-height: 40px;
  }
`

export const px_bg = css`
  color: ${Variables.dark_base_color};
  position: relative;
  overflow: hidden;
  > * {
    position: relative;
    z-index: 999;
  }
  .swirlbg {
    transition: all 0.25s;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    pointer-events: none;
  }
  &.inv {
    .swirlbg {
      transform: rotateX(180deg) rotateY(180deg) translateY(-62px);
    }
  }
  &.blurry {
    justify-content: flex-start;
    padding: 25px;
    ${media.mn} {
      padding: 15px;
    }
    .swirlbg {
      opacity: 0.5;
    }
  }
`

export const solid = css`
  color: ${Variables.dark_base_color};
`

export const trig_pop = css`
  cursor: pointer;
`

export const text_center = css`
  text-align: center;
`

export const circles = css`
  margin-left: 15px;
  li {
    list-style-type: circle;
    line-height: 1.5;
    margin-bottom: 7px;
  }
`

export const visible_xs = css`
  ${media.above_lg} {
    display: none !important;
  }

  ${media.sm} {
    display: block !important;
  }
`

export const hidden_xs = css`
  ${media.sm} {
    display: none !important;
  }
`

export const hide = css`
  display: none !important;
`

export const wb_alert = css`
  margin: 5px 0 0;
  font-size: 12px;
  padding: 5px 15px;
  line-height: 1.5;
  color: ${Variables.wb_orange};
  background: lighten(${Variables.wb_orange}, 30%);
  border: solid 1px lighten(${Variables.wb_orange}, 25%);
  display: block;
  width: 100%;
  border-radius: 7px;
  &.wb-success {
    color: ${Variables.wb_green};
    background: lighten(${Variables.wb_green}, 40%);
    border: solid 1px lighten(${Variables.wb_green}, 25%);
  }
  &.wb-error {
    color: ${Variables.wb_red};
    background: lighten(${Variables.wb_red}, 40%);
    border: solid 1px lighten(${Variables.wb_red}, 30%);
  }
  &.wb-info {
    color: ${Variables.wb_blue};
    background: lighten(${Variables.wb_blue}, 40%);
    border: solid 1px lighten(${Variables.wb_blue}, 25%);
  }
  &.wb-warning {
    color: ${Variables.wb_orange};
    background: lighten(${Variables.wb_orange}, 30%);
    border: solid 1px lighten(${Variables.wb_orange}, 25%);
  }
  &.lg {
    font-size: 18px;
  }
  &.md {
    font-size: 16px;
  }
  &.sm {
    font-size: 14px;
  }
  &.alert-tran {
    border: 0;
    background: transparent;
    padding: 0;
  }
  &.no-mar {
    margin: 0;
  }
  &.input-alert {
    max-width: 80%;
    margin: 10px auto 0;
    border-radius: 5px;
    position: absolute;
    z-index: 9;
    left: 0;
    right: 0;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: -5px;
      height: 7px;
      width: 7px;
      background: inherit;
      border-style: solid;
      border-color: inherit;
      border-width: 1px 1px 0 0;
      margin: auto;
      transform: rotate(-45deg);
    }
  }
`

export const no_select = css`
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
`

export const disabled = css`
  background: ${Variables.page_bg_color};
  pointer-events: none;
  color: ${Variables.muted_color};
  opacity: 0.5;
`

export const tag = css`
  background: ${Variables.light_bg};
  display: inline-block;
  margin: 5px 10px;
  padding: 5px 10px;
  border-radius: 6px;
`
export const info_card = css`
  .right {
    text-align: right;
  }
  &.top {
    position: relative;
    z-index: 9999;
  }
`

export const timestamp = css`
  .dateFormat-wrap {
    margin-bottom: 5px;
    display: block;
    .dateFormat {
      display: block;
      span {
        margin-right: 3px;
        &.day {
          &:after {
            content: ",";
          }
        }
      }
    }
  }
  .time {
    white-space: nowrap;
  }
`

export const stikcy_container = css`
  display: flex;
  flex-direction: column;
  &.affix {
    .stikcy_child {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      max-width: 1200px;
      margin: auto;
    }
  }
  &.top {
    flex-direction: column-reverse;
    .stikcy_child {
      bottom: auto;
      top: 0;
    }
  }
`

export const main_text = css`
  font-weight: bold;
  font-size: 50px;
  margin-top: ${Variables.gutter_width};
`

export const white = css`
  color: #fff;
`
export const form_row = css`
  margin-bottom: 20px;
  &.flexo {
    display: flex;
  }
  > .key {
    display: block;
    margin-bottom: 7px;
    color: ${Variables.muted_color};
  }
`
export const checkbox = css`
  text-align: left;
  label {
    cursor: pointer;
    input {
      position: absolute;
      left: 0;
      right: 0;
      pointer-events: none;
      visibility: hidden;
      display: none;
      & + span {
        display: flex;
        align-items: center;
        position: relative;
        font-size: 13px;
        .check {
          position: relative;
          content: "";
          min-width: 20px;
          height: 20px;
          margin-right: 15px;
          background: ${Variables.light_bg};
          border: ${Variables.border_color} solid 1px;
          &:before {
            content: "";
            position: absolute;
            bottom: 0;
            right: 0;
            top: 0;
            width: 100%;
            background: ${Variables.light_bg};
            z-index: 2;
            transition: all 0.25s;
          }
          &:after {
            content: "";
            left: 2px;
            top: -3px;
            right: 0;
            bottom: 0;
            background: transparent;
            z-index: 1;
            height: 4px;
            width: 10px;
            border: solid 2px ${Variables.dark_base_color};
            position: absolute;
            border-top: 0;
            border-right: 0;
            transform: rotate(-45deg);
            margin: auto;
          }
        }
      }
      &:checked + span {
        small {
          border-color: ${Variables.dark_base_color};
          &:before {
            width: 0;
          }
        }
      }
    }
  }
`
