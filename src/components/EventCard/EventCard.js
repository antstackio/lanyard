import React, { Fragment, useState, useEffect } from "react"
import _ from "lodash"
import {
  eventCard,
  event_logo,
  event_title,
  event_timer,
} from "./EventCardEmotion"
import { px_bg } from "../jss/cvcss"
import CountDown from "./CountDown"
import event_logo_img from "../../images/aws_logo.svg"


const EventCard = () => {
  const [started, setStarted] = useState(true)
  const [time, setTime] = useState(10);
  const [eventName, setEventName] = useState(null);

  const [events, setEvents] = useState([])

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem("events")))
  }, [])

  function myFunction() {
    setTimeout(function(){
      if(_.filter(events, {'timeStart': _.now()}).length){
        setEventName(_.filter(events, {'timeStart': _.now()}));
      }
      console.log();

      setTime(time+1);
    }, 1000);
  }
  myFunction();
  return (
    <Fragment>
      {started ? (
        <div css={[eventCard, px_bg]}>
          {eventName && eventName[0] && (<span>{eventName[0].id}</span>)}
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
            <CountDown startingTime={1564214400000} />
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default EventCard
