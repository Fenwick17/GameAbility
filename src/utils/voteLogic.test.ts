import { describe, it, expect, beforeEach, vi, Mock } from "vitest";
import { handleVote } from "./voteLogic";
import { checkExistingVote, getVotes } from "../services/voteService"
import { supabase } from "../lib/supabaseClient";

vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(),
      insert: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
    })),
  },
}));

vi.mock("../services/voteService", () => ({
  checkExistingVote: vi.fn(),
  getVotes: vi.fn(),
}));

describe("handleVote", () => {
  const mockSetVotes = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  })

  it("should add a new vote if the user has not voted", async () => {

    (checkExistingVote as Mock).mockResolvedValue(null);
    (supabase.from as Mock).mockReturnValue({
      insert: vi.fn().mockResolvedValue({ data: [{ id: "1" }], error: null }),
    });
    (getVotes as Mock).mockResolvedValue({ upvotes: 1, downvotes: 0 });

    const result = await handleVote('submissionId', "upvote", "userId", mockSetVotes);
    expect(result).toBeUndefined();

    const updaterFn = mockSetVotes.mock.calls[0][0];
    const updatedVotes = updaterFn({});
    expect(updatedVotes).toEqual({ submissionId: { upvotes: 1, downvotes: 0 } });
  });

});