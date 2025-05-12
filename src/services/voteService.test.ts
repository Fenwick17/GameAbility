import { checkExistingVote, getVotes } from './voteService';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { supabase } from '../lib/supabaseClient';

const mockVotesData = [
  { vote: 'upvote' },
  { vote: 'upvote' },
  { vote: 'downvote' },
];
      
// Mock supabase response
vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() =>
          Promise.resolve({
            data: mockVotesData,
            error: null,
          })
        ),
      })),
    })),
  },
}));

const mockVote = { id: '1', vote: 'upvote', user_id: 'userId' };

function mockSupabaseSingleResponse(data: any) {
  const singleMock = vi.fn().mockResolvedValue({ data, error: null });

  (supabase.from as vi.Mock).mockReturnValue({
    select: vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: singleMock,
        }),
      }),
    }),
  });
}

describe('voteService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  // Tests for getVotes
  describe('getVotes', () => {

    it('should return the correct number of upvotes and downvotes', async () => {
      const result = await getVotes('testId');
      expect(result).toEqual({ upvotes: 2, downvotes: 1 });
    });
  })

  describe('checkExistingVote', () => {
    it('should return null when no votes exist for the game', async () => {
      mockSupabaseSingleResponse(null);

      const result = await checkExistingVote('testId', 'userId');
      expect(result).toBeNull();
    });

    it('should return a vote for userId', async () => {
      mockSupabaseSingleResponse(mockVote);

      const result = await checkExistingVote('testId', 'userId');
      expect(result).toEqual(mockVote);
    });
  });
});
