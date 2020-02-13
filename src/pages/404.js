import React from "react"
import { navigate } from "gatsby"
import four_o_four from "../images/404.svg"
import { button } from "../components/jss/cvcss"
import SEO from "../components/seo"
import { css } from "@emotion/core"
import "../css/site.css"

const NotFoundPage = () => (
  <div css={fourError}>
    <SEO title="404: Not found" />
    <img src={four_o_four} alt="404" />
    <div className="text">
      <h1 style={{ fontSize: "8vw" }}>Oops...! something went wrong.</h1>
      <p>The page you were looking for looking for doesn't exist.</p>
      <span css={button} onClick={() => navigate("/")}>
        Return to Home
      </span>
    </div>
  </div>
)

export default NotFoundPage

const fourError = css`
  height: 100vh !important;
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    max-width: 100%;
    max-height: 50vh;
  }
  .text {
    padding: 10px 50px 70px;
  }
`
