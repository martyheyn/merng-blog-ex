import { useQuery } from '@apollo/client';

import Post from './Post';
import { FETCH_POSTS_QUERY } from '../../util/graphql';

function Posts({ searchWord }) {
  const { loading, data: { getPosts: posts } = {} } = useQuery(
    FETCH_POSTS_QUERY
  );

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {posts &&
            posts
              .filter((post) =>
                post.title.toLowerCase().includes(searchWord.toLowerCase())
              )
              .map((post) => (
                <div key={post.id}>
                  <Post post={post} />
                </div>
              ))}
        </>
      )}
    </>
  );
}

export default Posts;
