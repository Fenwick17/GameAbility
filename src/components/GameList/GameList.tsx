import GameCard from '../GameCard/GameCard';
import './GameList.css';

interface Game {
  id: number;
  name: string;
  releaseDate: string;
  background_image: string;
}

interface GameListProps {
  gameList: Game[];
  searchTerm: string;
}

const GameList: React.FC<GameListProps> = ({ gameList, searchTerm }) => {
  return (
    <>
      <h2>Results for "{searchTerm}"</h2>
      <ul className="game-list">
        {gameList.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </ul>
    </>
  );
};

export default GameList;
