import React, { Component } from "react"
import { c_timer, c_days } from "./EventCardEmotion"

class CountDown extends Component {
  state = {
    open: this.props.startingTime,
    timeLeft: {},
    intervalId: "",
    now: "",
  }

  componentDidMount = () => {
    this.setState({ intervalId: setInterval(this.countDown, 1000) })
  }

  countDown = () => {
    const now = Date.now()
    const open = this.props.startingTime

    let distance = open - now
    // update timer
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    const x = {
      Days: days,
      Hours: hours,
      Min: minutes,
      Sec: seconds,
    }

    this.setState({ timeLeft: x })
  }

  render() {
    var timeLeft = this.state.timeLeft
    return (
      <div css={c_timer}>
        {Object.keys(timeLeft).map(item => (
          <div key={item} css={c_days}>
            {timeLeft[item] !== null ? (
              <span className={`anim-${timeLeft[item]}`}>{timeLeft[item]}</span>
            ) : null}
            <small>{item}</small>
          </div>
        ))}
      </div>
    )
  }
}

export default CountDown
