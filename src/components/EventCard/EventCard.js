import React, { Fragment, useState, useEffect } from "react"
import Link from "gatsby"
import _ from "lodash"
import {
  eventCard,
  event_logo,
  event_title,
  event_timer,
  logoHeader,
  contentCard,
  card_now_text,
  card_event_title,
  card_end_time,
  contentSwipe,
} from "./EventCardEmotion"

import { px_bg } from "../jss/cvcss"
import CountDown from "./CountDown"
import event_logo_img from "../../images/aws_logo.svg"
import { timeFormat } from "../../helpers/TimeStamp"

const EventCard = () => {
  const [eventStarted, setEventStarted] = useState(null)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [nextEvent, setNextEvent] = useState(null)
  const [eventTime, setEventTime] = useState(null)
  const [slots, setSlots] = useState([])

  useEffect(() => {
    setSlots(JSON.parse(localStorage.getItem("slots")))
  }, [])

  function setTimingFunction() {
    setInterval(() => {
      if(slots.length){
        setEventTime(slots[0].timeStart)
        if((_.now()) > slots[0].timeStart && (_.now()) < slots[slots.length-1].timeEnd ){
          setEventStarted("started")
        }
        else if((_.now()) > slots[slots.length-1].timeEnd){
          setEventStarted("ended")
        }
        else{
          setEventStarted("notStarted")
        }
      }
      slots.map((slot, i)=>{
        if(slot.timeStart <= (_.now() ) && slot.timeEnd >= (_.now() )){
          setCurrentEvent(slot);
          setNextEvent(slots[i + 1]);
        }
      })
    }, 1000)
  }

  setTimingFunction()
  console.log(nextEvent);
  return (
    <Fragment>
      {eventStarted === "started" ? (
        <div css={[eventCard, px_bg]} className="inv">
          <div css={logoHeader}>
            <div css={event_logo}>
              <img src={event_logo_img} alt="event_logo" />
            </div>
            <div css={event_title}>
              <p>
                AWS Community Day <br />
                <small>Bengaluru - 2019</small>
              </p>
            </div>
          </div>
            {currentEvent ? (
              <div css={contentSwipe} className={currentEvent.tracks.length > 1 ? "multiple" : "single"}>
                {currentEvent.tracks.map((track, index) => (
                    <div css={contentCard} key={index}>
                      <h4 css={card_now_text}>Now {currentEvent.tracks.length > 1 && `Track - ${index + 1}`}</h4>
                      <h2 css={card_event_title}>
                        {track.title}<br></br>
                        <small>from {timeFormat(currentEvent.timeStart)}</small>
                      </h2>
                      {currentEvent.eventType !== "talk" ? (<div className={`illust ${currentEvent.img}`}></div>) : null}
                      {track.speakers && track.speakers.length && (
                        <div className="speaker">
                            {track.speakers.map((speaker, idx)=>(
                              <React.Fragment key={idx}>
                                <p>{speaker.name}</p>
                                <p><a href={speaker.externalLink}>{speaker.designation}</a></p>
                              </React.Fragment>
                            ))}
                        </div>
                      )}
                      <h5 css={card_end_time}>Ends at {timeFormat(currentEvent.timeEnd)}</h5>
                    </div>
                )) }
              </div>)
            : null}
        </div>
      ) : null}
      {eventStarted === "notStarted" ? (<div css={[eventCard, px_bg]}>
          <div css={event_logo}>
            <img src={event_logo_img} alt="event_logo" />
          </div>
          <div css={event_title}>
            <p>
              AWS Community Day <br />
              <small>Bengaluru - 2019</small>
            </p>
          </div>
          <div css={event_timer}>
            <CountDown startingTime={eventTime} />
          </div>
        </div>) : null}
      {eventStarted === "ended" ? (
        <div css={[eventCard, px_bg]} className="inv">
          <div css={event_logo}>
            <img src={event_logo_img} alt="event_logo" />
          </div>
          <div css={event_title}>
            <p>
              AWS Community Day <br />
              <small>Bengaluru - 2019</small>
            </p>
          </div>
          <h1>Tada</h1>
        </div>) : null}
    </Fragment>
  )
}

export default EventCard
