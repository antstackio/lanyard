import React, { useState } from "react"
import { Link, navigate } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

import { button, form_row, checkbox, close_icon } from "../components/jss/cvcss"
import Variables from "../components/jss/Variables"

import star_on from "../images/star-on.svg"
import star_off from "../images/star-off.svg"

const Feedback = () => {
  const [rating, setRating] = useState(null)

  const ratingProvider = () => {
    const values = [1, 2, 3, 4, 5]
    return (
      <>
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
      </>
    )
  }

  return (
    <Container>
      <form css={Form}>
        <Header>
          <Title>FeedBack</Title>
          <span onClick={() => navigate("/")} css={[close_icon, CloseIcon]}>
            close
          </span>
        </Header>
        <div css={feedBack}>
          <div css={form_row}>
            <div>{ratingProvider()}</div>
          </div>
          <div css={form_row}>
            <input placeholder="Enter Email" type="text" />
          </div>
          <div css={form_row}>
            <textarea placeholder="Remarks" />
          </div>
          <div css={form_row}>
            <div css={checkbox}>
              <label>
                <input defaultChecked type="checkbox" />
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
            <div>
              <button css={button}>Submit</button>
            </div>
          </div>
        </div>
      </form>
    </Container>
  )
}

export default Feedback

//Styling

const Container = styled.div`
  padding-top: 80px;
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

const feedBack = css`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  > div:last-child {
    margin-top: 25px;
  }
  img {
    display: inline-block;
    height: 35px;
    ~ img {
      margin-left: 7px;
    }
  }
`
