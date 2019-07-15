import React, { Fragment, useState } from "react"

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
  const [started, setStarted] = useState(false)

  return (
    <Fragment>
      {started ? (
        <div className="inv" css={[eventCard, px_bg]}></div>
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
