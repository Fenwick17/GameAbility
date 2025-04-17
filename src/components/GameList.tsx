import GameCard from './GameCard';

const GameList = ({ gameList }) => {
  return (
    <>
      <h1>Game List</h1>
      {gameList.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </>
  );
};

export default GameList;
