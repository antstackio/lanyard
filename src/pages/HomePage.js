import React, { Fragment } from "react"
import EventCard from "../components/EventCard/EventCard"
import SEO from "../components/seo"
import Nav from "../components/Nav/Nav"



const HomePage = () => {
  console.log("Inside HomPage")
  return (
    <Fragment>
      <SEO title="Home" />
      <EventCard />
      <Nav />
    </Fragment>
  )
}

export default HomePage
