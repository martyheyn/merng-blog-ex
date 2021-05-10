import { useContext } from 'react';
import { useMutation } from '@apollo/client';

import Delete from '../components/Delete';
import Input from '../components/Input';
import stockAvatar from '../images/blank-avatar.jpg';
import { EDIT_PROFILE_MUTATION } from '../../util/graphql';
import { AuthContext } from '../../context/auth';
import { useForm } from '../../util/hooks';

function EditUser({ getUser, setEdit }) {
  const { user } = useContext(AuthContext);

  const { onChange, onSubmit, values } = useForm(editUserCallback, {
    username: getUser.username,
    email: getUser.email,
    bio: getUser.bio,
  });

  const [editUser] = useMutation(EDIT_PROFILE_MUTATION, {
    // update: (cache, { data: { editUser } } ) => {
    //   const user = cache.readQuery({
    //     query: FETCH_PROFILE_QUERY,
    //     variables: { username: getUser.username },
    //   });
    //   console.log(user);
    //   const updatedUser = editUser;

    // },
    onError(err) {
      console.log(JSON.stringify(err, null, 2));
    },
    variables: {
      userId: user.id,
      email: values.email,
      bio: values.bio,
    },
  });

  function editUserCallback() {
    editUser();
    setEdit(false);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className='profile container'>
          <div className='profile-pic'>
            <img src={stockAvatar} alt='profile-pic' />
          </div>
          <div className='profile-username'>
            <Input
              type='text'
              name='username'
              placeholder='Username'
              onChange={onChange}
              value={values.email}
            />
          </div>
          <div className='profile-email'>
            <Input
              type='email'
              name='email'
              placeholder='Email'
              onChange={onChange}
              value={values.email}
            />
          </div>
          <div className='profile-bio'>
            <Input
              type='text'
              name='bio'
              placeholder='Bio'
              onChange={onChange}
              value={values.bio}
            />
          </div>
          <div className='profile-stats'>
            <p className='profile-stats'>Posts:</p>
            <p className='profile-stats'>Comments:</p>
          </div>
        </div>
        <button>Submit Profile</button>
        <p onClick={() => setEdit(false)}>Back to Profile</p>
      </form>
      <Delete userId={user.id} username={user.username} />
    </>
  );
}

export default EditUser;
