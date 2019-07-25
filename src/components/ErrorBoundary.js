import React, { Component } from "react"
import caveman from "../images/caveman.svg"
import {button} from "../components/jss/cvcss"
import { css } from "@emotion/core"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch() {
    this.setState({ hasError: true })
  }
  render() {
    if (this.state.hasError) {
      // Render any custom fallback UI
      return (
        <div css={errBound}>
          <SEO title="404: Not found" />
          <img src={caveman} alt="caveman"/>
          <div className="text">
          <h1 style={{fontSize: "8vw"}}>Oops...! something went wrong.</h1>
          <span css={button} onClick={() => navigate("/")}>Return to Home</span>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

const errBound = css`
  height: 100vh !important;
  color: #000;
  background: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img{
    max-width: 60%;
    max-height: 40vh;
    margin: 30px auto 0;
  }
  .text{
    padding: 10px 50px 70px;
  }
`