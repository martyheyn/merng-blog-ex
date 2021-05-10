import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import '../../styles/UserInfo.css';

import Input from '../Input';
import { EDIT_PROFILE_MUTATION } from '../../util/graphql';
import { AuthContext } from '../../context/auth';
import { useForm } from '../../util/hooks';

function UserInfo({ getUser, label, inputName, type, value, userId }) {
  const { user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);

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
      userId: userId,
      email: values.email,
      bio: values.bio,
    },
  });

  function editUserCallback() {
    editUser();
    setEdit(false);
  }

  let inputValue;

  if (inputName === 'email') {
    inputValue = values.email;
  } else if (inputName === 'bio') {
    inputValue = values.bio;
  } else if (inputName === 'username') {
    inputValue = values.username;
  }

  return (
    <>
      {edit && userId === user.id ? (
        <form onSubmit={onSubmit} className='edit-user-submit'>
          <div className='edit-profile-input'>
            <p>{label}:</p>
            <Input
              type={type}
              name={inputName}
              placeholder={label}
              onChange={onChange}
              value={inputValue}
              className='edit-profile-input-field'
            />
          </div>
          <div className='edit-profile-submit'>
            <i
              className='far fa-window-close edit-profile-cancel'
              onClick={() => setEdit(false)}
            />
            <button>Submit</button>
          </div>
        </form>
      ) : (
        // </div>
        <div className='edit-user'>
          <p>
            {label}: {value}
          </p>

          {user && user.username === getUser.username && (
            <div className='edit-profile-button'>
              <i className='fas fa-edit' onClick={() => setEdit(true)} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default UserInfo;
