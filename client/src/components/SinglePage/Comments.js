import '../../styles/Comments.css';

import Comment from './Comment';

function Comments({ comments, postId }) {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment comment={comment} postId={postId} />
        </div>
      ))}
    </>
  );
}

export default Comments;
