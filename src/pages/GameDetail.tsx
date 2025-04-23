import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import GameDetails from '../components/GameDetails/GameDetails';
import { supabase } from '../lib/supabaseClient';
import AccessibilityGameDetails from '../components/GameDetails/AccessibilityGameDetails';
import AddAccessibilityFeaturesForm from '../components/AddAccessibilityFeaturesForm/AddAccessibilityFeaturesForm';

function GameDetail() {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [gameAccessibilityDetails, setGameAccessibilityDetails] =
    useState(null);
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
        fetchAccessibilityGameDetails(id);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    const fetchAccessibilityGameDetails = async (id: string) => {
      const { data, error } = await supabase
        .from('accessibility_games')
        .select('*')
        .eq('rawg_id', id);

      if (error) {
        console.error('Error fetching game details:', error);
      } else {
        console.log(data);
        setGameAccessibilityDetails(data[0]);
      }
    };

    fetchGameDetails(id);
  }, [id]);

  return (
    <div>
      <h1>Game details</h1>
      {isLoading && <p>Loading...</p>}
      {gameDetails && <GameDetails game={gameDetails} />}
      <h2>Accessibility features</h2>
      {gameAccessibilityDetails && (
        <AccessibilityGameDetails
          accessibilityDetails={gameAccessibilityDetails}
        />
      )}
      <AddAccessibilityFeaturesForm game={gameDetails} />
    </div>
  );
}

export default GameDetail;
