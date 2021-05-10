import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import '../styles/Delete.css'

import { AuthContext } from '../context/auth';
import {
  DELETE_POST_MUTATION,
  DELETE_COMMENT_MUTATION,
  DELETE_REPLPY_MUTATION,
  DELETE_USER_MUTATION,
  FETCH_POSTS_QUERY,
} from '../util/graphql';

function Delete({ postId, commentId, replyId, userId, username }) {
  const { logout } = useContext(AuthContext);
  const history = useHistory();

  const mutationPost = replyId
    ? DELETE_REPLPY_MUTATION
    : commentId
    ? DELETE_COMMENT_MUTATION
    : DELETE_POST_MUTATION;

  const [deletePostMutation] = useMutation(mutationPost, {
    update(cache) {
      if (!replyId || !commentId) {
        const { getPosts } = cache.readQuery({ query: FETCH_POSTS_QUERY });
        const newData = getPosts.filter((post) => post.id !== postId);
        cache.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: newData },
        });
        history.push('/board');
      }
    },
    onError(err) {
      console.log(JSON.stringify(err, null, 2));
    },
    variables: {
      postId,
      commentId,
      replyId,
    },
  });

  const [deleteUserMutation] = useMutation(DELETE_USER_MUTATION, {
    update(cache) {
      const { getPosts } = cache.readQuery({ query: FETCH_POSTS_QUERY });
      const newData = getPosts.filter((post) => post.username !== username);
      console.log(newData);
      cache.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: newData },
      });
      history.push('/');
      logout();
    },
    onError(err) {
      console.log(JSON.stringify(err, null, 2));
    },
    variables: {
      userId,
    },
  });

  return (
    <>
      {userId ? (
        <button onClick={deleteUserMutation}>Delete User</button>
      ) : (
        <button className="delete-button" onClick={deletePostMutation}>Delete</button>
      )}
    </>
  );
}

export default Delete;
