import '../styles/SearchBar.css';

function SearchBar({ searchWord, setSearchWord }) {
  const onChange = (e) => {
    e.preventDefault();
    setSearchWord(e.target.value);
  };

  return (
    <>
      <input
        className='searchbar'
        type='text'
        value={searchWord}
        placeholder='Search'
        onChange={onChange}
      />
    </>
  );
}

export default SearchBar;
