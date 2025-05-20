import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import GameDetail from "../../pages/GameDetail";
import { mockGamesData } from "../../test/mockGamesData";

const mockGame = {
  name: "Mock Game 1",
  released: "2013-06-14",
  platforms: [
    { platform: { name: "PlayStation 4" } },
    { platform: { name: "PlayStation 3" } },
  ],
};

const mockGameWithBadDate = {
  name: "Mock Game Wrong Date",
  released: "",
  platforms: [
    { platform: { name: "PlayStation 4" } },
    { platform: { name: "PlayStation 3" } },
  ],
};

vi.mock("../../lib/supabaseClient", () => {
  return {
    supabase: {
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn((key, value) => {
            const filtered = mockGamesData.filter(
              (game) => String(game.id) === String(value)
            );
            return Promise.resolve({ data: filtered, error: null });
          }),
        })),
      })),
    },
  };
});

describe("GameDetails", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockGame),
      })
    );
  });
  it("should render game name", async () => {
    render(
      <MemoryRouter>
        <GameDetail game={mockGame} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("game-name")).toHaveTextContent("Mock Game 1");
    });
  });

  it("should render game release date", async () => {
    render(
      <MemoryRouter>
        <GameDetail game={mockGame} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("game-released")).toHaveTextContent(
        "June 14, 2013"
      );
    });
  });

  it("should render error if data is the wrong format or blank", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockGameWithBadDate),
      })
    );
    render(
      <MemoryRouter>
        <GameDetail game={mockGameWithBadDate} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId("game-released")).toHaveTextContent(
        "Unknown release date"
      );
    });
  });

  it("should render game platforms", async () => {
    render(
      <MemoryRouter>
        <GameDetail game={mockGame} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("PlayStation 3")).toBeInTheDocument();
      expect(screen.getByText("PlayStation 4")).toBeInTheDocument();
    });
  });
});
