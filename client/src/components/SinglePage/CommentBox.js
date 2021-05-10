import { useState, useContext, useRef } from 'react';
import { useMutation } from '@apollo/client';

import '../../styles/CommentBox.css';
import { AuthContext } from '../../context/auth';
import {
  CREATE_COMMENT_MUTATION,
  CREATE_REPLY_MUTATION,
} from '../../util/graphql';

function CommentBox({ reply, commentId, postId, setCom }) {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  const commentInputRef = useRef(null);

  const mutation = commentId ? CREATE_REPLY_MUTATION : CREATE_COMMENT_MUTATION;

  const [createComment] = useMutation(mutation, {
    update() {
      setComment('');
      if (commentId) {
        setCom(false);
      }
      // commentInputRef.current.blur();
    },
    onError(err) {
      console.log(JSON.stringify(err, null, 2));
    },
    variables: {
      postId,
      commentId,
      body: comment,
    },
  });

  return (
    <div className='comment-box'>
      {!reply && <p className='comment-box-title'>Comment Below</p>}
      <textarea
        placeholder='  Comments here'
        onChange={(e) => setComment(e.target.value)}
        ref={commentInputRef}
      />
      <div className="comment-box-footer">
      {/* <p>Footer with emojis and such</p> */}
            {user && (
        <button
          type='submit'
          disabled={comment.trim() === ''}
          onClick={createComment}
        >
          {!reply ? 'Comment' : 'Reply'}
        </button>
      )}
      </div>
    </div>
  );
}

export default CommentBox;
