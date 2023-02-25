import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import UserStories from '../UserStories'
import UserPosts from '../UserPosts'
import PostCard from '../PostCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    searchResultList: [],
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    const data = await response.json()
    if (response.ok === true) {
      const updateData = data.posts.map(post => ({
        postId: post.post_id,
        createdAt: post.created_at,
        likesCount: post.likes_count,
        comments: post.comments,
        userId: post.user_id,
        profilePic: post.profile_pic,
        userName: post.user_name,
        postCaption: post.post_details.caption,
        postImage: post.post_details.image_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        searchResultList: updateData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  enterSearchInput = () => {
    this.getPosts()
  }

  onClickToggle = () => {
    this.setState(prevState => ({isLiked: !prevState.isLiked}))
  }

  onClickTryAgainButton = () => {
    this.getPosts()
  }

  renderSearchPosts = () => {
    const {searchResultList} = this.state

    return (
      <>
        {searchResultList.length !== 0 ? (
          <div className="post-container">
            <h1>Search Results</h1>
            <ul className="post-list">
              {searchResultList.map(post => (
                <PostCard searchResultDetails={post} key={post.postId} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="failure-view-container">
            <img
              src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1662435108/InstaShare/SomethingWentWrong_glggye.png"
              alt="search not found"
            />
            <h1 className="failure-view-heading">Search Not Found</h1>
            <p>Try different keyword or search again</p>
          </div>
        )}
      </>
    )
  }

  renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className=".loading-view-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1662435108/InstaShare/SomethingWentWrong_glggye.png"
        alt="failure view"
        className="failure-view-image"
      />
      <p className="failure-view-heading">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        onClick={this.onClickTryAgainButton}
        className="failure-view-retry-button"
      >
        Try again
      </button>
    </div>
  )

  renderAllView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSearchPosts()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          searchInput={searchInput}
        />
        {searchInput !== '' ? (
          <div className=" .user-post-container">{this.renderAllView()}</div>
        ) : (
          <div>
            <UserStories />
            <UserPosts />
          </div>
        )}
      </>
    )
  }
}
export default Home
