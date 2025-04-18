import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import GameDetails from '../components/GameDetails/GameDetails';

function GameDetail() {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async (id: string) => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${
            import.meta.env.VITE_RAWG_API_KEY
          }`
        );
        const data = await res.json();
        setGameDetails(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchGameDetails(id);
  }, [id]);

  return (
    <div>
      <h1>Game details</h1>
      {isLoading && <p>Loading...</p>}
      {gameDetails && <GameDetails game={gameDetails} />}
    </div>
  );
}

export default GameDetail;
