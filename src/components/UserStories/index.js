import {Component} from 'react'

import './index.css'

import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 8,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 8,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 7,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 512,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
}

class UserStories extends Component {
  state = {
    userStories: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    this.setState({apiStatus: apiStatusConstant.progress})
    const jwtToken = Cookies.get('jwt_token')
    const urlApi = 'https://apis.ccbp.in/insta-share/stories'
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(urlApi, option)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = await fetchedData.users_stories.map(userStory => ({
        storyUrl: userStory.story_url,
        userId: userStory.user_id,
        userName: userStory.user_name,
      }))
      console.log(updatedData)
      this.setState({
        userStories: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderLoader = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderSlider = () => {
    const {userStories} = this.state
    return (
      <div className="slick-container">
        <Slider {...settings}>
          {userStories.map(eachLogo => {
            const {userId, storyUrl, userName} = eachLogo
            return (
              <ul key={userId}>
                <li className="slick-item">
                  <img className="logo-image" src={storyUrl} alt="user story" />
                  <p className="user-story-name">{userName}</p>
                </li>
              </ul>
            )
          })}
        </Slider>
      </div>
    )
  }

  renderSuccessView = () => (
    <div className="main-container">{this.renderSlider()}</div>
  )

  onClickTryAgainButton = () => {
    this.getUserStories()
    console.log('error')
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dxjuw8lgr/image/upload/v1677492752/samples/Icon_gxwxru.png"
        alt="failure view"
      />
      <h1 className="failure-view-heading">
        Something went wrong. Please try again.
      </h1>
      <button
        type="button"
        onClick={this.onClickTryAgainButton}
        className="failure-view-button"
        // eslint-disable-next-line react/no-unknown-property
        testid="button"
      >
        Try again
      </button>
    </div>
  )

  renderUserStories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()

      case apiStatusConstant.failure:
        return this.renderFailureView()

      case apiStatusConstant.progress:
        return this.renderLoader()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div>{this.renderUserStories()}</div>
      </>
    )
  }
}
export default UserStories
