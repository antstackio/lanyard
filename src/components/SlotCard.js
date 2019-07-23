import React, {useEffect, Fragment} from "react"
import { css } from "@emotion/core"
import _ from "lodash";

import RatingStars from "./RatingStars"

import check_in from "../images/check_in.svg"
import tea_break from "../images/tea_break.svg"
import lunch_break from "../images/lunch_break.svg"
import networking from "../images/networking.svg"
import def from "../images/default.svg"
import welcome from "../images/welcome.svg"
import end from "../images/end.svg"

import Variables from "./jss/Variables"
import { button, media } from "./jss/cvcss"
import { timeFormat } from "../helpers/TimeStamp"

const SlotCard = ({ eventData, selectTrack }) => {
  const slot_id = eventData.slotId
  const scrollDiv = React.createRef();

  function handleClick(track, slot_id) {
    selectTrack(track, slot_id)
    scrollDiv.current.scrollLeft = 0;
  };

  function slotClassName(slot) {
    if(slot.tracks){
      return slot.tracks.map((slt, i)=>{
        if(slt.selectedFlag === "selected"){
          return `selected-${i+1}`
        }
      })
    }
  }

  return (
    <li css={[slot_dot, slot_item]}>
       <div css={slot_time}>
            <small>
              {timeFormat(eventData.timeStart)} -{" "}
              {timeFormat(eventData.timeEnd)}
            </small>
          </div>
      <div ref={scrollDiv} css={eventData.tracks.length > 1 ? slot_track_flex : slot_wrap} track-select={slotClassName(eventData) ? slotClassName(eventData) : " "}>
      {eventData.tracks.map((track, index) => (
        <div
          key={index}
          css={[
            track.selectedFlag === "selected" ? slotSelected : null,
          ]}
          className={track.selectedFlag}
        >
          {eventData.tracks.length > 1 ? (
            <div css={slot_track}> Track - {index + 1}</div>
          ) : null}

          {eventData.img ? (
            <div css={slot_illust} className={`${eventData.img}`}></div>
          ) : null}

              <div css={slot_title}>{track.title}</div>
          <div css={slot_speakers}>
            {track.speakers &&
              track.speakers.map((speaker, idx) => (
                <small key={idx}>{speaker.firstName} {speaker.lastName}</small>
              ))}
          </div>
          { eventData.eventType !== "break" && eventData.timeEnd <= _.now() ? (
            <Fragment>
              <br/>
              <RatingStars/>
            </Fragment>
          ):null}
          <div css={slot_action}>
            {eventData.eventType == "talk" && (
              <button css={button} onClick={() => handleClick(track, slot_id)}>
                {track.selectedFlag === "notSelected" ? "Add to Schedule" : "Remove from Schedule"}
              </button>
            )}
          </div>
        </div>
      ))}
      </div>
    </li>
  )
}

export default SlotCard

//Styling

const slot_item = css`
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    left: -15px;
    height: 0;
    width: 0;
    top: 15px;
    margin: auto;
    border: solid 8px transparent;
    border-right-color: #fff;
  }
`
const slot_dot = css`
  margin-bottom: 10px;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    left: -15px;
    height: 0;
    width: 0;
    top: 15px;
    margin: auto;
    border: solid 8px transparent;
    border-right-color: #fff;
  }
  &:after {
    content: "";
    position: absolute;
    left: -32px;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    top: 15px;
    margin: auto;
    background: ${Variables.dark_base_color};
  }
`
const slot_wrap = css`
  padding-right : 50px;
`


const slot_track_flex = css`
  display: flex;
  overflow-x: auto;
     margin-right: -9px;
    max-width: calc(100% + 9px);
    overflow-y: visible;
    width: calc(100% + 9px);
    &:after {
    content: '';
    min-width: 1px;
    order: 3;
  }
  > div {
    padding: 10px;
    min-width: 75%;
    margin-right: 15px;
    margin-top: 15px;
    position: relative;
    border: solid 1px ${Variables.border_color};
    background: #fff;
    padding-bottom: 70px;
    transition: all .5s;
    &:before {
      content: none;
    }
    &.selected {
      position: relative;
      > div{
        & ~ div {
          border-top: solid 1px rgba(255,255,255,.25);
          margin-top: 10px;
          padding-top: 10px;
        }
      }
      &:before {
        content: "";
      }
    }
  }

  &[track-select*="selected-2"]{
    > div:nth-of-type(1){
      transform: translateX(calc(100% + 15px) );
    }
    > div:nth-of-type(2){
      transform: translateX(calc(-100% - 15px) );
    }
  }

  &[track-select*="selected-3"]{
    > div:nth-of-type(1), > div:nth-of-type(2){
      transform: translateX(calc(100% + 15px) );
    }
    > div:nth-of-type(3){
      transform: translateX(calc(-100% * 2 - 15px * 2) );
    }
  }

  &[track-select*="selected-4"]{
    >div{
      &:nth-of-type(1), &:nth-of-type(2) &:nth-of-type(3){
        transform: translateX(calc(100% + 15px) );
      }
      &:nth-of-type(4){
        transform: translateX(calc(-100% * 3 - 15px * 3) );
      }
    }
  }



  &:before {
    left: 30px;
  }
  &:after {
    left: 13px;
  }
`

const slotSelected = css`
  background: ${Variables.dark_base_color} !important;
    border: solid 1px ${Variables.dark_base_color} !important;
  &:before {
    border-right-color: ${Variables.dark_base_color};
  }
  *{
    color: #fff !important;
  }
  button {
    background: #fff;
    color: ${Variables.wb_red} !important;
  }
`

const slot_time = css`
  color: ${Variables.dark_base_color};
  ${media.xs}{
    font-size: 12px;
  }
`

const slot_title = css`
  margin-top: 7px;
  color: ${Variables.muted_color};
  ${media.xs}{
    font-size: 14px;
  }
`
const slot_speakers = css`
  margin-top: 7px;
  color: ${Variables.text_primary_color};
  ${media.xs}{
    font-size: 12px;
  }
  small {
    display: flex;
    &:before {
      content: "--";
      white-space: nowrap;
      margin-right: 10px;
    }
  }
`
const slot_action = css`
  text-align: center;
     position: absolute;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border-top: none !important;
    button{
      width: 100%;
      background: transparent;
      border: solid 1px ${Variables.dark_base_color};
      color: ${Variables.dark_base_color};
      ${media.xs}{
        font-size: 12px;
      }
    }
`
const slot_track = css`
  ${media.xs}{
    font-size: 12px;
  }
`


const slot_illust = css`
    position: absolute;
    right: 0;
    bottom: 0;
    opacity: .5;
    overflow: hidden;
    &:before{
      content: '';
      display: block;
      height: 75px;
      width: 75px;
      ${media.xs}{
        height: 65px;
        width: 65px;
      }
      background-size: auto 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
    &.check-in:before{
      background-image: url(${check_in});
    }

    &.tea_break:before{
      background-image: url(${tea_break});
    }

    &.lunch_break:before{
      background-image: url(${lunch_break});
    }

    &.networking:before{
      background-image: url(${networking});
    }

    &.default:before{
      background-image: url(${def});
    }

    &.welcome:before{
      background-image: url(${welcome});
      transform: rotate(-20deg);
    }

    &.closing:before{
      background-image: url(${end});
    }
`