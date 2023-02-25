import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'

import {FaRegComment} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'

class PostCard extends Component {
  state = {
    isLiked: false,
    likedStatus: false,
  }

  toggleLike = async () => {
    await this.setState(prevState => ({isLiked: !prevState.isLiked}))

    const jwtToken = Cookies.get('jwt_token')
    const {searchResultDetails} = this.props
    const {postId} = searchResultDetails

    await this.setState(prevState => ({likedStatus: !prevState.likedStatus}))
    const {likedStatus} = this.state
    console.log(likedStatus)

    const likedPostUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`

    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify({like_status: likedStatus}),
    }

    const response = await fetch(likedPostUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
    }
  }

  render() {
    const {searchResultDetails} = this.props
    const {
      profilePic,
      userName,
      userId,
      likesCount,
      comments,
      createdAt,

      postImage,
      postCaption,
    } = searchResultDetails
    console.log(searchResultDetails)
    const {isLiked} = this.state
    return (
      <li className="user-post-list-item">
        <Link to={`/users/${userId}`} className="profile-link">
          <div className="profile-section">
            <div className="image-container">
              <img
                src={profilePic}
                alt="post author profile"
                className="profile-pic"
              />
            </div>
            <p className="profile-user-name">{userName}</p>
          </div>
        </Link>
        <img src={postImage} alt="post" className="profile-post" />
        <p className="post-detail-and-stats-container">
          <div>
            {!isLiked && (
              <button
                type="button"
                onClick={this.toggleLike}
                className="user-post-button"
                // eslint-disable-next-line react/no-unknown-property
                testid="likeIcon"
              >
                <BsHeart size={20} color="#262626" testid="likeIcon" />
              </button>
            )}
            {isLiked && (
              <button
                type="button"
                onClick={this.toggleLike}
                className="user-post-button"
                // eslint-disable-next-line react/no-unknown-property
                testid="unLikeIcon"
              >
                <FcLike size={20} color="red" testid="likeIcon" />
              </button>
            )}
            <button type="button" className="user-post-button">
              <FaRegComment size={20} color="#475569" />
            </button>
            <button type="button" className="user-post-button">
              <BiShareAlt size={20} color="475569" />
            </button>
          </div>
          <p className="likes">{isLiked ? likesCount + 1 : likesCount} likes</p>
          <p className="caption">{postCaption}</p>
          <ul className="comment-list">
            {comments.map(comment => (
              <li key={comment.user_id} className="comments">
                <p>
                  <span className="commented-user">{comment.user_name} </span>
                  {comment.comment}
                </p>
              </li>
            ))}
          </ul>
          <p className="created-date">{createdAt}</p>
        </p>
      </li>
    )
  }
}
export default PostCard
