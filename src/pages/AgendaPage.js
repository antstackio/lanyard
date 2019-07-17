import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { css } from "@emotion/core"

import SEO from "../components/seo"
import SlotCard from "../components/SlotCard"
import Variables from "../components/jss/Variables"

import {close_icon} from '../components/jss/cvcss';

const AgendaPage = () => {
  const [slots, setSlots] = useState([])

  useEffect(() => {
    setSlots(JSON.parse(localStorage.getItem("slots")))
  }, [])

  //Filter out the sletected track and change the flag to "selected" and others to "notSelected"
  function UpdatedTracks(filteredSlot, selectedTrack) {
    return filteredSlot.tracks.map(track => {
      if (track.trackId === selectedTrack.trackId) {
        if (track.selectedFlag === "notSelected") {
          track["selectedFlag"] = "selected"
        } else {
          track["selectedFlag"] = "notSelected"
        }
      } else {
        track["selectedFlag"] = "notSelected"
      }
      return track
    })
  }

  //Update the localStorage
  function selectTrack(selectedTrack, slotId) {
    const filteredSlot = _.filter(slots, { slotId })[0]
    const UpdatedSlots = slots.map(slot => {
      if (slot === filteredSlot) {
        slot["tracks"] = UpdatedTracks(filteredSlot, selectedTrack)
      }
      return slot
    })
    localStorage.setItem("slots", JSON.stringify(UpdatedSlots))
    setSlots(UpdatedSlots)
  }

  return (
    <div css={agenda_card}>
      <SEO title="Agenda" />
      <span css={agendaTitle}>Agenda</span>
      <span onClick={() => navigate("/")} css={[close_icon, agendaClose]}>close</span>
      <ul css={agenda_list}>
        {slots.map(slot => {
          return (
            <SlotCard
              key={slot.timeStart}
              eventData={slot}
              selectTrack={(slot, slotId) => selectTrack(slot, slotId)}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default AgendaPage

//Styling

const agendaClose = css`
      position: fixed;
    right: 15px;
    bottom: 15px;
    top: auto;
    height: 50px;
    width: 50px;
    &:before,&:after{
      background: ${Variables.dark_base_color};
    }
`

const agenda_card = css`
  animation : scrollUp .35s ease-out;
  @keyframes scrollUp{
    from{
      margin-top: 100vh;
    }
    to{
      margin-top: 0;
    }
  }
  .agenda {
    position: fixed;
    z-index: 999;
    bottom: 0;
    right: 15px;
    height: 15vh;
    display: flex;
    align-items: center;
    .trig-ttl {
      text-align: center;
      text-transform: uppercase;
      color: #fff;
      img {
        margin-bottom: 5px;
        height: 30px;
      }
    }
    > span {
      height: 50px;
      width: 75px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        margin: 0;
        width: 100%;
      }
    }
    .fly_content {
      background: ${Variables.black_bg};
      padding-bottom: ${Variables.gutter_width_more};
      position: static;
      .header {
        background: ${Variables.light_bg};
        order: 1;
        position: fixed !important;
        right: 0;
        bottom: 0;
        height: ${Variables.gutter_width_more};
        top: auto !important;
        .solid {
          top: auto;
          bottom: 25px;
          right: 10px;
        }
      }
    }
  }
`
const agendaTitle = css`
  color: ${Variables.dark_base_color};
  text-decoration: none;
  display: block;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  padding: ${Variables.gutter_width};
`
const agenda_list = css`
  padding-right: ${Variables.gutter_width_xs};
  padding-left: 35px;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    border-left: dashed ${Variables.dark_base_color} 1px;
    left: 10px;
  }
`
