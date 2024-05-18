import './index.css'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

const Account = props => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')
  const hidePassword = password ? '*'.repeat(password.length) : ''

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="user-account-details">
      <Header />
      <div className="account-details-container">
        <h1 className="account-heading">Account</h1>
        <hr className="hr-line" />
        <div className="member-ship-container">
          <p className="membership-heading">Member ship</p>
          <div className="password-container">
            <p className="membership-email">{`${username}@gmail.com`}</p>
            <p className="membership-password">{`Password: ${hidePassword}`}</p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="plan-details-container">
          <p className="plan-detail-heading">Plan details</p>
          <p className="plan-premium">Premium</p>
          <p className="plan-ultra-hd">Ultra HD</p>
        </div>
        <hr className="hr-line" />
        <div className="logout-container">
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Account
