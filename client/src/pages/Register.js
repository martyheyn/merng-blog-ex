import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';

import Input from '../components/Input';
import GoogleLoginHook from '../util/GoogleLogin';
import { AuthContext } from '../context/auth';
import { REGISTER_USER } from '../util/graphql';
import { stripes, AuthHeading, useForm } from '../util/hooks';

function Register() {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const { values, onChange, onSubmit } = useForm(registerUserCallback, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      let userData = result.data.register;
      context.login(userData);

      history.push('/board');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    },
  });

  // Workaround to make sure addUser is recognized above, keyword "function" is read first
  function registerUserCallback() {
    addUser();
  }

  return (
    <>
      <main className='main'>
        <div className='auth-container'>
          <section className='wrapper'>
            <AuthHeading
              title='Register'
              question='Already have an account? '
              link='/login'
              account='Login'
            />
            <form
              name='register'
              onSubmit={onSubmit}
              className={loading ? 'form loading' : 'form'}>
              <Input
                type='text'
                name='username'
                placeholder='Username'
                onChange={onChange}
              />
              <Input
                type='email'
                name='email'
                placeholder='Email Address'
                onChange={onChange}
              />
              <Input
                type='password'
                name='password'
                placeholder='Password'
                onChange={onChange}
              />
              <Input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                onChange={onChange}
              />
              <div className='input-control'>
                <button
                  type='submit'
                  disabled={loading}
                  className='input-submit'>
                  Register
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

export default Register;
