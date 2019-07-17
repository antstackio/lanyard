import React from "react"
import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import { css } from "@emotion/core"

import menu from "../../images/menu.svg"
import logo from "../../images/logo.svg"
import agenda from "../../images/agenda.svg"
import FlyMenu from "../FlyMenu/FlyMenu"
import Variables from "../jss/Variables"

const Nav = ({ siteTitle }) => (
  <div css={nav_bar}>
    <FlyMenu
      direction="bottom"
      className="navbar_wrapper"
      trig_title={
        <span className="trig-ttl">
          <img src={menu} alt="logo" />
          <span>Menu</span>
        </span>
      }
    >
      <Link css={lanyard_logo} to="/">
        {siteTitle}
      </Link>
      <ul css={sub_menu}>
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
    {/* <button onClick={() => navigate("/AgendaPage")}>Goto AgendaPage</button> */}
  </div>
)

Nav.propTypes = {
  siteTitle: PropTypes.string,
}

Nav.defaultProps = {
  siteTitle: ``,
}

export default Nav

//Styling

const nav_bar = css`
  #fly_menu {
    position: fixed;
    z-index: 999;
    bottom: 0;
    left: 15px;
    height: 15vh;
    display: flex;
    align-items: center;
    .trig-ttl {
      text-align: center;
      text-transform: uppercase;
      color: #fff;
      img {
        margin-bottom: 5px;
        height: 30px;
      }
    }
    > span {
      height: 50px;
      width: 75px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        margin: 0;
        width: 100%;
      }
    }
    .fly_content {
      border-radius: 50px 50px 0 0;
      .header {
        background: #f7f7f7;
        order: 1;
        .solid {
          top: auto;
          bottom: 5px;
          right: auto;
          left: 10px;
        }
      }
    }
  }
`

const lanyard_logo = css`
  font-size: 0;
  height: 100px;
  background: url(${logo}) center no-repeat;
  background-size: auto 60%;
  display: block;
  margin: 15px 0;
`

const sub_menu = css`
  background: #fff;
  list-style-type: none;
  margin: 0;
  li {
    margin: 0;
    a {
      display: block;
      padding: 15px 25px;
      color: ${Variables.dark_base_color};
      text-decoration: none;
    }
    &:last-child {
      padding-bottom: 30px;
    }
  }
  hr {
    margin: 0;
    & ~ li {
      background: #f7f7f7;
    }
  }
`
