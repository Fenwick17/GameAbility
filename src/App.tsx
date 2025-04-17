import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import GameList from './components/GameList';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gameList, setGameList] = useState([]);
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    try {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${searchTerm}`
      );
      const data = await res.json();
      setGameList(data.results);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div>
        <h1>Game stuff</h1>
        <SearchBar onSearch={handleSearch} />
        {gameList !== null && <GameList gameList={gameList} />}
      </div>
    </>
  );
}

export default App;
