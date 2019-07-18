import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Global } from "@emotion/core"

import "../css/site.css"
import Reset from "../components/jss/Reset"
import HomePage from "./HomePage"
import Layout from "../components/layout"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allVolunteersJson {
        nodes {
          volunteers {
            external_link
            name
          }
        }
      }
      allAgendaJson {
        nodes {
          slots {
            eventType
            img
            slotId
            timeEnd
            timeStart
            tracks {
              feedBack
              selectedFlag
              speakers {
                designation
                externalLink
                name
                profilePicture
              }
              title
              trackId
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
  const { volunteers } = data.allVolunteersJson.nodes[0]

  SetLocalStorage("slots", slots)
  SetLocalStorage("volunteers", volunteers)

  return (
    <Layout location={location}>
      <Global styles={Reset} />
      <HomePage />
    </Layout>
  )
}

export default IndexPage
