import React, { useState, Fragment, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { API } from "aws-amplify"
import _ from "lodash"

import { button, form_row, checkbox, close_icon } from "./jss/cvcss"
import Variables from "./jss/Variables"

// import star_on from "../images/star-on.svg"
// import star_off from "../images/star-off.svg"

import StaronSVG from "./ImageComponents/StaronSVG"
import StaroffSVG from "./ImageComponents/StaroffSVG"

const Feedback = ({ state, fromHomePage = false }) => {
  const [rating, setRating] = useState(null)
  const [contactMe, setContactMe] = useState(true)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [remark, setRemark] = useState("")
  const [lsFeedBack, setLsFeedBack] = useState("")
  const [success, setSuccess] = useState(false)
  const [slots, setSlots] = useState([])

  console.log(fromHomePage)

  const { track, selectedSlot, overAllFeedback } = state

  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem("user")).email)
    setLsFeedBack(JSON.parse(localStorage.getItem("feedback")))
    setSlots(JSON.parse(localStorage.getItem("slots")))
    if (state) setRating(state.selectedStar)
  }, [])

  function validateEmail(email) {
    var email_result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/
    return email_result.test(email)
  }

  function validateField() {
    if (!validateEmail(email)) {
      setEmailError("please enter correct email id")
    }
  }
  function submitConfirmation() {
    if (
      confirm(
        "Do u want to continue? Submitted feedback cannot be edited. Check before proceeding."
      )
    ) {
      onsubmit()
    }
  }

  const ratingProvider = () => {
    const values = [1, 2, 3, 4, 5]
    return (
      <Fragment>
        {values.map((ratingNum, index) => {
          if (ratingNum <= rating) {
            return (
              <StaronSVG onClick={() => setRating(ratingNum)} key={index} />
            )
          } else {
            return (
              <StaroffSVG onClick={() => setRating(ratingNum)} key={index} />
            )
          }
        })}
      </Fragment>
    )
  }

  const onsubmit = async () => {
    let remarks = "no Remarks"
    if (remark !== "") remarks = remark
    let speakers = [track.speakers]

    const data = {
      body: {
        track_id: track.trackId,
        created_at: Date.now(),
        remarks,
        rating,
        title: track.title,
        user_email: email || "not provided",
        contact_me: contactMe,
        ...(speakers[0] && { speakers: _.flatten(speakers) }),
      },
    }

    await API.post("lanyard", "/items", data)
      .then((resp) => {
        checkParentComponent(remarks)
      })
      .catch(error => {
        console.log(error)
        checkParentComponent(remarks)
      })
  }

  function updateSelectedSlot() {
    const updateSelectedSlot = { ...selectedSlot }
    const track_index = _.findIndex(updateSelectedSlot.tracks, {
      trackId: track.trackId,
    })
    updateSelectedSlot.slotFeedBack = true
    updateSelectedSlot.tracks[track_index].feedBack = true
    if (updateSelectedSlot.tracks.length > 1) {
      updateSelectedSlot.tracks[track_index].selectedFlag = "selected"
    }
    return updateSelectedSlot
  }

  function checkParentComponent(remarks) {
    if (overAllFeedback) {
      const feedback = lsFeedBack
      lsFeedBack["eventFeedback"] = { rating, remarks, title: "Event Feedback" }

      localStorage.setItem("user", JSON.stringify({ email }))
      localStorage.setItem("feedback", JSON.stringify(feedback))

      setTimeout(() => {
        navigate("/Thankyou")
      }, 1000)

      return null
    } else {
      updateLS(remarks)
    }
  }

  function updateLS(remarks) {
    const feedback = lsFeedBack
    lsFeedBack[track.trackId] = { rating, remarks, title: track.title }

    let updatedSlots = [...slots]
    const slot_index = _.findIndex(updatedSlots, {
      slotId: selectedSlot.slotId,
    })
    updatedSlots[slot_index] = updateSelectedSlot()

    localStorage.setItem("slots", JSON.stringify(updatedSlots))
    localStorage.setItem("user", JSON.stringify({ email }))
    localStorage.setItem("feedback", JSON.stringify(feedback))

    setTimeout(() => {
      navigate("/Thankyou")
    }, 1000)

    return null
  }

  function nvgt() {
    if (fromHomePage) {
      navigate("/AgendaPage")
    } else {
      navigate("/")
    }
  }

  const renderButton = () => {
    if (!rating || !validateEmail(email)) {
      return (
        <button css={button} disabled>
          Submit
        </button>
      )
    } else {
      return (
        <button css={button} onClick={submitConfirmation}>
          Submit
        </button>
      )
    }
  }

  return (
    <Container className="form-container">
      <form
        css={Form}
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <Header>
          <Title>FeedBack</Title>
          <span onClick={() => nvgt()} css={[close_icon, CloseIcon]}>
            close
          </span>
        </Header>
        <div css={feedBack}>
          <div css={eventTitle}>
            <small>{track.title}</small>
          </div>
          <div css={form_row}>
            <div css={starStyle}>{ratingProvider()}</div>
          </div>
          <div css={form_row}>
            <input
              placeholder="Enter Email"
              type="text"
              value={email}
              onChange={e => {
                setEmail(e.target.value)
              }}
              onBlur={validateField}
              onFocus={() => {
                setEmailError("")
              }}
            />
            {emailError ? <span css={error}>{emailError}</span> : null}
          </div>
          <div css={form_row}>
            <textarea
              placeholder="Remarks"
              value={remark}
              onChange={e => setRemark(e.target.value)}
            />
          </div>

          <div css={form_row}>
            <label className="key">
              <small>
                By clicking submit, you agree to our{" "}
                <Link to="/">Terms & conditions</Link>{" "}
              </small>
            </label>
            <div>{renderButton()}</div>
          </div>
        </div>
      </form>
    </Container>
  )
}

export default Feedback

//Styling

const Container = styled.div`
  border: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  height: 100vh !important;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  border: 0;
  z-index: 999999;
  background: #1e2a39;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${Variables.black_bg};
`

const Title = styled.span`
  color: ${Variables.dark_base_color};
  text-decoration: none;
  display: block;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  padding: 0 ${Variables.gutter_width};
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CloseIcon = css`
  right: 10px;
  top: 0;
  position: absolute;
  margin: auto;
  bottom: 0;
  &:before,
  &:after {
    background: ${Variables.dark_base_color};
  }
`

const Form = css`
  color: #fff;
  margin: 0 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .key + button {
    position: fixed;
    left: 10px;
    right: 10px;
    bottom: 10px;
    width: calc(100% - 20px);
  }
`

const eventTitle = css`
  margin-bottom: 20px;
  padding: 0 20px;
`

const feedBack = css`
  text-align: center;
  height: 100%;
  display: flex;
  padding-bottom: 80px;
  flex-direction: column;
  overflow: auto;
  input[type="checkbox"] {
    & + span {
      color: #fff;
    }
  }
  a {
    color: ${Variables.dark_base_color};
  }
  > div:last-child {
    margin-top: auto;
    margin-bottom: 0;
  }
  img {
    display: inline-block;
    height: 35px;
    ~ img {
      margin-left: 7px;
    }
  }
`
const starStyle = css`
  svg {
    width: 25px;
    display: inline-block;
    & ~ svg {
      margin-left: 10px;
    }
  }
`

const error = css`
  font-size: 12px;
  text-transform: capitalize;
  color: ${Variables.wb_red};
  background: #f8dada;
  border-radius: 15px;
  margin-top: 10px;
  border: solid 1px ${Variables.wb_red};
  padding: 2px 15px;
  display: inline-block;
`
