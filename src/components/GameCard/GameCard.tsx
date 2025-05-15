import { Link } from "react-router";
import "./GameCard.css";
import { format } from "date-fns";

const GameCard = ({ game }) => {
  const formattedDate = format(new Date(game.released), "dd MMMM yyyy");

  return (
    <li data-testid="game-card" className="game-list-item">
      <img
        data-testid="game-image"
        src={game.background_image}
        alt={`${game.name} cover image`}
        className="game-list-item-cover-art"
      />
      <span data-testid="game-metacritic" className="game-list-item-rating">
        {game.metacritic}
      </span>
      <p data-testid="game-title">
        <Link to={`/game/${game.id}`}>{game.name}</Link>
      </p>
      <p data-testid="release-date">{formattedDate}</p>
      <ul className="game-list-item-features">
        <li>Feature</li>
        <li>Feature</li>
        <li>Feature</li>
      </ul>
    </li>
  );
};

export default GameCard;
