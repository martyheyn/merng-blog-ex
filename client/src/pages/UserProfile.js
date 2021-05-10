import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import '../styles/UserProfile.css';

import Delete from '../components/Delete';
import UserInfo from '../components/EditUser/UserInfo';
import stockAvatar from '../images/blank-avatar.jpg';
import { FETCH_PROFILE_QUERY } from '../util/graphql';
import { AuthContext } from '../context/auth';

function UserProfile(props) {
  const { user } = useContext(AuthContext);
  const username = props.match.params.username;

  const { loading, data: { getUser } = {} } = useQuery(FETCH_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  return (
    <>
      {loading ? (
        <p>Loading peopleeee</p>
      ) : (
        <div className='profile container'>
          <div className='profile-pic'>
            <img src={stockAvatar} alt='profile-pic' />
          </div>
          <div className='profile-username'>
            <UserInfo
              label='Username'
              value={getUser.username}
              getUser={getUser}
              type='text'
              inputName='username'
              userId={getUser.id}
            />
          </div>
          <div className='profile-email'>
            <UserInfo
              label='Email'
              value={getUser.email}
              getUser={getUser}
              type='email'
              inputName='email'
              userId={getUser.id}
            />
          </div>
          <div className='profile-bio'>
            <UserInfo
              label='Bio'
              value={getUser.bio}
              getUser={getUser}
              type='text'
              inputName='bio'
              userId={getUser.id}
            />
          </div>
          <div className='profile-stats'>
            <p>Posts:</p>
            <p>Comments:</p>
          </div>
          <div className='delete-user'>
            {user && user.id === getUser.id && (
              <Delete userId={getUser.id} username={getUser.username} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
