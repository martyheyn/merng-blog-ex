import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import '../styles/CreatePost.css';

import PostInput from '../components/Posts/PostInput';
import SideBar from '../components/SideBar/SideBar';
import Select from '../components/Select';
import { useForm } from '../util/hooks';
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../util/graphql';

function CreatePost() {
  const history = useHistory();
  const [activeTab, setActiveTab] = useState('Post');

  // Get onChange, submit and values from useForm
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    title: '',
    body: '',
  });

  // Handled errors differently than other pages b/c there is only 1
  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    update(cache, { data: createPost }) {
      const { getPosts } = cache.readQuery({ query: FETCH_POSTS_QUERY });
      const newPost = createPost.createPost;
      const newPostData = [...getPosts, newPost];
      cache.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: newPostData },
      });
      history.push('/board');
    },
    onError(err) {
      console.log(JSON.stringify(err, null, 2));
    },
    variables: {
      title: values.title,
      body: values.body,
    },
  });

  function createPostCallback() {
    createPost();
  }

  const tabClick = (e) => {
    e.preventDefault();
    setActiveTab(e.target.getAttribute('name'));
  };

  return (
    <div className='full-create-post container'>
      <button className='go-back container' onClick={() => history.goBack()}>
        Go Back
      </button>
      <div style={{ display: 'flex', flexWrap: 'wrap' }} className='container'>
        <form onSubmit={onSubmit} className='create-post-input'>
          <h1>Create a Post</h1>
          <Select />
          {/* <label htmlFor='tags' className='create-post-tag-label'>
            Group
          </label>
          <select name='tags' id='tags' className='create-post-tags'>
            <option value='ACL'>ACL</option>
            <option value='ACL'>Meniscus</option>
            <option value='ACL'>PCL</option>
            <option value='ACL'>Arthitis</option>
            <option value='ACL'>Research Papers</option>
          </select> */}
          <div className='create-post-box'>
            <input
              className='create-post-title'
              type='text'
              name='title'
              onChange={onChange}
              placeholder='Title'
            />
            <div className='create-post-tabs'>
              <div
                className={activeTab === 'Post' ? 'active' : ''}
                name='Post'
                onClick={tabClick}>
                Post
              </div>
              <div
                className={activeTab === 'Image' ? 'active' : ''}
                name='Image'
                onClick={tabClick}>
                Images
              </div>
            </div>
            {activeTab === 'Image' ? (
              <PostInput
                className='create-post-upload'
                type='file'
                name='profile-pic'
              />
            ) : (
              <PostInput
                className='create-post-text'
                type='text'
                name='body'
                onChange={onChange}
                placeholder='Whats up?'
              />
            )}
            <div className='create-post-footer'>
              <span className='create-post-tags-button'>Tags</span>
              <button
                className='create-post-submit-button'
                type='submit'
                disabled={!values.title || !values.body}>
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className='create-post-sidebar'>
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
