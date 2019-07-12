import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import { css } from "@emotion/core"

import FlyMenu from "../FlyMenu/FlyMenu"
import menu from "../../images/menu.svg"

const nav_bar = css`
#fly_menu{
  position: fixed;
  z-index: 999;
  top: 15px;
  right: 15px;
  > span{
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
      img{
        margin: 0;
        width: 100%;
      }
    }
}
`

const Nav = ({ siteTitle }) => (
  <div css={nav_bar}>
    <FlyMenu direction="top" className="navbar_wrapper" trig_title={<img src={menu} alt="logo"/>}>
    <Link
      to="/"
      style={{
        color: `white`,
        textDecoration: `none`,
      }}
      >
      {siteTitle}
    </Link>
      <ul className="sub_menu">
        <li className="faq ico large">
          <Link to="/">Volunteers</Link>
        </li>
        <li className="contact ico large">
          <Link to="/">Speakers</Link>
        </li>
        <hr></hr>
        <li className="about ico large">
          <Link to="/">About Lanyard</Link>
        </li>
        <li className="about ico large">
          <Link to="/">Help us Improve</Link>
        </li>
      </ul>
    </FlyMenu>
      </div>
)

Nav.propTypes = {
  siteTitle: PropTypes.string,
}

Nav.defaultProps = {
  siteTitle: ``,
}

export default Nav
