import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search-bar">Game title</label>
        <input
          type="text"
          name="search-bar"
          id="search-bar"
          onChange={(e) => setInput(e.target.value)}
        />
        <button>Search</button>
      </form>
    </>
  );
};

export default SearchBar;
