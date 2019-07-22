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
    ${media.mn}{
      width: 45px !important;
    }
  }
`

export const contentCard = css`
  min-height: calc(100% - 30px);
  background: #fff;
  margin-top: 25px;
  padding: 1px 15px 15px;
  color: ${Variables.text_primary_color};
  box-shadow: ${shadows.blue_shadow};
  border-radius: 0 25px 25px 0;
  animation: scalease .25s ease-in-out;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .break &{
    border-radius: 25px;
  }
  a{
    text-decoration: none;
        color: #666;
    font-size: 12px;
    line-height: 0;
  }
  .illust{
    .break &{
      flex-grow: 1;
    }
    margin: 0 0 25px;
    height: 200px;
    ${media.xs}{
      height: 100px;
      .break &{
        height: 150px;
        ${media.mn}{
          height: 100px;
        }
      }
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
   &.selected{
     order: 1 !important;
    background: ${Variables.black_bg};
    .card_now_text, h5{
      color: #fff;
    }
    .card_profile {
      background: ${Variables.black_bg};
      border-color: #fff;
    }
    .card_event_title{
      background: #fff;
      color: ${Variables.black_bg};
    }
     > h2{
       background: #fff;
     }
  }
`

export const card_now_text = css`
  font-size: 14px;
  color: ${Variables.muted_color};
  display: flex;
  align-items: center;
  justify-content:space-between;
  padding: 10px 0;
`

export const card_event_title = css`
  margin: 10px auto 15px;
  font-size: 18px;
  padding: 15px;
  ${media.xs}{
  padding: 10px;
    font-size: 16px;
  }
  ${media.mn}{
  padding: 7px;
    font-size: 14px;
  }
  background: #FF9900;
  color: #fff;
  position: relative;
  margin: 0 -15px 10px;
  .break &{
    color: #FF9900;
    background: #fff;
    margin: 10px 0 25px;
    small{
      color: rgba(255, 153, 0, .5);
      right: 0;
      left: 0;
      text-align: center;
    }
    p{
      height: auto;
      text-align: center;
      font-size: 25px;
      font-weight: 700;
      line-height: 2rem;
    }
  }
  >p{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 1.5em;
    max-height: 3em;
    transition: all .25s;
  min-height: 55px;
    position: relative;

  }
  &.open{
    >p{
      max-height: 15em;
      display: block;
      &:before{
        top: 7px;
        transform: rotate(135deg);
      }
    }
  }
  small {
    display: block;
    text-align: right;
    font-weight: bold;
    font-size: 35px;
    ${media.xs}{
      font-size: 25px;
    }
    color: rgba(255,255,255,.5);
    position: absolute;
    right: 6px;
    bottom: 0;
  }
`

export const card_end_time = css`
  margin: 10px 0 0;
  text-align: center;
  font-weight: normal;
  font-size: 14px;
  color: ${Variables.muted_color};
`
export const card_last_Row =css`
  display: flex;
  align-items: center;
  justify-content:center;
  .break &{
      justify-content: center;
    }
  > *{
    margin: 0 !important;
  }
`

export const contentSwipe = css`
  flex-grow: 1;
  &.multiple{
  margin-left: -15px;
  padding: 15px 0 30px;
  display: flex;
  overflow: auto;
      max-width: calc(100% + 30px);
    width: calc(100% + 30px);
  &:after {
    content: '';
    min-width: 25px;
    order: 3;
  }
  > div {
    margin-left: 20px;
    min-width: 60%;
    order: 2;
    position: relative;
    ${media.xs} {
      min-width: 80%;
      margin-top: 10px;
    }
  }
}

`

export const car_speakers = css `
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  span{
    margin-top: 7px;
    line-height: 1.5;
    display: inline-block;
    text-align: center;
    ${media.above_xs}{
      font-size: 20px;
    }
  }
`

export const card_profile = css `
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
  padding:5px;
  width: 50%;
  .profimg{
    height: 75px;
    width: 75px;
    border: dashed 1px ${Variables.dark_base_color};
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    margin-bottom: 7px;
    ${media.above_xs}{
      height: 100px;
      width: 100px;
    }
    img{
      border-radius: 50%;
    }
  }
`
export const rating = css`
  img{
    height: 25px;
    display: inline-block;
    ~ img{
      margin-left: 5px;
    }
  }
`


export  const feedBack = css `
  text-align:center;
  img{
    display: inline-block;
    height: 25px;
    ~ img{
      margin-left: 7px;
    }
  }
`