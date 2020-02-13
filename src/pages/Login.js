import React from "react"
import { button, form_row } from "../components/jss/cvcss"
import styled from "@emotion/styled"
import Variables from "../components/jss/Variables"
import { css } from "@emotion/core"
import { Auth } from "aws-amplify"
import "../css/site.css"

class Login extends React.Component {
  state = {
    name: "",
    password: "",
  }
  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state)
    const { name, password } = this.state
    Auth.signIn({ name, password })
      .then(user => {
        console.log(user.username)
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  render() {
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
  }
}

export default Login

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
