import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import '../styles/Login.css';

import Input from '../components/Input';
import GoogleLoginHook from '../util/GoogleLogin';
import { AuthContext } from '../context/auth';
import { LOGIN_USER } from '../util/graphql';
import { stripes, AuthHeading, useForm } from '../util/hooks';

function Login() {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push('/board');
    },
    onError(err) {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      username: values.username,
      password: values.password,
    },
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <>
      <main className='main'>
        <div className='auth-container'>
          <section className='wrapper'>
            <AuthHeading
              title='Sign In'
              question='New user? '
              link='/register'
              account='Create an account'
            />
            <form
              name='login'
              className={loading ? 'form loading' : 'form'}
              onSubmit={onSubmit}>
              <Input
                type='username'
                name='username'
                placeholder='Username'
                onChange={onChange}
              />
              <Input
                type='password'
                name='password'
                placeholder='Password'
                onChange={onChange}
              />
              <div className='input-control'>
                <p className='text text-links'>Forgot Password</p>
                <button
                  type='submit'
                  disabled={loading}
                  className='input-submit'>
                  Login
                </button>
              </div>
            </form>
            {Object.keys(errors).length > 0 && (
              <ul className='list'>
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            )}
            {stripes}
            <div className='method'>
              <div className='method-control'>
                <p className='method-action'>
                  <GoogleLoginHook />
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Login;
