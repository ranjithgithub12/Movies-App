import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {username, password} = this.state
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showSubmitError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
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
      <>
        <label className="lable-content" htmlFor="username">
          USERNAME
        </label>
        <input
          id="username"
          value={username}
          type="text"
          className="input-field"
          placeholder="Username"
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label className="lable-content" htmlFor="passoword">
          PASSWORD
        </label>
        <input
          id="passoword"
          value={password}
          type="password"
          className="input-field"
          placeholder="Passoword"
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="movie-app-login-container">
        <img
          src="https://res.cloudinary.com/dl5cirycu/image/upload/v1715670913/qkbqs73vg1gtazkizssb.png"
          alt="login website logo"
          className="logo-image"
        />
        <div className="login-form-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="login-heading">Login</h1>
            <div className="login-input-container">{this.renderUsername()}</div>
            <div className="login-input-container">{this.renderPassword()}</div>
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
            <button type="submit" className="mobile-sigin-button">
              Sign in
            </button>
            <button type="submit" className="desktop-login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
