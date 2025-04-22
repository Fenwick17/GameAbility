import { useState } from 'react';
import './App.css';
import { accessibilityFormFilters } from './data/accessibilityFormFilters';
import SearchBar from './components/SearchBar/SearchBar';
import GameList from './components/GameList/GameList';
import SearchByAccessibilityFeature from './components/SearchByAccessibilityFeature/SearchByAccessibilityFeature';
import { Routes, Route } from 'react-router';
import GameDetail from './pages/GameDetail';
import { mockGamesData } from './test/mockGamesData';
import { Game } from './types/gamesData';
import AccessibilityGameList from './components/AccessibilityGameList/AccessibilityGameList';

interface SelectedFilter {
  category: string;
  key: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [gameList, setGameList] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
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

  const searchAccessibilityFilters = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newSelectedFilters: SelectedFilter[] = [];

    for (const [key, value] of formData.entries()) {
      const parentCategory = Object.values(accessibilityFormFilters).find(
        (category) => category.features.some((feature) => feature.key === key)
      );

      if (parentCategory) {
        newSelectedFilters.push({
          category: parentCategory.category,
          key: value,
        });
      }
    }
    setSelectedFilters(newSelectedFilters);
    findGamesByFilter(newSelectedFilters);
  };

  const findGamesByFilter = (selectedFilters) => {
    const filtered = mockGamesData.filter((game) =>
      selectedFilters.every((filter) =>
        game.accessibility.some(
          (category) =>
            category.category.toLowerCase() === filter.category.toLowerCase() &&
            category.features.some(
              (feature) =>
                feature.key.toLowerCase() === filter.key.toLowerCase()
            )
        )
      )
    );
    setFilteredGames(filtered);
  };

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>GameAbility</h1>
              <SearchBar onSearch={handleSearch} />
              <SearchByAccessibilityFeature
                accessibilityFormFilters={accessibilityFormFilters}
                searchAccessibilityFilters={searchAccessibilityFilters}
              />
              {isLoading && <p>Loading...</p>}
              {error && <p>Error: {error}</p>}
              {noResults && (
                <p>No results found. Try a different search term.</p>
              )}
              {gameList.length > 0 && (
                <GameList gameList={gameList} searchTerm={searchTerm} />
              )}
              {filteredGames.length > 0 && (
                <AccessibilityGameList accessibilityGameList={filteredGames} />
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
