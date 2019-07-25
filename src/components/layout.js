import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"

// import Transition from "./Transition"

const Layout = ({ children, location }) => (
  <div css={lanyard_page} id="lanyard_page">
        {children}
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

//Styling

const lanyard_page = css`
#lanyard_page{
  display: flex;
  height: 100vh;
  flex-direction: column;
  > div:first-of-type{
    height: calc(85vh - 50px);
  }
}
`
