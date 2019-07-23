import React from "react"
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group"
import { css } from "@emotion/core"


const timeout = 0
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    marginTop: "100vh",
    opacity: 0,
  },
  entered: {
    transition: `all 250ms linear 0ms`,
    marginTop: "0",
  },
  exiting: {
    transition: `all 0ms linear`,
    opacity: 0,
  },
}

const trGrp = css`
  display: flex;
  height: 100vh;
  flex-direction: column;
  > div:first-of-type{
    height: calc(85vh - 50px);
  }
`

class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props
    return (
      <TransitionGroup>
        <ReactTransition
          key={location}
          timeout={{
            enter: timeout,
            exit: timeout,
          }}
        >
          {status => (
            <div
              css={trGrp}
              style={{
                ...getTransitionStyles[status],
              }}
            >
              {children}
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    )
  }
}
export default Transition
