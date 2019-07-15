import { css } from "@emotion/core";
import { shadows} from "../jss/cvcss";
import Variables from "../jss/Variables";

export const eventCard = css`
height: 85vh;
background: #fff;
  box-shadow: ${shadows.theme_shadow};
  border-radius: 0 0 50px 50px;
  padding:  ${Variables.gutter_width};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  &:not(.inv){
    padding-top: 100px;
  }
  &.inv{
    justify-content: flex-start;
  }
`
export const event_logo = css`
    img{
        height: 100px;
        width: auto;
    }
`
export const event_title = css `
        font-size: 25px;
    margin: 25px 0;
    line-height: 1.25;

`
export const event_timer = css `
    margin-bottom: 25px;
`
export const c_timer = css`
    display: flex;
`
export const c_days = css`
    display: block;
    text-align: center;
    & ~ div{
      margin-left: 25px;
    }
    small{
      margin-top: 5px;
      display: block;
    }
    span{
      display: block;
      width: 100%;
      font-size: 10vw;
      font-weight: bold;
    }
`
