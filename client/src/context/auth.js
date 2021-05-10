import { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import authReducer from './reducer';

const initialState = {
  user: null,
};

// Check if there is already a user there
if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

  // If expiration time is less than now (it is expired)
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initialState.user = decodedToken;
  }
}

// Create context
const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

// userReducer takes a reducer and returns a state and a dispatch
// { user: null } is the initalState
function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    // To keep user logged in even with refresh, store user locally
    localStorage.setItem('jwtToken', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
