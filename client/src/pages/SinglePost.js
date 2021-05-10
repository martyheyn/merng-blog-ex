import { useState, useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import '../styles/SinglePost.css';

import CommentBox from '../components/SinglePage/CommentBox';
import Comments from '../components/SinglePage/Comments';
import Delete from '../components/Delete';
import EditPost from '../components/EditUser/EditPost';
import SideBar from '../components/SideBar/SideBar';
import { AuthContext } from '../context/auth';
import { FETCH_POST_QUERY } from '../util/graphql';

function SinglePost(props) {
  const { user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const postId = props.match.params.postId;
  const history = useHistory();
  const [width, setWidth] = useState(window.innerWidth);

  const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  // Width for browser
  function useWindowSize() {
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWidth(window.innerWidth);
      }
      // Add event listener
      window.addEventListener('resize', handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return width;
  }

  useWindowSize();

  return (
    <div className='single-post container'>
      <button className='go-back' onClick={() => history.goBack()}>
        Go Back
      </button>
      <div className='board container'>
        <div className='board-masonry-post'>
          {getPost ? (
            <>
              <div className='single-page-post-card'>
                <div className='post-votes'></div>
                <div className='post-section'>
                  <div className='post-inline'>
                    <Link
                      to={`/${getPost.username}`}
                      style={{ color: 'inherit', textDecoration: 'inherit' }}>
                      {getPost.username} <span>|</span>
                    </Link>
                    <p className='post-date'>
                      {moment(getPost.createdAt).fromNow()}
                    </p>
                  </div>
                  <h1 className='post-title'>{getPost.title}</h1>
                  {edit ? (
                    <span>
                      <EditPost setEdit={setEdit} getPost={getPost} />
                    </span>
                  ) : (
                    <p className='single-page-post-body'>{getPost.body}</p>
                  )}
                  <div className='post-inline post-icons'>
                    <i className='fas fa-comment-alt' />
                    <p>
                      {getPost.commentCount}
                      {getPost.commentCount === 1 ? '  Comment' : '  Comments'}
                    </p>
                    <p className='post-likes'>
                      {getPost.likeCount}
                      {getPost.likeCount === 1 ? '  Like' : '  Likes'}
                    </p>
                    {user && (
                      <>
                        <span className='single-page-post-delete'>
                          {user.username === getPost.username && (
                            <Delete postId={getPost.id} />
                          )}
                        </span>
                        <span className='single-page-post-edit'>
                          {!edit && user.username === getPost.username && (
                            <p onClick={() => setEdit(true)}>Edit Post</p>
                          )}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className='post-comment-box'>
                  <CommentBox reply={false} postId={getPost.id} />
                </div>
                {!user && (
                  <p>Cannot comment on the post unless you are logged in</p>
                )}
              </div>
              {getPost.comments.length > 0 && (
                <div className='comment-card'>
                  <Comments comments={getPost.comments} postId={getPost.id} />
                </div>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        {width > 960 && (
          <div className='board-masonry-sidebar'>
            <SideBar />
          </div>
        )}
      </div>
    </div>
  );
}

export default SinglePost;
