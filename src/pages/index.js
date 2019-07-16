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
      slots {
        eventType
        timeEnd
        timeStart
        tracks {
          feedBack
          id
          selectedFlag
          speakers {
            designation
            externalLink
            name
            profilePicture
          }
          title
          trackLength
        }
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

  const { slots } = data.allAgendaJson.nodes[0]

  SetLocalStorage("slots", slots)

  return (
    <Fragment>
      <Global styles={Reset} />
      <HomePage />
    </Fragment>
  )
}

export default IndexPage
