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
  const [started, setStarted] = useState(null)
  const [eventName, setEventName] = useState(null)
  const [eventTime, setEventTime] = useState(null)
  const [slots, setSlots] = useState([])

  useEffect(() => {
    setSlots(JSON.parse(localStorage.getItem("slots")))
  }, [])

  function setTimingFunction() {
    setInterval(() => {
      if(slots.length){
        if((_.now()+ 19800000) > slots[0].timeStart ){
          setStarted(true)
          setEventTime(slots[0].timeStart)
        }
        else{
          setStarted(false)
          setEventTime(slots[0].timeStart)
        }
      }
      slots.map((slot)=>{
        if(slot.timeStart <= (_.now() + 19800000) && slot.timeEnd >= (_.now() + 19800000)){
          setEventName(slot);
        }
      })
    }, 1000)
    console.log(slots);
  }

  setTimingFunction()

  return (
    <Fragment>
      {started ? (
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
            {eventName ? (
              <div css={contentSwipe} className={eventName.tracks.length > 1 ? "multiple" : "single"}>
                {eventName.tracks.map((track, index) => (
                    <div css={contentCard} key={index}>
                      <h4 css={card_now_text}>Now {eventName.tracks.length > 1 && `Track - ${index + 1}`}</h4>
                      <h2 css={card_event_title}>
                        {track.title}<br></br>
                        <small>from {timeFormat(eventName.timeStart)}</small>
                      </h2>
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
                      <h5 css={card_end_time}>Ends at {timeFormat(eventName.timeEnd)}</h5>
                    </div>
                )) }
              </div>)
            : null}
        </div>
      ) : (
        <div css={[eventCard, px_bg]}>
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
        </div>
      )}
    </Fragment>
  )
}

export default EventCard
