import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import GameDetails from '../components/GameDetails/GameDetails';
import { supabase } from '../lib/supabaseClient';
import AccessibilityGameDetails from '../components/GameDetails/AccessibilityGameDetails';
import AddAccessibilityFeaturesForm from '../components/AddAccessibilityFeaturesForm/AddAccessibilityFeaturesForm';
import Header from '../components/Header/Header';

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
        .from('accessibility_submissions')
        .select('*')
        .eq('rawg_id', id);

      if (error) {
        console.error('Error fetching game details:', error);
      } else {
        setGameAccessibilityDetails(data);
      }
    };

    fetchGameDetails(id);
  }, [id]);

  return (
    <div>
      <Header />
      {isLoading && <p>Loading...</p>}
      {gameDetails && <GameDetails game={gameDetails} />}
      <h2>Accessibility features</h2>
      {gameAccessibilityDetails && (
        <AccessibilityGameDetails
          accessibilityDetails={gameAccessibilityDetails}
        />
      )}
      {/* TODO: SHOW IF AUTHED */}
      <AddAccessibilityFeaturesForm game={gameDetails} />
      {/* TODO: SHOW LOGIN IF NOT AUTHED */}
    </div>
  );
}

export default GameDetail;
