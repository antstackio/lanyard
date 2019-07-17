import React from "react"

import EventCard from "../components/EventCard/EventCard"
import Layout from "../components/layout"
import SEO from "../components/seo"

const HomePage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <EventCard />
    </Layout>
  )
}

export default HomePage
