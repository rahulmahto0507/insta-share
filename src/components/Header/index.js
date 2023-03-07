import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {ImCross} from 'react-icons/im'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {
    isShowCon: false,
    isShowSearch: false,
  }

  onClickHamIcon = () => {
    this.setState({isShowCon: true})
  }

  onClickCloseButton = () => {
    this.setState({isShowCon: false})
  }

  onClickSearchTab = () => {
    this.setState({isShowSearch: true})
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onChangeSearchInput = event => {
    const {changeSearchInput} = this.props
    changeSearchInput(event.target.value)
  }

  onClickSearchIcon = () => {
    const {enterSearchInput} = this.props
    enterSearchInput()
  }

  render() {
    const {isShowCon, isShowSearch} = this.state
    const {searchInput} = this.props

    return (
      <>
        <div className="nav-item">
          <div className="nav-logo">
            <ul className="nav-list">
              <Link to="/">
                <li>
                  <img
                    src="https://res.cloudinary.com/dq7imhrvo/image/upload/v1643601872/insta%20Shere%20clone/Standard_Collection_8_wutyeq.png"
                    alt="website logo"
                    className="logo"
                  />
                </li>
              </Link>
              <li>
                <h1 className="nav-heading">Insta Share</h1>
              </li>
            </ul>
            <button
              type="button"
              onClick={this.onClickHamIcon}
              className="ham-icon"
            >
              <GiHamburgerMenu className="ham-icon" />
            </button>
          </div>
          <div className="desktop-tab">
            <div className="input">
              <input
                type="search"
                className="search-input"
                placeholder="Search Caption"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onClickSearchIcon}
                // eslint-disable-next-line react/no-unknown-property
                testid="searchIcon"
              >
                <FaSearch className="search-icon" />
              </button>
            </div>
            <ul className="link-list">
              <Link to="/" className="link">
                <li>
                  <p className="home">Home</p>
                </li>
              </Link>
              <Link to="/my-profile" className="link">
                <li>
                  <p className="profile">Profile</p>
                </li>
              </Link>
              <li>
                <button
                  type="button"
                  className="logout-button"
                  onClick={this.onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        {isShowCon && (
          <ul className="tab-list">
            <Link to="/" className="link">
              <li>
                <p className="tab">Home</p>
              </li>
            </Link>
            <li>
              <button
                type="button"
                className="search-tab-button"
                onClick={this.onClickSearchTab}
              >
                <p className="tab">Search</p>
              </button>
            </li>
            <Link to="/my-profile" className="link">
              <li>
                <p className="tab">Profile</p>
              </li>
            </Link>
            <li>
              <button
                type="button"
                className="tab-logout-button"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </li>
            <button
              type="button"
              className="cross-icon"
              onClick={this.onClickCloseButton}
            >
              <ImCross className="cross-icon" />
            </button>
          </ul>
        )}
        {isShowSearch && (
          <div className="tab-input">
            <input
              type="search"
              className="tab-search-input"
              placeholder="Search Caption"
              onChange={this.onChangeSearchInput}
              value={searchInput}
            />
            <button
              type="button"
              className="tab-search-button"
              onClick={this.onClickSearchIcon}
            >
              <FaSearch className="tab-search-icon" />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
