import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { AuthContext } from '../context/auth';

function GoogleLoginHook() {
  const context = useContext(AuthContext);
  const history = useHistory();

  // Client Secret dr1vM3zNBfY4cro - mTmebMXx;
  const googleSuccess = async (res) => {
    console.log(res);

    try {
      const googleUser = {
        id: res.googleId,
        username: res.name,
        email: res.profileObj.email,
        createdAt: new Date().toISOString(),
        token: res.tokenId,
      };
      context.login(googleUser);

      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = (err) => {
    console.log(err);
    console.log('Google login failed bruh');
  };

  return (
    <GoogleLogin
      clientId='699714927059-tkfs9qbbbfgg1qtulua8tmlik2d999fi.apps.googleusercontent.com'
      buttonText='Sign in with Google'
      onSuccess={googleSuccess}
      onFailure={googleFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default GoogleLoginHook;
