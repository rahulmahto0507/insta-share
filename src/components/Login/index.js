import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = msg => {
    this.setState({showErrorMsg: true, errorMsg: msg})
  }

  onSubmitLoginDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <div className="input-container-login">
        <label className="label" htmlFor="username">
          USERNAME :
        </label>
        <input
          className="input-box"
          type="text"
          id="username"
          value={username}
          placeholder="Enter Username"
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <div className="input-container-login">
        <label className="label" htmlFor="password">
          PASSWORD :
        </label>
        <input
          type="password"
          className="input-box"
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state

    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="login-container">
          <img
            src="https://res.cloudinary.com/dxjuw8lgr/image/upload/v1676531162/Layer_2_ownoex.png"
            alt="website login"
            className="login-image"
          />
          <div className="login-detail-container">
            <img
              src="https://res.cloudinary.com/dq7imhrvo/image/upload/v1643601872/insta%20Shere%20clone/Standard_Collection_8_wutyeq.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="website-head">Insta Share</h1>
            <form
              className="form-container"
              onSubmit={this.onSubmitLoginDetails}
            >
              <div>{this.renderUsername()}</div>
              <div>{this.renderPassword()}</div>
              {showErrorMsg && <p className="error">{errorMsg}</p>}
              <button className="login-button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default Login
