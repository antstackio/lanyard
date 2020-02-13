import React from "react"
import { css } from "@emotion/core"
import Variables from "../components/jss/Variables"
import agenda from "../data/Agenda.json"
import star from "../images/star-on.svg"
import logo from "../images/logo.svg"
import "../css/site.css"
import Amplify from "aws-amplify"
import { API, Auth } from "aws-amplify"
import _ from "lodash"
import { CSVLink, CSVDownload } from "react-csv"
import { button, form_row } from "../components/jss/cvcss"
import styled from "@emotion/styled"

import awsconfig from "../aws-exports"
Amplify.configure(awsconfig)

class DashBoard extends React.Component {
  state = {
    data: [],
    eventRating: { tr: "", fi: "", fo: "", th: "", tw: "", one: "" },
    talkEvent: [],
    isClicked: false,
    spkSpec: [],
    overAllEventRating: false,
    overAllSpeakerRating: false,
    totalLength: 0,
    user: {},
    name: "",
    password: "",
    csvData: []
  }
  componentDidMount() {

    API.get("lanyard", "/items")
      .then(response => {
        console.log("api", response)
        this.setState({ data: response.data }, () => { this.calTotalRating() })

      })
      .catch(error => {
        console.log(error)
      })


    Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then(user => {
        console.log(user)
        this.setState({ user: user })
      })
      .catch(err => console.log(err))
  }
  calTotalRating = () => {
    console.log('data', this.state.data)
    const eventRating = { tr: "", fi: "", fo: "", th: "", tw: "", one: "" }
    const totalf = this.state.data.filter(e => {
      return e.track_id === "eventFeedback"
    })
    if (totalf.length > 0) {

      let sum = 0
      totalf.forEach(e => {
        sum = sum + e.rating
        if (e.rating === 1) {
          eventRating.one++
        } else if (e.rating === 2) {
          eventRating.tw++
        } else if (e.rating === 3) {
          eventRating.th++
        } else if (e.rating === 4) {
          eventRating.fo++
        } else {
          eventRating.fi++
        }
      })
      eventRating.tr = Math.round((sum / totalf.length) * 100) / 100
      this.setState({ eventRating: eventRating, totalLength: totalf.length })
    } else {
      eventRating.tr = "No ratings to show "
      this.setState({ eventRating: eventRating })
    }
    this.makeTalkEvent()
  }

  makeTalkEvent = () => {
    const talkEvent = []
    agenda[0].slots.forEach(a => {
      if (a.eventType === "talk" || a.eventType === "other") {
        a.tracks.forEach(t => {
          talkEvent.push(t.trackId)
        })
      }
    })
    console.log('talkEvent', talkEvent)
    this.setState({ talkEvent: talkEvent })
  }

  handleShow = t => {
    console.log(t)
    const spkSpec = this.state.data.filter(e => {
      return e.track_id === t
    })
    console.log(spkSpec)
    this.setState({
      isClicked: true,
      spkSpec: spkSpec,
      overAllSpeakerRating: true,
    })
  }

  handleLogout = () => {
    console.log("logout")
    Auth.signOut()
      .then(data => this.setState({
        data: [],
        eventRating: { tr: "", fi: "", fo: "", th: "", tw: "", one: "" },
        talkEvent: [],
        isClicked: false,
        spkSpec: [],
        overAllEventRating: false,
        overAllSpeakerRating: false,
        totalLength: 0,
        user: {},
        name: "",
        password: "",
        csvData: []
      }))
      .catch(err => alert(err))
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, password } = this.state
    Auth.signIn({ username: name, password })
      .then(user => {
        console.log(user.username)
        this.setState({ user })
        API.get("lanyard", "/items")
          .then(response => {
            this.setState({ data: response.data }, () => { this.calTotalRating() })
          })
          .catch(error => {
            alert(error)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  handleCsvData = (data, type) => {
    console.log(data, type)
    if (type === 'talk') {
      for (let i = 0; i < data.length; i++) {
        let speakers = []
        data[i].speakers.forEach((s) => {

          let speaker = `${s.firstName} ${s.lastName}`
          speakers.push(speaker)
        })
        console.log('ss', speakers)
        data[i].speakers = speakers
      }
      this.setState({ csvData: data })
    }
    else if (type === 'Event Feedback') {
      data = data.filter(e => {
        return e.track_id === "eventFeedback"
      })
      this.setState({ csvData: data })
    }



  }
  render() {
    if (_.isEmpty(this.state.user))
      return (
        <form css={Form} onSubmit={this.handleSubmit}>
          <Title>Login</Title>
          <div css={form_row}>
            <input
              placeholder="Name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
            />
          </div>
          <div css={form_row}>
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              name="password"
            />
            <br />
            <input type="submit" css={button} />
          </div>
        </form>
      )
    return (
      <div css={dashboardCss} className="dashboard">
        <h1 className="main-title">
          <span>FeedBack Card</span>
          <small>Powered by</small>
          <a href="//lanyard.app" target="_blank">
            <img src={logo} alt="lanyard.app" title="lanyard.app" />
          </a>
        </h1>
        <div className="wrapper">
          <div className="Actions">
            <p className="evtTtl">
              <span>Alexa Community Day-2020</span>
            </p>
            <p className="buttons">
              <CSVLink data={this.state.csvData}>
                <span onClick={() => this.handleCsvData(this.state.data, 'Event Feedback')} className="button small">Export</span>
              </CSVLink>
              <span onClick={this.handleLogout} className="button small logout">
                Logout
              </span>
            </p>
          </div>
          <div className="overAll">
            <div className="left">
              <h2>
                <span>Overall Event Rating</span>
                <small>
                  {this.state.eventRating.tr} <img alt="star" src={star}></img>
                </small>
                <button
                  onClick={() => this.setState({ overAllEventRating: true })}
                >
                  detailed view
                </button>
              </h2>
            </div>
            <div className="right">
              <div className="starRow">
                <span>5</span>
                <img alt="star" src={star} />
                <span className="wid">
                  <span
                    className="green"
                    style={{
                      width: `${(this.state.eventRating.fi /
                        this.state.totalLength) *
                        100}%`,
                    }}
                  ></span>
                </span>
                <span className="count">{this.state.eventRating.fi} </span>
              </div>
              <div className="starRow">
                <span>4</span>
                <img alt="star" src={star} />
                <span className="wid">
                  <span
                    className="blue"
                    style={{
                      width: `${(this.state.eventRating.fo /
                        this.state.totalLength) *
                        100}%`,
                    }}
                  ></span>
                </span>
                <span className="count">{this.state.eventRating.fo} </span>
              </div>
              <div className="starRow">
                <span>3</span>
                <img alt="star" src={star} />
                <span className="wid">
                  <span
                    className="yellow"
                    style={{
                      width: `${(this.state.eventRating.th /
                        this.state.totalLength) *
                        100}%`,
                    }}
                  ></span>
                </span>
                <span className="count">{this.state.eventRating.th} </span>
              </div>
              <div className="starRow">
                <span>2</span>
                <img alt="star" src={star} />
                <span className="wid">
                  <span
                    className="orange"
                    style={{
                      width: `${(this.state.eventRating.tw /
                        this.state.totalLength) *
                        100}%`,
                    }}
                  ></span>
                </span>
                <span className="count">{this.state.eventRating.tw}</span>
              </div>
              <div className="starRow">
                <span>1</span>
                <img alt="star" src={star} />
                <span className="wid">
                  <span
                    className="red"
                    style={{
                      width: `${(this.state.eventRating.one /
                        this.state.totalLength) *
                        100}%`,
                    }}
                  ></span>
                </span>
                <span className="count">{this.state.eventRating.one}</span>
              </div>
            </div>
          </div>
          <div
            className={`popup ${
              this.state.overAllEventRating ? "active" : " "
              }`}
          >
            <div className="popContent">
              <div className="title">
                <h1>Event Feedback</h1>
                <br />

                <CSVLink className="buttons" data={this.state.csvData}>
                  <span onClick={() => this.handleCsvData(this.state.data, 'Event Feedback')} className="button small">Export</span>
                </CSVLink>

                <span
                  className="close"
                  onClick={() => this.setState({ overAllEventRating: false })}
                >
                  X
                </span>
              </div>
              <table border="1">
                <thead>
                  <tr>
                    <th>Attendee Email</th>
                    <th>Ratings</th>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((e, i) => {
                    if (e.title === "Event Feedback") {
                      return (
                        <tr key={i}>
                          <td>{e.user_email}</td>
                          <td>{e.rating}</td>
                          <td>{e.remarks}</td>
                        </tr>
                      )
                    } else {
                      return null
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="tableWrap">
            <table border="1">
              <thead>
                <tr>
                  <th>Event Title</th>
                  <th>Speaker Name</th>
                  <th>Overall Rating</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.talkEvent.map((t, i) => {
                  const p = this.state.data.find(e => {
                    return e.track_id === t
                  })
                  if (p) {
                    let sum = 0,
                      length = 0,
                      trackId = "",
                      title = "",
                      name = "",
                      name1 = ""
                    this.state.data.forEach(e => {
                      if (e.track_id === t) {
                        length++
                        sum = sum + e.rating
                        trackId = e.track_id
                        title = e.title
                        e.speakers.forEach((s, i) => {
                          name = s.firstName + " " + s.lastName
                        })
                      }
                    })
                    sum = Math.round((sum / length) * 100) / 100

                    return (
                      <tr key={i}>
                        <td>{title}</td>
                        <td>
                          {name}
                        </td>
                        <td>{sum}</td>
                        <td>
                          <button
                            className="small"
                            onClick={() => this.handleShow(t)}
                          >
                            Show All
                          </button>
                        </td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          </div>
          <div
            className={`popup ${
              this.state.overAllSpeakerRating ? "active" : " "
              }`}
          >
            <div className="popContent">
              <div className="title">
                <h1>Speaker Ratings</h1>
                <br />

                <CSVLink className="buttons" data={this.state.csvData}>
                  <span onClick={() => { this.handleCsvData(this.state.spkSpec, 'talk') }} className="button small">Export</span>
                </CSVLink>


                <span
                  className="close"
                  onClick={(e) => {
                    e.stopPropagation()
                    this.setState({ overAllSpeakerRating: false })
                  }}
                >
                  X
                </span>
              </div>
              {this.state.isClicked && (
                <table border="1">
                  <thead>
                    <tr>
                      <th>Attendee Email</th>
                      <th>Ratings</th>
                      <th>Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.spkSpec.map((e, i) => {
                      return (
                        <tr key={i}>
                          <td>{e.user_email}</td>
                          <td>{e.rating}</td>
                          <td>{e.remarks}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashBoard

const dashboardCss = css`
display: flex;
color: #fff;
  flex-direction: column;
  max-width: 767px;
  margin: auto;
  font-size: 12px;
  @media only screen and (min-width: 450px) {
    font-size: 14px;
  }
  a{
    text-decoration: none;
  }
  .wrapper {
    background: #fff;
    padding: 15px;
    border-radius: 30px 30px 0 0;
    color: #333;
    @media only screen and (min-width: 450px) {
      padding: 30px;
    }
  }
  .title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      .close{
        height: 50px;
        width: 50px;
        font-size: 20px;
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #000;
        color: #fff;
        font-family: arial;
        line-height: 1;
        cursor: pointer;
      }
  }
  table{
      border-collapse : collapse;
      width: 100%;
      th,td{
          padding: 5px 10px;
          text-align: left;
          &:last-child{
              text-align: right;
          }

      }
  }
  .popup {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.8);
    display: flex;
    align-items: flex-end;
    transition: all .25s;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    .popContent{
        max-height: 100vh;
        overflow: auto;
        max-width: 767px;
        width: 100%;
        background: #fff;
        padding: 15px;
        transform: translateY(100%);
        transition: all .25s;
    }
    &.active{
        opacity: 1;
        pointer-events: auto;
        .popContent{

            transform: translateY(0%);
        }

    }
    }
    .tableWrap{
      max-width: 100%;
      overflow: auto;
    }
    .overAll{
    
      @media only screen and (min-width: 450px) {
        display: flex;
      border: solid 1px #000;
      padding: 15px;
      margin-bottom: 25px;
      align-items: center;
      }
      .left{
        @media only screen and (min-width: 450px) {
        width: 50%; 
        }
           }
      h2{
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        small{
          font-size: 50px;
          margin: 15px 0;
        }
      }
      .right{
        @media only screen and (min-width: 450px) {
          padding-left: 25px;
      margin-left: 25px;
      border-left: solid 1px #000;
          }
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: 450px) {
      margin-bottom: 35px;
      align-items: center;

    }
      }
    }
    button,.button{
      background: ${Variables.dark_base_color};
      height: 45px;
      border: 0;
      padding: 0 25px;
      display: flex;
      white-space: nowrap;
      align-items: center;
      justify-content: center;
      color: #fff;
      text-transform: capitalize;
      font-weight: 600;
      cursor: pointer;

      &.small{
        height: auto;
        font-size: 12px;
        padding: 5px 10px;
        border-radius: 5px;
      }
    
    }
    .Actions{
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;
      .evtTtl{
        font-size: 25px;
        font-weight: 600;
        color: ${Variables.dark_base_color}
      }
      .buttons{
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .logout{
        margin-left: 10px;
        background: tomato;
      }
    }
    .starRow{
      display: flex;
      align-items: center;
      span:first-of-type{
        font-weight: 600;
        font-size: 18px;
        width: 20px
      }
      .wid{
        width: 150px;
        background: #ddd;
        margin-right: 10px;
        border-radius: 50px;
        overflow: hidden;
        span{
          height: 10px;
          display: block;
          width: 0;
          &.red{
            background: #ff0000;
          }
          &.green{
            background: #59e459;
          }
          &.blue{
            background: #1ab5eb;
          }
          &.yellow{
            background: #ffc800;
          }
          &.orange{
            background: #ff6a00;
          }
        }
      }
      img{
        margin: 0 10px;
        height: 20px;
      }
    }
    .main-title{
      justify-content: center;
      display: flex;
      align-items: center;
      small{
        font-weight: normal;
        margin: 0 20px;
        font-size: 12px;
      }
      img{
        height: 40px;
      }
    }
}
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
const Form = css`
  color: #fff;
  margin: 0 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .key + button {
    position: fixed;
    left: 10px;
    right: 10px;
    bottom: 10px;
    width: calc(100% - 20px);
  }
`
