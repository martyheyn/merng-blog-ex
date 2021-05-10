import { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import '../../styles/Reply.css';

import Delete from '../Delete';
import { AuthContext } from '../../context/auth';

function Reply({ reply, postId, commentId }) {
  const { user } = useContext(AuthContext);

  return (
    <div className='reply'>
      <div className='reply-head'>
        <Link to={`/${reply.username}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
          {reply.username} <span>|</span>
        </Link>
        <span className='reply-createdAt'>{moment(reply.createdAt).fromNow()}</span>
      </div>
      <div className='reply-content'>{reply.body}</div>
      <div className='reply-footer'>
        <div className='reply-votes'>
          <i className='fas fa-arrow-alt-circle-up'></i>
          <span className="reply-like-count">1</span>
          <i className='fas fa-arrow-alt-circle-down'></i>
          {user && user.username === reply.username && (
            <span className='reply-delete'>
              <Delete
                postId={postId}
                commentId={commentId}
                replyId={reply.id}
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reply;
