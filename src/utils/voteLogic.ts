import { supabase } from '../lib/supabaseClient';
import { checkExistingVote, getVotes } from '../services/voteService';

export const handleVote = async (
  id: string,
  voteType: 'upvote' | 'downvote',
  userId: string,
  setVotes: React.Dispatch<React.SetStateAction<any>>
) => {
  console.log(`${voteType} clicked for ID:`, id);

  const existingVote = await checkExistingVote(id, userId);

  if (existingVote) {
    console.log('EXISTING VOTE ', existingVote);
    if (existingVote === voteType) {
      await supabase
        .from('accessibility_votes')
        .delete()
        .eq('id', existingVote.id);
      console.log(`${voteType} removed for ID:`, id);
    } else {
      // Remove the opposite vote before adding the new one
      await supabase
        .from('accessibility_votes')
        .delete()
        .eq('id', existingVote.id);
      console.log(`Vote updated to ${voteType} for ID:`, id);
    }
  }

  // Insert the new vote if no existing vote or opposite vote
  if (!existingVote || existingVote.vote !== voteType) {
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
  }

  const updatedVotes = await getVotes(id);
  setVotes((prevVotes) => ({ ...prevVotes, [id]: updatedVotes }));
};
