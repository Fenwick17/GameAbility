import { supabase } from '../../lib/supabaseClient';
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

  const handleVote = async (id: string, voteType: 'upvote' | 'downvote') => {
    console.log(`${voteType} clicked for ID:`, id);

    const existingVote = await checkExistingVote(id);

    if (existingVote) {
      console.log('EXISTING VOTE ', existingVote);
      if (existingVote === voteType) {
        await supabase
          .from('accessibility_votes')
          .delete()
          .eq('id', existingVote.id);
        console.log(`${voteType} removed for ID:`, id);
        getVotes(id); // Refresh votes after removing
        return;
      } else {
        // Remove the opposite vote before adding the new one
        await supabase
          .from('accessibility_votes')
          .delete()
          .eq('id', existingVote.id);
        console.log(`Vote updated to ${voteType} for ID:`, id);
        getVotes(id); // Refresh votes after updating
        return;
      }
    }

    // Insert the new vote
    const { data, error: insertError } = await supabase
      .from('accessibility_votes')
      .insert({
        submission_id: id,
        user_id: userId,
        vote: voteType,
      });

    if (insertError) {
      console.error(`Error inserting ${voteType}:`, insertError.message);
    } else {
      console.log(`${voteType} successful:`, data);
      getVotes(id); // Refresh votes after inserting
    }
  };

  const checkExistingVote = async (id: string) => {
    const { data: existingVote, error } = await supabase
      .from('accessibility_votes')
      .select('*')
      .eq('submission_id', id)
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('No single vote found for the current user.');
        return null; // No vote exists for this user
      }
      console.log('Error fetching existing vote:', error);
      return null;
    }

    console.log('Existing vote:', existingVote); // Debugging
    return existingVote;
  };

  const getVotes = async (id: string) => {
    const { data: votesData, error } = await supabase
      .from('accessibility_votes')
      .select('*')
      .eq('submission_id', id);

    const upvotes =
      votesData?.filter((vote) => vote.vote === 'upvote').length || 0;
    const downvotes =
      votesData?.filter((vote) => vote.vote === 'downvote').length || 0;

    setVotes((prevVotes) => ({
      ...prevVotes,
      [id]: { upvotes, downvotes },
    }));
  };

  useEffect(() => {
    // Fetch votes for all submissions when the component mounts
    accessibilityDetails.forEach((detail) => {
      getVotes(detail.id);
    });
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
            <button onClick={() => handleVote(detail.id, 'upvote')}>
              Upvote
            </button>
            <span>{votes[detail.id]?.upvotes}</span>
            <button onClick={() => handleVote(detail.id, 'downvote')}>
              Downvote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccessibilityGameDetails;
