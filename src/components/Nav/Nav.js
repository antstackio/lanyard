import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import FlyMenu from "../FlyMenu/FlyMenu"
import menu from "../../images/menu.svg"

const Nav = ({ siteTitle }) => (

  <FlyMenu className="navbar_wrapper" trig_title={<span><img src={menu} alt="logo"/></span>} title="Menu">
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
        <li className="about ico large">
          <Link to="/">About</Link>
        </li>
        <li className="faq ico large">
          <Link to="/">FAQ's</Link>
        </li>
        <li className="contact ico large">
          <Link to="/">Contact</Link>
        </li>
      </ul>
    </FlyMenu>
)

Nav.propTypes = {
  siteTitle: PropTypes.string,
}

Nav.defaultProps = {
  siteTitle: ``,
}

export default Nav
