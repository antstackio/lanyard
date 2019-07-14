import React, { Fragment } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Global } from "@emotion/core"

import "../css/site.css"
import Reset from "../components/jss/Reset"
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

  function SetLocalStorage(key, value) {
    // Donot remove "typeof" : https://github.com/gatsbyjs/gatsby/issues/14480#issuecomment-497983196
    if (typeof window !== "undefined" && localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  const { tracks, events } = data.allAgendaJson.nodes[0]

  SetLocalStorage("tracks", tracks)
  SetLocalStorage("events", events)

  return (
    <Fragment>
      <Global styles={Reset} />
      <HomePage />
    </Fragment>
  )
}

export default IndexPage
