import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"

import Nav from "./Nav/Nav"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div css={lanyard_page}>
      <Nav siteTitle={data.site.siteMetadata.title} />
      <div className="children">
        <main>{children}</main>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

//Styling

const lanyard_page = css`
   {
    height: 100vh;
    padding-bottom: 15vh;
  }
`
