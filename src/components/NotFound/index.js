import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-heading">Lost Your Way?</h1>
    <p className="not-found-content">
      we are sorry, the page you requested could not be found Please go back to the homepage
    </p>
    <Link to="/" className="go-back-link-menu">
      <button type="button" className="go-back-home">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
