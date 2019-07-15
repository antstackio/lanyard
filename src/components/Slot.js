import React from "react"
import { css } from "@emotion/core"
import Variables from "./jss/Variables"
import { button } from "./jss/cvcss"
import { timeFormat } from "../helpers/TimeStamp"

const slot_item = css`
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  position: relative;
  margin-bottom: 30px;
  &.default {
    margin-bottom: 10px;
  }
  &:before {
    content: "";
    position: absolute;
    left: -14px;
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

const slotSelected = css`
  background: ${Variables.dark_base_color};
  &:before {
    border-right-color: ${Variables.dark_base_color};
  }
  * {
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
  margin-top: 10px;
  margin-bottom: -30px;
`
const slot_track = css`
  color: ${Variables.dark_base_color} !important;
  position: absolute;
  top: 0;
  left: -20px;
  bottom: 0;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  transform: rotate(-180deg);
  writing-mode: vertical-lr;
`

const Slot = ({ eventData, selectEvent }) => {
  return (
    <li
      css={[
        slot_item,
        eventData.selectedFlag === "selected" ? slotSelected : null,
      ]}
      className={eventData.selectedFlag}
    >
      {eventData.tracks.length < 4 ? (
        <div css={slot_track}> Track - {eventData.tracks[0]}</div>
      ) : null}

      <div css={slot_time}>
        {console.log(eventData)}
        <small>
          {timeFormat(eventData.time.start)} - {timeFormat(eventData.time.end)}
        </small>
      </div>
      <div css={slot_title}>{eventData.title}</div>
      <div css={slot_speakers}>
        {eventData.speakers &&
          eventData.speakers.map(speaker => <small>{speaker.name}</small>)}
      </div>
      {eventData.selectedFlag !== "default" ? (
        <div css={slot_action}>
          {eventData.eventType == "talk" && (
            <button css={button} onClick={() => selectEvent(eventData)}>
              Add to Schedule
            </button>
          )}
        </div>
      ) : null}
    </li>
  )
}

export default Slot
