import React, { useState, Fragment, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { API } from "aws-amplify"
import _ from "lodash"

import { button, form_row, checkbox, close_icon } from "../components/jss/cvcss"
import Variables from "../components/jss/Variables"

import star_on from "../images/star-on.svg"
import star_off from "../images/star-off.svg"

const Feedback = ({ location }) => {
  const [rating, setRating] = useState(null)
  const [contactMe, setContactMe] = useState(true)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [remark, setRemark] = useState("")
  const [lsFeedBack, setLsFeedBack] = useState("")
  const [success, setSuccess] = useState(false)
  const [slots, setSlots] = useState([])

  const { star, track, selectedSlot } = location.state

  useEffect(() => {
    setEmail(JSON.parse(localStorage.getItem("user")).email)
    setLsFeedBack(JSON.parse(localStorage.getItem("feedback")))
    setSlots(JSON.parse(localStorage.getItem("slots")))
    if (location) setRating(star)
  }, [])

  function validateEmail(email) {
    var email_result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/
    return email_result.test(email)
  }

  function validateField() {
    if (!validateEmail(email)) {
      setEmailError("please enter correct email id")
    } else {
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
              <img
                src={star_on}
                onClick={() => setRating(ratingNum)}
                key={index}
              />
            )
          } else {
            return (
              <img
                src={star_off}
                onClick={() => setRating(ratingNum)}
                key={index}
              />
            )
          }
        })}
      </Fragment>
    )
  }

  const onsubmit = async () => {
    let remarks = "no Remarks"
    if (remark !== "") remarks = remark

    const data = {
      body: {
        track_id: track.trackId,
        created_at: Date.now(),
        remarks,
        rating,
        title: track.title,
        speakers: track.speakers || "not applicable",
        user_email: email || "not provided",
        contact_me: contactMe,
      },
    }

    // await API.post("awsAgenda", "/items", data)
    //   .then(() => {updateLS(remarks)})
    //   .catch(error => {console.log(error)})
    updateLS(remarks)
  }

  function updateSelectedSlot() {
    const updateSelectedSlot = { ...selectedSlot }
    const track_index = _.findIndex(updateSelectedSlot.tracks, {
      trackId: track.trackId,
    })
    updateSelectedSlot.slotFeedBack = true
    updateSelectedSlot.tracks[track_index].feedBack = true
    return updateSelectedSlot
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

    setSuccess(true)

    setTimeout(() => {
      navigate("/")
    }, 1000)

    return null
  }

  const renderButton = () => {
    if (!email || !rating) {
      return (
        <button css={button} disabled>
          Submit
        </button>
      )
    } else {
      return (
        <button css={button} onClick={validateField}>
          Submit
        </button>
      )
    }
  }

  return (
    <Container>
      {success ? (
        <div css={successText}>
          <div className="success-checkmark">
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
          <h1>Submitted</h1>
        </div>
      ) : (
        <form
          css={Form}
          onSubmit={e => {
            e.preventDefault()
          }}
        >
          <Header>
            <Title>FeedBack</Title>
            <span
              onClick={() => navigate(previousPath.replace(origin, ""))}
              css={[close_icon, CloseIcon]}
            >
              close
            </span>
          </Header>
          <div css={feedBack}>
            <div css={eventTitle}>
              <small>{track.title}</small>
            </div>
            <div css={form_row}>
              <div>{ratingProvider()}</div>
            </div>
            <div css={form_row}>
              <input
                placeholder="Enter Email"
                type="text"
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                }}
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
              <div css={checkbox}>
                <label>
                  <input
                    defaultChecked={contactMe}
                    type="checkbox"
                    onChange={() => setContactMe(!contactMe)}
                  />
                  <span>
                    <small className="check"></small>Do you want AWS sales /
                    experts to contact you?
                  </span>
                </label>
              </div>
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
      )}
    </Container>
  )
}

export default Feedback

//Styling

const Container = styled.div`
  padding-top: 80px;
  height: calc(100vh - 50px) !important;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
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
  margin: 15px;
  height: 100%;
`

const eventTitle = css`
  margin-bottom: 20px;
  padding: 0 20px;
`

const feedBack = css`
  text-align: center;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  overflow: auto;
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
const successText = css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .success-checkmark {
    width: 80px;
    height: 115px;
    margin: 0 auto;

    .check-icon {
      width: 80px;
      height: 80px;
      position: relative;
      border-radius: 50%;
      box-sizing: content-box;
      border: 4px solid #4caf50;

      &::before {
        top: 3px;
        left: -2px;
        width: 30px;
        transform-origin: 100% 50%;
        border-radius: 100px 0 0 100px;
      }

      &::after {
        top: 0;
        left: 30px;
        width: 60px;
        transform-origin: 0 50%;
        border-radius: 0 100px 100px 0;
        animation: rotate-circle 4.25s ease-in;
      }

      &::before,
      &::after {
        content: "";
        height: 100px;
        position: absolute;
        background: #ffffff;
        transform: rotate(-45deg);
      }

      .icon-line {
        height: 5px;
        background-color: #4caf50;
        display: block;
        border-radius: 2px;
        position: absolute;
        z-index: 10;

        &.line-tip {
          top: 46px;
          left: 14px;
          width: 25px;
          transform: rotate(45deg);
          animation: icon-line-tip 0.75s;
        }

        &.line-long {
          top: 38px;
          right: 8px;
          width: 47px;
          transform: rotate(-45deg);
          animation: icon-line-long 0.75s;
        }
      }

      .icon-circle {
        top: -4px;
        left: -4px;
        z-index: 10;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        position: absolute;
        box-sizing: content-box;
        border: 4px solid rgba(76, 175, 80, 0.5);
      }

      .icon-fix {
        top: 8px;
        width: 5px;
        left: 26px;
        z-index: 1;
        height: 85px;
        position: absolute;
        transform: rotate(-45deg);
        background-color: #ffffff;
      }
    }
  }

  @keyframes rotate-circle {
    0% {
      transform: rotate(-45deg);
    }
    5% {
      transform: rotate(-45deg);
    }
    12% {
      transform: rotate(-405deg);
    }
    100% {
      transform: rotate(-405deg);
    }
  }

  @keyframes icon-line-tip {
    0% {
      width: 0;
      left: 1px;
      top: 19px;
    }
    54% {
      width: 0;
      left: 1px;
      top: 19px;
    }
    70% {
      width: 50px;
      left: -8px;
      top: 37px;
    }
    84% {
      width: 17px;
      left: 21px;
      top: 48px;
    }
    100% {
      width: 25px;
      left: 14px;
      top: 45px;
    }
  }

  @keyframes icon-line-long {
    0% {
      width: 0;
      right: 46px;
      top: 54px;
    }
    65% {
      width: 0;
      right: 46px;
      top: 54px;
    }
    84% {
      width: 55px;
      right: 0px;
      top: 35px;
    }
    100% {
      width: 47px;
      right: 8px;
      top: 38px;
    }
  }
`
