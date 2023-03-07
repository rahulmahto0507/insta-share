import {Component} from 'react'

import {Link} from 'react-router-dom'

import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'

import {FaRegComment} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'

import Cookies from 'js-cookie'

import './index.css'

class UserInstaPost extends Component {
  state = {
    isLiked: false,
  }

  toggleLike = async () => {
    const {userPost} = this.props
    const {postId} = userPost

    const jwtToken = Cookies.get('jwt_token')

    const {likedStatus} = this.state

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
    const fetchedData = await response.json()

    console.log(fetchedData)
  }

  onClickIncrease = () => {
    this.setState({isLiked: true})

    this.setState({likedStatus: true}, this.toggleLike)
  }

  onClickDecrease = () => {
    this.setState({isLiked: false})

    this.setState({likedStatus: false}, this.toggleLike)
  }

  render() {
    const {userPost} = this.props
    const {
      profilePic,
      userName,
      userId,
      likesCount,
      comments,
      createdAt,
      postDetails,
    } = userPost

    const {isLiked} = this.state
    console.log(isLiked)

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
        <img src={postDetails.image_url} alt="post" className="profile-post" />
        <div className="post-detail-and-stats-container">
          <div>
            {!isLiked ? (
              <button
                type="button"
                onClick={this.onClickIncrease}
                className="user-post-button"
                // eslint-disable-next-line react/no-unknown-property
                testid="likeIcon"
              >
                <BsHeart size={20} color="#262626" />
              </button>
            ) : (
              <button
                type="button"
                onClick={this.onClickDecrease}
                className="user-post-button"
                // eslint-disable-next-line react/no-unknown-property
                testid="unLikeIcon"
              >
                <FcLike size={20} color="red" />
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
          <p className="caption">{postDetails.caption}</p>
          <ul>
            {comments.map(comment => (
              <li key={comment.user_id} className="comment-list">
                <p className="user-comment">
                  <span className="commented-user">{comment.user_name}</span>
                  {comment.comment}
                </p>
              </li>
            ))}
          </ul>
          <p className="created-date">{createdAt}</p>
        </div>
      </li>
    )
  }
}

export default UserInstaPost
