import { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="search-bar-container">
          <div className="search-bar">
            <label htmlFor="search-bar">Game title</label>
            <input
              type="text"
              name="search-bar"
              id="search-bar"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <button className="primary-button">Search</button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
