import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import GameList from './components/GameList/GameList';
import { Routes, Route } from 'react-router';
import GameDetail from './pages/GameDetail';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gameList, setGameList] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    setIsLoading(true);
    setNoResults(false);
    setError(null);

    try {
      const res = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${term}`
      );
      const data = await res.json();
      if (data.results.length === 0) {
        setNoResults(true);
        setGameList([]);
      } else {
        setGameList(data.results);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Game stuff</h1>
              <SearchBar onSearch={handleSearch} />
              {isLoading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              {noResults && (
                <p>No results found. Try a different search term.</p>
              )}
              {gameList.length > 0 && (
                <GameList gameList={gameList} searchTerm={searchTerm} />
              )}
            </div>
          }
        />

        <Route path="/game/:id" element={<GameDetail />} />
      </Routes>
    </div>
  );
}

export default App;
