import { css } from "@emotion/core"

import { shadows, media } from "../jss/cvcss"
import Variables from "../jss/Variables"

import check_in from "../../images/check_in.svg"
import tea_break from "../../images/tea_break.svg"
import lunch_break from "../../images/lunch_break.svg"
import networking from "../../images/networking.svg"
import def from "../../images/default.svg"
import welcome from "../../images/welcome.svg"
import end from "../../images/end.svg"

export const eventCard = css`
  height: calc(85vh - 50px);
  background: #fff;
  box-shadow: ${shadows.theme_shadow};
  border-radius: 0 0 50px 50px;
  padding: ${Variables.gutter_width};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: auto !important;
  &:not(.inv) {
    padding-top: 100px;
  }
  &.inv {
    justify-content: flex-start;
  }
  .speaker{
    p ~ p{
      line-height: 1;
    }
    ~ .speaker{
      margin-top: 10px;
    }
  }
`
export const event_logo = css`
  img {
    height: 100px;
    width: auto;
  }
`
export const event_title = css`
  font-size: 25px;
  margin: 25px 0;
  line-height: 1.25;
`
export const event_timer = css`
  margin-bottom: 25px;
  *{
    transform-origin: left bottom;
    animation: scalease .25s ease-in-out;
  }
  @keyframes scalease{
    from{
      transform: scale(0)
    }
    to{
      transform: scale(1)
    }
  }
`
export const c_timer = css`
  display: flex;
`
export const c_days = css`
  display: block;
  text-align: center;
  & ~ div {
    margin-left: 25px;
  }
  small {
    margin-top: 5px;
    display: block;
  }
  span {
    display: block;
    width: 100%;
    font-size: 10vw;
    font-weight: bold;
  }
`

export const logoHeader = css`
  display: flex;

  justify-content: center;
  align-items: center;
  p {
    font-size: 16px;
    color: ${Variables.text_primary_color};
  }
  div {
    margin: 0;
  }
  img {
    width: 60px !important;
    height: auto !important;
    margin-right: 15px;
  }
`

export const contentCard = css`
  background: #fff;
  margin-top: 25px;
  padding: 15px;
  color: ${Variables.text_primary_color};
  border-left: 5px solid ${Variables.dark_base_color};
  box-shadow: ${shadows.blue_shadow};
  a{
    text-decoration: none;
        color: #666;
    font-size: 12px;
    line-height: 0;
  }
  .illust{
    margin: -15px 0 15px;
    height: 200px;
    ${media.xs}{
      height: 100px;
    }
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center;
    &.check-in{
      background-image: url(${check_in});
    }

    &.tea_break{
      background-image: url(${tea_break});
    }

    &.lunch_break{
      background-image: url(${lunch_break});
    }

    &.networking{
      background-image: url(${networking});
    }

    &.default{
      background-image: url(${def});
    }

    &.welcome{
      background-image: url(${welcome});
    }

    &.closing{
      background-image: url(${end});
    }
  }
`

export const card_now_text = css`
  font-size: 14px;
  color: ${Variables.muted_color};
  text-transform: uppercase;
`

export const card_event_title = css`
  margin: 10px auto 15px;
  font-size: 14px;
  line-height: 1.3;
  color: ${Variables.dark_base_color};
  small {
    display: block;
    margin-top: 7px;
    font-weight: normal;
    font-size: 12px;
  color: ${Variables.muted_color};
  }
`

export const card_end_time = css`
  margin-top: 50px;
  ${media.xs} {
    margin-top: 25px;
  }
  font-weight: normal;
  font-size: 14px;
  color: ${Variables.muted_color};
`
export const card_last_Row =css`
  display: flex;
  align-items: center;
  justify-content:space-between;
  margin-top: 50px;
  ${media.xs}{
    margin-top: 25px;
  }
  > *{
    margin: 0 !important;
  }
`

export const contentSwipe = css`
   {
     &.multiple{
      margin-left: -25px;
      padding: 15px 0 30px;
      display: flex;
      overflow: auto;
      max-width: calc(100% + 50px);
      width: calc(100% + 50px);
      > div {
        margin-left: 20px;
        min-width: 60%;
        ${media.xs} {
          min-width: 80%;
          margin-top: 25px;
        }
      }
    }
  }
`

export const car_speakers = css `
  display: flex;
  align-items: center;
`

export const profile_img = css `
    width: 50px;
    background: #fff;
    margin-right: 10px;
    border-radius: 50%;
    padding: 5px;
    border: dashed 1px ${Variables.dark_base_color};
    img{
      border-radius: 50%;
    }
`
