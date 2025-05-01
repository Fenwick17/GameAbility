import { supabase } from '../lib/supabaseClient';

export const checkExistingVote = async (id: string, userId: string) => {
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

export const getVotes = async (id: string) => {
  const { data: votesData, error } = await supabase
    .from('accessibility_votes')
    .select('*')
    .eq('submission_id', id);

  const upvotes =
    votesData?.filter((vote) => vote.vote === 'upvote').length || 0;
  const downvotes =
    votesData?.filter((vote) => vote.vote === 'downvote').length || 0;

  return { upvotes, downvotes };
};
