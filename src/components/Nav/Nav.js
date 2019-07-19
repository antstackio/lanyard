import React from "react"
import { Link, navigate, useStaticQuery, graphql } from "gatsby"
import { css } from "@emotion/core"
import { media } from "../jss/cvcss"

import menu from "../../images/menu.svg"
import logo from "../../images/logo.svg"
import agenda from "../../images/agenda.svg"
import FlyMenu from "../FlyMenu/FlyMenu"
import Variables from "../jss/Variables"

const Nav = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const siteTitle = data.site.siteMetadata.title

  return (
    <div>
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
        <span css={agenda_trig} onClick={() => navigate("/AgendaPage")}>
          <img src={agenda} alt="goToAgenda"></img> Agenda
        </span>

      </div>
      <p css={copyRight}><small>Powered by Lanyard &copy; 2019 all rights reserved.</small></p>
    </div>
  )
}

export default Nav

//Styling

const copyRight = css `
    color: rgba(255, 255, 255, .25);
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    ${media.xs}{
      small{
        font-size: 12px;
      }
    }
`
const agenda_trig = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-direction: column;
  height: 50px;
  width: 75px;
  text-transform: uppercase;
  ${media.xs}{
    font-size: 14px;
  }
  img {
    margin-bottom: 5px;
    height: 30px;
    ${media.xs}{
      height: 25px;

    }
    ${media.mn}{
      height: 20px;
    }
  }
`

const nav_bar = css`
  height: 15vh;
    display: flex;
  align-items: center;
  justify-content: space-between;
  #fly_menu {
    display: flex;
    align-items: center;
    .trig-ttl {
      text-align: center;
      text-transform: uppercase;
      color: #fff;
      ${media.xs}{
        font-size: 14px;
      }
      img {
        margin-bottom: 5px;
        height: 30px;
        ${media.xs}{
          height: 25px;

        }
        ${media.mn}{
          height: 20px;
        }
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
