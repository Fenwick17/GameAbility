import { Link } from 'react-router';
import './GameCard.css';
import { format } from 'date-fns';

const GameCard = ({ game }) => {
  const formattedDate = format(new Date(game.released), 'dd MMMM yyyy');

  return (
    <li className="game-list-item">
      <img
        src={game.background_image}
        alt={`${game.name} cover image`}
        className="game-list-item-cover-art"
      />
      <span className="game-list-item-rating">{game.metacritic}</span>
      <p>
        <Link to={`/game/${game.id}`}>{game.name}</Link>
      </p>
      <p>{formattedDate}</p>
      <ul className="game-list-item-features">
        <li>Feature</li>
        <li>Feature</li>
        <li>Feature</li>
      </ul>
    </li>
  );
};

export default GameCard;
