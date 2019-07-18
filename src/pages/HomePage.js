import React, { Fragment } from "react"

import EventCard from "../components/EventCard/EventCard"
import SEO from "../components/seo"
import Nav from "../components/Nav/Nav"

const HomePage = () => {
  console.log("Inside HomPage")
  return (
    <Fragment>
      <Nav />
      <SEO title="Home" />
      <EventCard />
    </Fragment>
  )
}

export default HomePage
