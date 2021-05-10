import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';

import { AuthProvider } from './context/auth';
import { AuthRoute } from './util/AuthRoute';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Board from './pages/Board';
import SinglePost from './pages/SinglePost';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Register from './pages/Register';

// Connect to graphql
const httpLink = createHttpLink({
  uri: '/',
});

// Set authorization header in the backend
const authLink = setContext(() => {
  // get token from the local storage
  const token = localStorage.getItem('jwtToken');
  // set auth header
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

function App() {
  return (
    <>
      <AuthProvider>
        <ApolloProvider client={client}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/board' component={Board} />
              <Route exact path='/board/:postId' component={SinglePost} />
              <Route exact path='/whatsup' component={CreatePost} />
              <AuthRoute Route exact path='/login' component={Login} />
              <AuthRoute Route exact path='/register' component={Register} />
              <Route exact path='/:username' component={UserProfile} />
            </Switch>
          </Router>
        </ApolloProvider>
      </AuthProvider>
    </>
  );
}

export default App;
