import React from "react"
import PropTypes from "prop-types"
import { css } from "@emotion/core"

import Transition from "./Transition"

const Layout = ({ children, location }) => (
  <div css={lanyard_page}>
    <div className="children">
      <main>
        <Transition location={location.pathname}>{children}</Transition>
      </main>
    </div>
  </div>
)

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
