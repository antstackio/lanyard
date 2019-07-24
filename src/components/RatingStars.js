import React, { useState, useEffect } from "react"
import { css } from "@emotion/core"
import { navigate } from "gatsby"

import { media } from "./jss/cvcss"

import star_off from "../images/star-off.svg"
import star_on from "../images/star-on.svg"

const RatingStars = ({ large, track }) => {
  const [stars, setStars] = useState([1, 2, 3, 4, 5])
  const [feedback, setFeedback] = useState(null)
  const [feedbackProvided, setFeedbackProvided] = useState(false)
  const [selectedStar, setSelectedStar] = useState(null)

 useEffect(() => {
    const fdbk = JSON.parse(localStorage.getItem("feedback"))
    if(track){
      setFeedback(fdbk)
      if(fdbk[track.trackId]){
        setSelectedStar(fdbk[track.trackId].rating);
        setFeedbackProvided(true)
      }
      else{
        setFeedbackProvided(false)
      }
    }
    else{
      setFeedback(fdbk)
      if(fdbk["eventFeedback"]){
        setSelectedStar(fdbk["eventFeedback"].rating);
        setFeedbackProvided(true)
      }
      else{
        setFeedbackProvided(false)
      }
    }
  }, [])

  function onClickStars(star) {
    console.log(feedbackProvided)
    if(!feedbackProvided){
      if(track){
        if(!feedback[track.trackId]){
          setSelectedStar(star)
          setTimeout(() => {
            navigate("/Feedback", { state: { star, track } })
          }, 200)
        }
      }
      else{
        setSelectedStar(star)
        setTimeout(() => {
          navigate("/Feedback", { state: { star, track: { title: "Event Feedback", trackId :  "eventFeedback"} } })
        }, 200)
      }
    }
  }

  return (
    <span css={[ratingCard, large ? largeRating : null]} className="stars">
      {feedbackProvided ? (<p css={feedbacktext}>Your feedback</p>) : null}
      {stars.map(star => (
        <img
          className={feedbackProvided ? 'smallStar' : ' '}
          src={star <= selectedStar ? star_on : star_off}
          key={star}
          onClick={() => onClickStars(star)}
        />
      ))}
    </span>
  )
}

export default RatingStars

const ratingCard = css`
  img {
    height: 25px;
    display: inline-block;
    ~ img {
      margin-left: 5px;
    }
    &.smallStar{
      height: 20px;
      filter: grayscale();
    }
  }
`
const largeRating = css`
  img {
    height: 50px;
    ${media.mn} {
      height: 35px;
    }
    ~ img {
      margin-left: 10px;
    }
    &.smallStar{
      height: 30px !important;
    }
  }
`
const feedbacktext = css`
  margin: 0;
  font-size: 10px;
  color: #999;
`