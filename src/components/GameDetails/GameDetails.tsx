import { format, isValid, parseISO } from "date-fns";
import "./GameDetails.css";

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
  const releaseDate = game.released ? parseISO(game.released) : null;
  const formattedDate =
    releaseDate && isValid(releaseDate)
      ? format(releaseDate, "MMMM dd, yyyy")
      : "Unknown release date";

  return (
    <>
      <h1 data-testid="game-name">{game.name}</h1>
      <p data-testid="game-released">{formattedDate}</p>
      <ul>
        {game.platforms.map((platform) => (
          <li key={platform.platform.name}>{platform.platform.name}</li>
        ))}
      </ul>
    </>
  );
};

export default GameDetails;
