import { useMutation } from '@apollo/client';

import { EDIT_POST_MUTATION } from '../../util/graphql';
import { useForm } from '../../util/hooks';

function EditPost({ setEdit, getPost }) {
  const { id, body } = getPost;

  const { onChange, onSubmit, values } = useForm(editPostCallback, {
    body,
  });

  const [editPost] = useMutation(EDIT_POST_MUTATION, {
    onError(err) {
      console.log(JSON.stringify(err, null, 2));
    },
    variables: {
      postId: id,
      body: values.body,
    },
  });

  function editPostCallback() {
    editPost();
    setEdit(false);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='comment-box'>
        <textarea
          name='body'
          value={values.body}
          className='input-field'
          onChange={onChange}
        />
      </div>
      <button>Submit New Post</button>
      <p onClick={() => setEdit(false)}>Cancel</p>
    </form>
  );
}

export default EditPost;
