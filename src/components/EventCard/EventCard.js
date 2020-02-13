import React, { Fragment, useState, useEffect } from "react"
import config from "../../data/BaseConfig.json"
import HomebgSVG from "../ImageComponents/HomebgSVG"

import CheckinSVG from "../ImageComponents/CheckinSVG"
import TeabreakSVG from "../ImageComponents/TeabreakSVG"
import LunchSVG from "../ImageComponents/LunchSVG"
import NetworkingSVG from "../ImageComponents/NetworkingSVG"
import DefaultSVG from "../ImageComponents/DefaultSVG"
import WelcomeSVG from "../ImageComponents/WelcomeSVG"
import EndSVG from "../ImageComponents/EndSVG"

//import defDP from "../../images/vols/default.jpg"

import RatingStars from "../RatingStars"
import _ from "lodash"
import Loader from "../Loader"
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
  car_speakers,
  card_profile,
  end_info,
  next_list,
} from "./EventCardEmotion"

import { px_bg, form_row } from "../jss/cvcss"
import CountDown from "./CountDown"
import event_logo_img from "../../images/Alexa-Logo.png"
import { timeFormat } from "../../helpers/TimeStamp"

const EventCard = () => {
  const [eventStarted, setEventStarted] = useState(null)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [nextEvent, setNextEvent] = useState(null)
  const [eventTime, setEventTime] = useState(null)
  const [fullTitle, setFullTitle] = useState(false)
  const [slots, setSlots] = useState([])

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('../../images/speakers', false, /\.(png|jpg|svg)$/));


  useEffect(() => {
    setSlots(JSON.parse(localStorage.getItem("slots")))
  }, [])

  function setTimingFunction() {
    setInterval(() => {
      if (slots.length) {
        setEventTime(slots[0].timeStart)
        if (
          _.now() > slots[0].timeStart &&
          _.now() < slots[slots.length - 1].timeEnd
        ) {
          setEventStarted("started")
        } else if (_.now() > slots[slots.length - 1].timeEnd) {
          setEventStarted("ended")
        } else {
          setEventStarted("notStarted")
        }
      }
      slots.map((slot, i) => {
        let tEnd;
        if (slots[i + 1]) {
          tEnd = slots[i + 1].timeStart
        }
        else {
          tEnd = slot.timeEnd
        }
        if (slot.timeStart <= _.now() && tEnd >= _.now()) {
          setCurrentEvent(slot)
          setNextEvent(slots[i + 1])
        }
      })
    }, 1000)
  }


  setTimingFunction()

  console.log(currentEvent)
  return (
    <div
      css={[eventCard, px_bg]}
      className={eventStarted !== "notStarted" ? "blurry" : " "}
    >
      <div className="swirlbg"><HomebgSVG /></div>
      {eventStarted === "started" ? (
        <Fragment>
          <div css={logoHeader}>
            <div css={event_logo}>
              <img src={event_logo_img} alt="event_logo" />
            </div>
            {config.eventName ?
              (
                <div css={event_title}>
                  <p>
                    {config.eventName} {config.eventSubName ? (
                      <Fragment><br />
                        <small>{config.eventSubName}</small></Fragment>) : null}
                  </p>
                </div>
              ) : null}
          </div>
          {currentEvent ? (
            <Fragment>
              <div
                css={contentSwipe}
                className={`${
                  currentEvent.eventType === "break" ? "break" : "def"
                  } ${currentEvent.tracks.length > 1 ? "multiple" : "single"}`}
              >
                {currentEvent.tracks.map((track, index) => (
                  <div
                    css={contentCard}
                    className={
                      track.selectedFlag === "selected"
                        ? track.selectedFlag
                        : " "
                    }
                    key={index}
                  >
                    <div>
                      {currentEvent.tracks.length > 1 ? (
                        <h4 css={card_now_text} className="card_now_text">
                          <span>{`Track - ${index + 1}`} {index === 0 ? "(Audi)" : "(M-401)"}</span>{" "}
                          {track.selectedFlag === "selected" ? (
                            <small>This is in your schedule</small>
                          ) : null}
                        </h4>
                      ) : null}
                      <h2
                        css={card_event_title}
                        className={`card_event_title ${
                          fullTitle ? "open" : "close"
                          }`}
                        onClick={() => setFullTitle(!fullTitle)}
                      >
                        <p>{track.title}</p>
                      </h2>
                    </div>
                    {currentEvent.eventType !== "talk" ? (
                      <div className={`illust  ${currentEvent.img}`}>
                        {currentEvent.img === 'check-in' && <CheckinSVG />}
                        {currentEvent.img === 'tea_break' && <TeabreakSVG />}
                        {currentEvent.img === 'lunch_break' && <LunchSVG />}
                        {currentEvent.img === 'networking' && <NetworkingSVG />}
                        {currentEvent.img === 'default' && <DefaultSVG />}
                        {currentEvent.img === 'welcome' && <WelcomeSVG />}
                        {currentEvent.img === 'closing' && <EndSVG />}
                      </div>
                    ) : null}
                    {track.speakers && track.speakers.length && (
                      <div
                        css={car_speakers}
                        className="car_speakers"
                        className="speaker"
                      >
                        {track.speakers.map((speaker, idx) => (
                          <div
                            css={card_profile}
                            className="card_profile"
                            key={idx}
                          >
                            <span className="profimg">
                              { /*<img src={defDP} alt="image"/>*/}
                              <img src={images[speaker.profilePicture]} alt={speaker.profilePicture} />
                            </span>{" "}
                            <span>{speaker.firstName}</span>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                ))}
              </div>
              <h5 css={card_end_time} className="card_end_time">
                From {timeFormat(currentEvent.timeStart)} to{" "}
                {timeFormat(currentEvent.timeEnd)}
              </h5>
              {nextEvent && nextEvent.tracks.length ? (
                <ul css={next_list}>
                  <li>Up Next : </li>
                  {nextEvent.tracks.map((ntrack, index) => (
                    <li key={index}>
                      <small>
                        {nextEvent.tracks.length > 1 ? (
                          <b>Track - {index + 1} : </b>
                        ) : null}
                        {ntrack.title}
                      </small>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Fragment>
          ) : null}
        </Fragment>
      ) : eventStarted === "notStarted" ? (
        <Fragment>
          <div css={event_logo}>
            <img src={event_logo_img} alt="event_logo" />
          </div>
          {config.eventName ?
            (
              <div css={event_title}>
                <p>
                  {config.eventName} {config.eventSubName ? (
                    <Fragment><br />
                      <small>{config.eventSubName}</small></Fragment>) : null}
                </p>
              </div>
            ) : null}
          <div css={event_timer}>
            <CountDown startingTime={eventTime} />
          </div>
        </Fragment>
      ) : eventStarted === "ended" ? (
        <Fragment>
          <div css={event_logo}>
            <img src={event_logo_img} alt="event_logo" />
          </div>
          {config.eventName ?
            (
              <div css={event_title}>
                <p>
                  {config.eventName} {config.eventSubName ? (
                    <Fragment><br />
                      <small>{config.eventSubName}</small></Fragment>) : null}
                </p>
              </div>
            ) : null}

          <div css={end_info}>
            <label>
              Event has ended. Help us improve by providing feedback
            </label>
            <RatingStars large overAllFeedback />
          </div>
        </Fragment>
      ) : (
              <Loader />
            )}
    </div>
  )
}

export default EventCard
