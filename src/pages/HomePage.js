import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const HomePage = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    setEvents(JSON.parse(localStorage.getItem("events")))
  }, [])

  const selectEvent = selectedEvent => {
    console.log("Click Triggered: HomePage -> selectedEvent", selectedEvent)
    const eventsChanged = events.map(event => {
      if (event.id === selectedEvent.id) {
        event.selectedFlag = "selected"
      }
      return event
    })
    console.log("TCL: HomePage -> event", eventsChanged)
    localStorage.setItem("events", JSON.stringify(eventsChanged))
    setEvents(eventsChanged)
  }

  return (
    <Layout>
      <SEO title="Home" />
      {events.map(event => {
        console.log("TCL: HomePage -> event", event)
        return (
          <li key={event.id}>
            {event.id} - {event.title} , {event.selectedFlag} <br />
            {event.eventType == "talk" && (
              <button onClick={() => selectEvent(event)}>select this</button>
            )}
          </li>
        )
      })}
    </Layout>
  )
}

export default HomePage
