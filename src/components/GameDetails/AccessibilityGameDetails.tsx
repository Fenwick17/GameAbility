import { supabase } from '../../lib/supabaseClient';
import { getVotes } from '../../services/voteService';
import { handleVote } from '../../utils/voteLogic';
import './AccessibilityGameDetails.css';
import { useEffect, useState } from 'react';

interface VoteCounts {
  upvotes: number;
  downvotes: number;
}

type VoteState = Record<string, VoteCounts>;

interface AccessibilityDetail {
  id: string;
  category: string;
  accessibility_data: {
    features: {
      name: string;
      levelInfo: {
        level: string;
      };
    };
  };
  submittedBy: string;
}

interface AccessibilityGameDetailsProps {
  accessibilityDetails: AccessibilityDetail[];
}

const AccessibilityGameDetails: React.FC<AccessibilityGameDetailsProps> = ({
  accessibilityDetails,
}) => {
  const [votes, setVotes] = useState<VoteState>({});
  const userId = 'MOCK_USER_ID';

  useEffect(() => {
    const fetchAllVotes = async () => {
      const votesData = {};
      for (const detail of accessibilityDetails) {
        const { upvotes, downvotes } = await getVotes(detail.id);
        votesData[detail.id] = {
          upvotes,
          downvotes,
        };
      }
      console.log('Votes data before setting state: ', votesData);
      setVotes(votesData);
    };

    fetchAllVotes();
  }, [accessibilityDetails]);

  return (
    <div className="accessibility-game-details">
      {accessibilityDetails.map((detail) => (
        <div key={detail.id} className="accessibility-game-details__submission">
          <h3 className="accessibility-game-details__submission-header">
            {detail.category}
          </h3>
          <p>
            {detail.accessibility_data.features.name}:{' '}
            {detail.accessibility_data.features.levelInfo.level}
          </p>
          <span>Submitted by: {detail.submittedBy}</span>
          <div className="accessibility-game-details__submission__vote">
            <button
              onClick={() => handleVote(detail.id, 'upvote', userId, setVotes)}
            >
              Upvote
            </button>
            <span>
              {votes[detail.id]
                ? votes[detail.id].upvotes - votes[detail.id].downvotes
                : 0}
            </span>
            <button
              onClick={() =>
                handleVote(detail.id, 'downvote', userId, setVotes)
              }
            >
              Downvote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccessibilityGameDetails;
