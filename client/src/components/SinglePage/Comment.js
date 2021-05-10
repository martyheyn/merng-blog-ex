import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import '../../styles/Comment.css';

import CommentBox from './CommentBox';
import Reply from './Reply';
import Delete from '../Delete';
import { AuthContext } from '../../context/auth';

function Comment({ comment, postId }) {
  const { user } = useContext(AuthContext);
  const [com, setCom] = useState(false);

  const { replys } = comment;

  console.log(comment)

  return (
    <div className='comment'>
      <div className='comment-box'>
        <div className='comment-head'>
          <Link to={`/${comment.username}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
            {comment.username} <span>|</span>
          </Link>
          <span className='comment-createdAt'>{moment(comment.createdAt).fromNow()}</span>
        </div>
        <div className='comment-content'>{comment.body}</div>
        <div className='comment-footer'>
          <div className='votes'>
            <i className='fas fa-arrow-alt-circle-up'></i>
            <span className="comment-like-count">1</span>
            <i className='fas fa-arrow-alt-circle-down'></i>
            <i
              className='fas fa-comment-alt reply-icon'
              onClick={() => setCom(!com)}
            ></i>
            {user && user.username === comment.username && (
              <span className='comment-delete'>
                <Delete postId={postId} commentId={comment.id} />
              </span>
            )}
          </div>
        </div>
        {com && (
          <div className='reply-comment'>
            <CommentBox
              reply={true}
              setCom={setCom}
              commentId={comment.id}
              postId={postId}
            />
          </div>
        )}
      </div>
      {replys &&
        replys.map((reply) => (
          <div key={reply.id}>
            <Reply reply={reply} postId={postId} commentId={comment.id} />
          </div>
        ))}
    </div>
  );
}

export default Comment;
