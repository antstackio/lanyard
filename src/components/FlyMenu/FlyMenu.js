import React, { Component } from "react";
import fly_menu from './FlyMenuEmotion';

import styled from "@emotion/styled"
import { css } from "@emotion/core"
import {close_icon} from '../jss/cvcss';

class FlyMenu extends Component {
  state = {
    status: false,
    props: this.props
  };

  container = React.createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.body.style.overflow = "auto";
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.closeFly(this.state.props);
    }
  };

  openFly() {
    this.setState({ status: true });
    document.body.style.overflow = "hidden";
  }

  closeFly(props) {
    if (this.props.open) {
      props.close();
      document.body.style.overflow = "auto";
    } else {
      this.setState({ status: false });
      document.body.style.overflow = "auto";
    }
  }

  render() {
    return (
      <nav className={this.props.className} css={fly_menu} id="fly_menu">
        {this.props.trig_title ? (
          <span onClick={() => this.openFly()}>{this.props.trig_title}</span>
        ) : null}
        {this.state.status || this.props.open ? (
          <div
            className={
              this.props.direction
                ? `fly_wrap ${this.props.direction}`
                : `fly_wrap`
            }
          >
            <div className="fly_content" ref={this.container}>
              <div className="header">
                <span className="heading-ttl">{this.props.title}</span>
                <span
                  css={close_icon}
                  onClick={() => this.closeFly(this.props)}
                >
                  Close
                </span>
              </div>
              {!this.props.children.length ? (
                <div
                  onClick={() => {
                    if (!this.props.stayOnClick) {
                      this.closeFly(this.props);
                    }
                  }}
                >
                  {this.props.children}
                </div>
              ) : (
                <>
                  {this.props.children.map((child, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        if (!this.props.stayOnClick) {
                          this.closeFly(this.props);
                        }
                      }}
                    >
                      {child}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        ) : null}
      </nav>
    );
  }
}

export default FlyMenu;
