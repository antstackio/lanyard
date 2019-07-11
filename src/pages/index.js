import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import HomePage from "./HomePage"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query QueryJSON {
      allAgendaJson {
        nodes {
          events {
            id
            speakers {
              designation
              name
              externalLink
              profilePicture
            }
            time {
              end
              start
            }
            title
            tracks
            eventType
            selectedFlag
            slot
          }
          id
          tracks {
            name
            position
          }
        }
      }
    }
  `)

  const { tracks, events } = data.allAgendaJson.nodes[0]

  if (localStorage.getItem("tracks") === null) {
    localStorage.setItem("tracks", JSON.stringify(tracks))
  }

  if (localStorage.getItem("events") === null) {
    localStorage.setItem("events", JSON.stringify(events))
  }

  return (
    <>
      <HomePage />
    </>
  )
}

export default IndexPage
