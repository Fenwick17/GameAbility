import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GameList from "./GameList";
import { MemoryRouter } from "react-router";

describe("GameList", () => {
  const mockGames = [
    {
      id: 1,
      name: "Game One",
      released: "2024-01-01",
      background_image: "img1.jpg",
    },
    {
      id: 2,
      name: "Game Two",
      released: "2025-02-02",
      background_image: "img2.jpg",
    },
  ];

  it("renders the search the search term before the results", () => {
    render(
      <MemoryRouter>
        <GameList gameList={mockGames} searchTerm="Game" />
      </MemoryRouter>
    );
    expect(screen.getByTestId("search-results-heading")).toHaveTextContent(
      'Results for "Game"'
    );
  });

  it("renders the correct number of GameCard components", () => {
    render(
      <MemoryRouter>
        <GameList gameList={mockGames} searchTerm="Game" />
      </MemoryRouter>
    );
    expect(screen.getAllByTestId("game-card")).toHaveLength(2);
  });
});
