import React, { useState, useEffect,Fragment } from "react"
import { navigate, Link } from "gatsby"
import { css } from "@emotion/core"
import styled from "@emotion/styled"
import SEO from "../components/seo"
import Variables from "../components/jss/Variables"
import { close_icon } from "../components/jss/cvcss"

const Sponsers = () => {
  const [sponsers, setSponsers] = useState([])

  useEffect(() => {
    setSponsers(JSON.parse(localStorage.getItem("sponsers")))
  }, [])

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('../images/spons', false, /\.(png|jpe?g|svg)$/));

  return (
    <Container>
      <SEO title="Agenda" />
      <Header>
        <Title>Sponsors</Title>
        <span onClick={() => navigate("/")} css={[close_icon, CloseIcon]}>
          close
        </span>
      </Header>
      <SponsersList>
        {sponsers.map((sponser, i) =>  (
          <Fragment>
            <h4>{sponser.tierName}</h4>
            {sponser.brands.map((brand, i) =>  (
              <SponserItem key={i}>
                <a target={brand.webLink ? "_blank" : null} href={brand.webLink ? brand.webLink : null}><span css={spoImage}><img src={images[brand.webLogo]} alt={brand.webLogo} /></span><span css={spoName}>{brand.sponserName}</span></a>
              </SponserItem>
            ))}
          </Fragment>
        ))}
      </SponsersList>
    </Container>
  )
}

export default Sponsers

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

const SponsersList = styled.ul`
  padding-right: ${Variables.gutter_width_xs};
  padding-left: ${Variables.gutter_width_xs};
  position: relative;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  h4{
    width: 100%;
    padding: 0 5px;
    color: #fff;
    margin-bottom: 7px;
    text-transform: uppercase;
    font-size: 18px;
    display: flex;
    align-items: center;
    font-family: inherit;
    &:after{
      content: '';
      flex: 1 0 0;
      height: 2px;
      background: #fff;
      margin-left: 10px;
    }
     &:before{
      content: '';
      flex: 1 0 0;
      height: 2px;
      background: #fff;
      margin-right: 10px;
    }
  }
`

const SponserItem = styled.li`
  position: relative;
  list-style-type: none;
  margin-bottom: 10px;
  width: 50%;
  padding: 0 5px;
  a{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: #fff;
    text-decoration: none;
    color: ${Variables.text_primary_color};
    height: 100%;
    justify-content: space-between;
    border-radius: 20px;
    overflow: hidden;
  }
`
const spoImage = css`
  padding: 0 10px;
  margin: 25px 0;
  img{
    max-width: 100%;
  }
`

const spoName = css`
  font-size: 12px;
  padding: 5px;
  width: 100%;
  color: #fff;
  background: ${Variables.dark_base_color};
`
