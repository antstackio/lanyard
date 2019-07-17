import React from "react"
import { css } from "@emotion/core"

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
  return (
     <li css={[slot_dot, slot_item]}>
      <div css={eventData.tracks.length > 1 ? slot_track_flex : null}>
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
          <div css={slot_time}>
            <small>
              {timeFormat(eventData.timeStart)} -{" "}
              {timeFormat(eventData.timeEnd)}
              <div css={slot_title}>{track.title}</div>
            </small>
          </div>
          <div css={slot_speakers}>
            {track.speakers &&
              track.speakers.map((speaker, idx) => (
                <small key={idx}>{speaker.name}</small>
              ))}
          </div>
          <div css={slot_action}>
            {eventData.eventType == "talk" && (
              <button css={button} onClick={() => selectTrack(track, slot_id)}>
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

const slot_track_flex = css`
    display: flex;
    overflow-x: auto;
    overflow-y: visible;
  > div {
    padding: 10px;
    order: 2;
    min-width: 75%;
    margin-right: 15px;
    position: relative;
    border: solid 1px ${Variables.dark_base_color};
        padding-bottom: 70px;
    &:before {
      content: none;
    }
    &.selected {
      order: 1;
      position: relative;
      &:before {
        content: "";
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
  background: ${Variables.dark_base_color};
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
  color: ${Variables.muted_color};
`

const slot_title = css`
  margin-top: 7px;
`
const slot_speakers = css`
  margin-top: 7px;
  small {
    color: ${Variables.dark_base_color};
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
    button{
      width: 100%;
    }
`
const slot_track = css`
  color: ${Variables.dark_base_color} !important;
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
        height: 50px;
        width: 50px;
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