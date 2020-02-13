import React, { Fragment } from "react"
import { css } from "@emotion/core"

import { media } from "../components/jss/cvcss"
import EventCard from "../components/EventCard/EventCard"
import SEO from "../components/seo"
import Nav from "../components/Nav/Nav"
import "../css/site.css"

const HomePage = () => {
  return (
    <Fragment>
      <SEO title="Home" />
      <EventCard />
      <Nav />
      <p css={copyRight}>
        <small>Powered by Lanyard &copy; 2019 all rights reserved.</small>
      </p>
    </Fragment>
  )
}

export default HomePage

//Styling

const copyRight = css`
  color: rgba(255, 255, 255, 0.25);
  height: 50px;
  display: flex;
  justify-content: center;
  text-align: center;
  ${media.xs} {
    small {
      font-size: 12px;
    }
  }
`
