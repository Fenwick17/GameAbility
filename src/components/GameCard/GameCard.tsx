import './GameCard.css';

const GameCard = ({ game }) => {
  return (
    <li className="game-list-item">
      <p>{game.name}</p>
      <p>Release date: {game.released}</p>
      <img
        src={game.background_image}
        alt={`${game.name} cover image`}
        className="game-list-item-cover-art"
      />
    </li>
  );
};

export default GameCard;
