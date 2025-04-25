import { format } from 'date-fns';
import './GameDetails.css';

interface Platform {
  platform: {
    name: string;
  };
}

interface Game {
  id: number;
  name: string;
  description: string;
  background_image: string;
  rating: number;
  released: string;
  platforms: Platform[];
}

interface GameDetailsProps {
  game: Game;
}

const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
  const formattedDate = format(new Date(game.released), 'dd MMMM yyyy');

  return (
    <>
      <h2>{game.name}</h2>
      <p>{formattedDate}</p>
      {/* <img
        className="game-image"
        src={game.background_image}
        alt={`Cover image for ${game.name}`}
      /> */}
      {/* <p>{game.rating}</p> */}
      {/* <p>{game.description}</p> */}
      <ul>
        {game.platforms.map((platform) => (
          <li key={platform.platform.name}>{platform.platform.name}</li>
        ))}
      </ul>
    </>
  );
};

export default GameDetails;
