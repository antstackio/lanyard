import React, { useState, useEffect } from "react"
import { navigate, Link } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import SEO from "../components/seo"
import Variables from "../components/jss/Variables"
import { close_icon } from "../components/jss/cvcss"

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([])

  useEffect(() => {
    setVolunteers(JSON.parse(localStorage.getItem("volunteers")))
  }, [])

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('../images/vols', false, /\.(png|jpe?g|svg)$/));

  return (
    <Container>
      <SEO title="Agenda" />
      <Header>
        <Title>Volunteers</Title>
        <span onClick={() => navigate("/")} css={[close_icon, CloseIcon]}>
          close
        </span>
      </Header>
      <VolunteersList>
        {volunteers.map((volunteer, i) => {
          return (
            <VolunteerItem key={i}>
              <a target={volunteer.profLink ? "_blank" : null} href={volunteer.profLink ? volunteer.profLink : null}><span css={volImage}><img src={images[volunteer.profImage]} alt={volunteer.profImage} /></span><span css={volName}>{volunteer.firstName} {volunteer.lastName}</span></a>
            </VolunteerItem>)
        })}
      </VolunteersList>
    </Container>
  )
}

export default Volunteers

//Styling

const Container = styled.div`
  padding-top: 80px;
  padding-bottom: 50px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
  background: ${Variables.black_bg};
`

const Title = styled.span`
  color: ${Variables.dark_base_color};
  text-decoration: none;
  display: block;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  padding: 0 ${Variables.gutter_width};
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CloseIcon = css`
  right: 10px;
  top: 0;
  position: absolute;
  margin: auto;
  bottom: 0;
  &:before,
  &:after {
    background: ${Variables.dark_base_color};
  }
`

const VolunteersList = styled.ul`
  padding-right: ${Variables.gutter_width_xs};
  padding-left: ${Variables.gutter_width_xs};
  position: relative;
  margin: 0;
`

const VolunteerItem = styled.li`
  padding: 10px;
  background: #fff;
  border-radius: 50px;
  position: relative;
  list-style-type: none;
  margin-bottom: 10px;
  a{
    display: flex;
  text-decoration: none;
    color: ${Variables.dark_base_color};
    align-items: center;
  }
`
const volImage = css`
  height: 50px;
  width: 50px;
  margin-right:25px;
img{
  max-width: 100%;
  border-radius: 50%;
}
`

const volName = css`
  font-size: 18px;
`
