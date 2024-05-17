import './index.css'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

const Footer = () => (
  <div className="footer-container">
    <div className="socail-media-icon-container">
      <FaGoogle className="socail-media-icons" size={17} />
      <FaTwitter className="socail-media-icons" size={17} />
      <FaInstagram className="socail-media-icons" size={17} />
      <FaYoutube className="socail-media-icons" size={17} />
    </div>
    <p className="contact-us">Contact us</p>
  </div>
)

export default Footer
