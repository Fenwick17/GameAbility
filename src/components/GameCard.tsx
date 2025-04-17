const GameCard = ({ game }) => {
  return (
    <>
      <ul>
        <li>
          <p>{game.name}</p>
          <p>Release date: {game.released}</p>
        </li>
      </ul>
    </>
  );
};

export default GameCard;
