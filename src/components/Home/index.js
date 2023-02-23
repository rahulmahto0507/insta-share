import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserStories from '../UserStories'
import UserPosts from '../UserPosts'
import PostCard from '../PostCard'

import './index.css'

class Home extends Component {
  state = {
    searchInput: '',
    searchResultList: [],
  }

  componentDidMount() {
    this.getPosts()
  }

  getPosts = async () => {
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
        searchResultList: updateData,
      })
    }
  }

  ChangeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  enterSearchInput = () => {
    this.getPosts()
  }

  onClickToggle = () => {
    this.setState(prevState => ({isLiked: !prevState.isLiked}))
  }

  renderSearchPosts = () => {
    const {searchResultList} = this.state

    return (
      <>
        {searchResultList.length === 0 ? (
          <div className="all-jobs-container">
            <ul className="jobs-list">
              {searchResultList.map(post => (
                <PostCard searchResultDetails={post} key={post.postId} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="failure-view">
            <img
              src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1662435108/InstaShare/SomethingWentWrong_glggye.png"
              alt="failure view"
            />
            <h1 className="failure-view-heading">
              Something went wrong. Please try again.
            </h1>
          </div>
        )}
      </>
    )
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header
          ChangeSearchInput={this.ChangeSearchInput}
          enterSearchInput={this.enterSearchInput}
        />
        {searchInput !== '' ? (
          <div>{this.renderSearchPosts()}</div>
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
