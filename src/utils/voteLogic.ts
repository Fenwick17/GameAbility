import { supabase } from "../lib/supabaseClient";
import { checkExistingVote, getVotes } from "../services/voteService";

export const handleVote = async (
  id: string,
  voteType: "upvote" | "downvote",
  userId: string,
  setVotes: React.Dispatch<React.SetStateAction<any>>
) => {
  const existingVote = await checkExistingVote(id, userId);

  if (existingVote) {
    if (existingVote === voteType) {
      await supabase
        .from("accessibility_votes")
        .delete()
        .eq("id", existingVote.id);
    } else {
      // Remove the opposite vote before adding the new one
      await supabase
        .from("accessibility_votes")
        .delete()
        .eq("id", existingVote.id);
    }
  }

  // Insert the new vote if no existing vote or opposite vote
  if (!existingVote || existingVote.vote !== voteType) {
    const { data, error: insertError } = await supabase
      .from("accessibility_votes")
      .insert({
        submission_id: id,
        user_id: userId,
        vote: voteType,
      });
    if (insertError) {
      console.error(`Error inserting ${voteType}:`, insertError.message);
    } else {
      getVotes(id); // Refresh votes after inserting
    }
  }

  const updatedVotes = await getVotes(id);
  setVotes((prevVotes) => ({ ...prevVotes, [id]: updatedVotes }));
};
