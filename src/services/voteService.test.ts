import { checkExistingVote, getVotes } from './voteService';
import { supabase } from '../lib/supabaseClient';
import { describe, expect, it, vi, beforeEach } from 'vitest';

const mockVotesData = [
  { vote: 'upvote' },
  { vote: 'upvote' },
  { vote: 'downvote' },
];

describe('voteService', () => {
  describe('getVotes', () => {
    beforeEach(() => {
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
    });
    it('should return the correct number of upvotes and downvotes', async () => {
      (supabase.from().select().eq as any).mockResolvedValue({
        data: mockVotesData,
        error: null,
      });
      const result = await getVotes('testId');
      expect(result).toEqual({ upvotes: 2, downvotes: 1 });
    });
  });

  describe('checkExistingVote', () => {
    beforeEach(() => {
      vi.mock('../lib/supabaseClient', () => ({
        supabase: {
          from: vi.fn(() => ({
            select: vi.fn(() => ({
              eq: vi.fn(() => ({
                eq: vi.fn(() => ({
                  single: vi.fn(() =>
                    Promise.resolve({
                      data: mockVotesData,
                      error: null,
                    })
                  ),
                })),
              })),
            })),
          })),
        },
      }));
    });
    it('should return null when no votes exist', async () => {
      (supabase.from().select().eq().eq().single as any).mockResolvedValue({
        data: mockVotesData,
        error: null,
      });
      const result = await checkExistingVote('testId', 'userId');
      expect(result).toBeNull();
    });

    it('should return a vote for userId', async () => {});
  });
});
