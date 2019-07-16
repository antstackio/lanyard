import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { css } from "@emotion/core"

import agenda from "../images/agenda.svg"

import EventCard from "../components/EventCard/EventCard"
import Layout from "../components/layout"
import SEO from "../components/seo"
import FlyMenu from "../components/FlyMenu/FlyMenu"
import Slot from "../components/Slot"
import Variables from "../components/jss/Variables"

const HomePage = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem("slots")))
  }, [])

  const selectEvent = selectedEvent => {
    const eventsChanged = events.map(event => {
      event.tracks.map(tevnt => {
        tevnt.selectedFlag = "notSelected"
        if (tevnt.id === selectedEvent.id) {
          tevnt.selectedFlag = "selected"
        }
        return tevnt
      })
      return event
    })
    localStorage.setItem("slots", JSON.stringify(eventsChanged))
    setEvents(eventsChanged)
  }

  return (
    <Layout>
      <SEO title="Home" />
      <EventCard />
      <div css={agenda_card}>
        <FlyMenu
          stayOnClick
          direction="bottom"
          className="agenda"
          trig_title={
            <span className="trig-ttl">
              <img src={agenda} alt="logo" title="Agenda" />
              <span>Agenda</span>
            </span>
          }
        >
          <Link css={agendaTitle} to="/">
            Agenda
          </Link>
          <ul css={agenda_list}>
            {events.map(event => {
              return (
                <Slot
                  key={event.timeStart}
                  eventData={event}
                  selectEvent={event => selectEvent(event)}
                />
              )
            })}
          </ul>
        </FlyMenu>
      </div>
    </Layout>
  )
}

export default HomePage

//Styling

const agenda_card = css`
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
          bottom: 5px;
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
