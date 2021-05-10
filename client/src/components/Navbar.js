import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

import { AuthContext } from '../context/auth';
import Button from './Button';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    // display button depending on screensize
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  function logoutMobile() {
    logout();
    closeMobileMenu();
  }

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <i className='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {/* <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                About
              </Link>
            </li> */}
            <li className='nav-item'>
              <Link to='/board' className='nav-links' onClick={closeMobileMenu}>
                Message Board
              </Link>
            </li>
            {!user ? (
              <>
                <li className='nav-item'>
                  <Link
                    to='/login'
                    className='nav-links-mobile'
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    to='/register'
                    className='nav-links-mobile'
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li className='nav-item'>
                <Link
                  to='/'
                  className='nav-links-mobile'
                  onClick={logoutMobile}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
          {button && !user && (
            <>
              <Button buttonStyle='btn--outline' buttonSize=''>
                <Link to='/login' className='btn--link'>
                  Login
                </Link>
              </Button>
              <Button buttonStyle='btn--outline' buttonSize=''>
                <Link to='/register' className='btn--link'>
                  Sign Up
                </Link>
              </Button>
            </>
          )}
          {button && user && (
            <Button buttonStyle='btn--outline' buttonSize=''>
              <Link to='/' className='btn--link' onClick={logout}>
                Logout
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
