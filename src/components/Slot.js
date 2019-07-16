import React from "react"
import { css } from "@emotion/core"

import Variables from "./jss/Variables"
import { button } from "./jss/cvcss"
import { timeFormat } from "../helpers/TimeStamp"

const Slot = ({ eventData, selectEvent }) => {
  const slot_id = eventData.slotId
  return (
    <li css={[slot_dot, eventData.tracks.length > 1 ? slot_track_flex : null]}>
      {eventData.tracks.map((track, index) => (
        <div
          key={index}
          css={[
            slot_item,
            track.selectedFlag === "selected" ? slotSelected : null,
          ]}
          className={track.selectedFlag}
        >
          {eventData.tracks.length > 1 ? (
            <div css={slot_track}> Track - {index + 1}</div>
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
          {/* {track.selectedFlag !== "default" ? ( */}
          <div css={slot_action}>
            {eventData.eventType == "talk" && (
              <button css={button} onClick={() => selectEvent(track, slot_id)}>
                Add to Schedule
              </button>
            )}
          </div>
          {/* ) : null} */}
        </div>
      ))}
    </li>
  )
}

export default Slot

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
  max-width: calc(100% + 60px);
  margin-left: -45px;
  padding-left: 45px;
  width: calc(100% + 60px) !important;
  padding-bottom: 25px;
  margin-bottom: 5px;
  > div {
    order: 2;
    min-width: 75%;
    margin-right: 30px;
    padding-bottom: 25px;
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
  position: absolute;
  left: 0;
  right: 0;
  bottom: -20px;
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
