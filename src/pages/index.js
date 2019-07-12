import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import  "../css/site.css";
import HomePage from "./HomePage";
import { Global, css } from "@emotion/core";
import Reset from "../components/jss/Reset";

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
    <React.Fragment>
      <Global
        styles={Reset}
      />
      <HomePage />
    </React.Fragment>
  )
}

export default IndexPage
