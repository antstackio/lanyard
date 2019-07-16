import { css } from "@emotion/core";
import { shadows, media} from "../jss/cvcss";
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


export const logoHeader = css`
  display: flex;

    justify-content: center;
  align-items: center;
  p{
    font-size: 16px;
    color: ${Variables.text_primary_color};
  }
  div{
    margin: 0;
  }
  img{
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
box-shadow: ${shadows.theme_shadow};

`

export const card_now_text = css`
  font-weight: 200;
  font-size: 25px;
  color: ${Variables.muted_color};
  text-transform: uppdercase;
  `

  export const card_event_title = css`
  margin: 15px auto 25px;
  font-weight: 600;
  font-size: 25px;
  color: ${Variables.dark_base_color};
  text-transform: uppdercase;
  small{
    font-weight: normal;
    font-size: 14px;
  }
  `

  export const card_end_time = css`
  margin-top:50px;
  ${media.xs}{
    margin-top:25px;
  }
  font-weight: normal;
  font-size: 14px;
  color: ${Variables.dark_base_color};
`
export const contentSwipe = css`{
  display: flex;
  max-width: calc(100% + 50px );
  overflow: auto;
  width: calc(100% + 50px );
  margin-left: -25px;
  padding: 15px 0 30px;
  >div{
    margin-left: 20px;
    min-width: 60%;
    ${media.xs}{
      min-width: 80%;
      margin-top:25px;
  }

  }
}`
