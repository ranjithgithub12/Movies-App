import './index.css'
import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link, withRouter} from 'react-router-dom'
import {MdMenuOpen, MdCancel} from 'react-icons/md'

class Header extends Component {
  state = {
    movbileViewHeader: false,
  }

  onClickViewBar = () => {
    this.setState({movbileViewHeader: true})
  }

  onClickCancelHeader = () => {
    this.setState({movbileViewHeader: false})
  }

  onClickSearchIcon = () => {
    const {onClickSearch, match} = this.props
    const {path} = match
    if (path === '/search') {
      onClickSearch()
    }
  }

  onChangeSearchInput = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event.target.value)
  }

  enterKeyDown = event => {
    const {onEnterKeyDown} = this.props
    if (event.key === 'Enter') {
      onEnterKeyDown()
    }
  }

  render() {
    const {movbileViewHeader} = this.state
    const {match} = this.props
    const {path} = match

    let homeStylingClassName
    let popularStylingClassName
    let accountStylingClassName
    let showSearchbar

    switch (path) {
      case '/popular':
        homeStylingClassName = 'inactive'
        popularStylingClassName = 'active'
        accountStylingClassName = 'inactive'
        break
      case '/account':
        homeStylingClassName = 'inactive'
        popularStylingClassName = 'inactive'
        accountStylingClassName = 'active'
        break
      case '/search':
        homeStylingClassName = 'inactive'
        popularStylingClassName = 'inactive'
        accountStylingClassName = 'inactive'
        showSearchbar = 'true'
        break
      case '/':
        homeStylingClassName = 'active'
        popularStylingClassName = 'inactive'
        accountStylingClassName = 'inactive'
        break
      default:
        homeStylingClassName = 'inactive'
        popularStylingClassName = 'inactive'
        accountStylingClassName = 'inactive'
        break
    }
    const {searchInput} = this.props
    return (
      <nav className="nav-contianer">
        <div className="nav-menu">
          <Link to="/" className="header-link-menu">
            <img
              src="https://res.cloudinary.com/dl5cirycu/image/upload/v1715670913/qkbqs73vg1gtazkizssb.png"
              alt="website logo"
              className="header-logo-image"
            />
          </Link>

          <ul className="header-contents">
            <Link to="/" className="header-link-menu">
              <li className={`header-list ${homeStylingClassName}`}>Home</li>
            </Link>
            <Link to="/popular" className="header-link-menu">
              <li className={`header-list ${popularStylingClassName}`}>
                Popular
              </li>
            </Link>
          </ul>

          <div className="profile-search-container">
            {showSearchbar && (
              <input
                type="search"
                className="input-filed"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.enterKeyDown}
              />
            )}
            <Link to="/search" className="heading-link-menu">
              <button
                testid="searchButton"
                className="header-search-button"
                type="button"
                onClick={this.onClickSearchIcon}
              >
                <HiOutlineSearch className="search-icon" size={25} />
              </button>
            </Link>
            <Link to="/account" className="heading-link-menu">
              <button className="header-profile-button" type="button">
                <img
                  src="https://res.cloudinary.com/dl5cirycu/image/upload/v1715688738/rrsughe7vmclb40ehwsg.png"
                  alt="profile"
                />
              </button>
            </Link>
            <button
              type="button"
              className="mobile-view-contents"
              onClick={this.onClickViewBar}
            >
              <MdMenuOpen size={28} className="mobile-view-icon" />
            </button>
          </div>
        </div>

        {movbileViewHeader && (
          <div className="header-mobile-view-contens">
            <ul className="header-mobile-view-unorder">
              <Link to="/" className="header-link-menu">
                <li className={`header-mobile-list ${homeStylingClassName}`}>
                  Home
                </li>
              </Link>
              <Link to="/popular" className="header-link-menu">
                <li className={`header-mobile-list ${popularStylingClassName}`}>
                  Popular
                </li>
              </Link>
              <Link to="/account" className="header-link-menu">
                <li className={`header-mobile-list ${accountStylingClassName}`}>
                  Account
                </li>
              </Link>
            </ul>
            <button
              type="button"
              onClick={this.onClickCancelHeader}
              className="header-mobile-cancel-button"
            >
              <MdCancel size={25} />
            </button>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
