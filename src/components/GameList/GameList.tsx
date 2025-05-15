import GameCard from "../GameCard/GameCard";
import "./GameList.css";

interface Game {
  id: number;
  name: string;
  releaseDate: string;
  background_image: string;
  metacritic: string;
}

interface GameListProps {
  gameList: Game[];
  searchTerm: string;
}

const GameList: React.FC<GameListProps> = ({ gameList, searchTerm }) => {
  return (
    <>
      <h2 data-testid="search-results-heading">Results for "{searchTerm}"</h2>
      <ul data-testid="game-list" className="game-list">
        {gameList.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </ul>
    </>
  );
};

export default GameList;
