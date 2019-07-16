import React, { Fragment, useState, useEffect } from "react"
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
contentSwipe
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
          <div css={contentSwipe}>
              <div css={contentCard}>
              <h4 css={card_now_text}>Now</h4>
              <h2 css={card_event_title}>Registration<br></br><small>from 08:00 AM</small></h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.</p>
              <h5 css={card_end_time}>Ends at 09:00 AM</h5>
            </div>
            <div css={contentCard}>
              <h4 css={card_now_text}>Now</h4>
              <h2 css={card_event_title}>Registration<br></br><small>from 08:00 AM</small></h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.</p>
              <h5 css={card_end_time}>Ends at 09:00 AM</h5>
            </div>
          </div>
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
