import { Link } from 'react-router-dom';
import moment from 'moment';
import '../../styles/Post.css';

function Post({ post }) {
  const {
    id,
    username,
    title,
    body,
    createdAt,
    commentCount,
    likeCount,
  } = post;

  return (
    <>
      <div className='post-card' style={{}}>
        <div className='post-votes'></div>
        <div className='post-section'>
          <div className='post-inline'>
            <Link
              to={`/${username}`}
              style={{ color: 'inherit', textDecoration: 'inherit' }}>
              {username} <span>|</span>
            </Link>
            <p className='post-date'>{moment(createdAt).fromNow()}</p>
          </div>
          <Link to={`/board/${id}`}>
            <h1 className='post-title'>{title}</h1>
          </Link>
          <p className='post-body'>{body}</p>
          <div className='post-inline post-icons'>
            <i className='fas fa-comment-alt' />
            <p>
              {commentCount}
              {commentCount === 1 ? '  Comment' : '  Comments'}
            </p>
            <p className='post-likes'>{likeCount} Likes</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
