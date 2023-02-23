import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
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
    const {searchInput} = this.props

    return (
      <>
        <nav className="nav-item">
          <div className="nav-logo">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dq7imhrvo/image/upload/v1643601872/insta%20Shere%20clone/Standard_Collection_8_wutyeq.png"
                alt="website logo"
                className="logo"
              />
            </Link>
            <h1 className="nav-heading">Insta Share</h1>
          </div>
          <div className="nav-link">
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
                data-testid="searchIcon"
              >
                <FaSearch className="search-icon" />
              </button>
            </div>
            <Link to="/" className="link">
              <p className="home">Home</p>
            </Link>
            <Link to="/my-profile" className="link">
              <p className="profile">Profile</p>
            </Link>
            <button
              type="button"
              className="logout-button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </nav>
      </>
    )
  }
}

export default withRouter(Header)
