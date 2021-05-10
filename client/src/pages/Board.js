import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Board.css';

import Posts from '../components/Posts/Posts';
import SideBar from '../components/SideBar/SideBar';
import SearchBar from '../components/SearchBar';
import { AuthContext } from '../context/auth';

function Board() {
  const { user } = useContext(AuthContext);
  const [searchWord, setSearchWord] = useState('');
  const [width, setWidth] = useState(window.innerWidth);

  // Width for browser
  function useWindowSize() {
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWidth(window.innerWidth);
      }
      // Add event listener
      window.addEventListener('resize', handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return width;
  }

  useWindowSize();

  return (
    <div className='fullboard container'>
      {user && (
        <div className='board create-post'>
          <h1>Create a Post</h1>
          <Link to='whatsup' className='create-post-icon'>
            <i className='fa fa-plus' />
          </Link>
        </div>
      )}
      <div className={user ? 'board board-filter-user' : 'board board-filter'}>
        <span className='filter-item'>
          <span className='filter-name'>Popular</span>
          <i className='fa fa-fire filter-popular' aria-hidden='true' />
        </span>
        <div className='filter-item'>
          <span className='filter-name filter-new'>New</span>
          <i className='fa fa-life-ring' aria-hidden='true' />
        </div>
        <div className='filter-item-search'>
          <i className='fa fa-search filter-name' aria-hidden='true' />
          <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
        </div>
      </div>
      <div className='board container'>
        <div className='board-masonry-post'>
          <Posts searchWord={searchWord} />
        </div>
        {width > 960 && (
          <div className='board-masonry-sidebar'>
            <SideBar />
          </div>
        )}
      </div>
    </div>
  );
}

export default Board;
