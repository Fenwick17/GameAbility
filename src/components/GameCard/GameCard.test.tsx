import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GameCard from "./GameCard";
import { MemoryRouter } from "react-router";

describe("GameCard", () => {
  const mockGame = {
    id: 1,
    name: "Game One",
    released: "2024-01-01",
    background_image: "img1.jpg",
    metacritic: "90",
  };

  it("renders a game card with title", () => {
    render(
      <MemoryRouter>
        <GameCard game={mockGame} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("game-title")).toHaveTextContent("Game One");
  });

  it("renders a game card with release date", () => {
    render(
      <MemoryRouter>
        <GameCard game={mockGame} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("release-date")).toHaveTextContent(
      "01 January 2024"
    );
  });

  it("renders a game card with game rating", () => {
    render(
      <MemoryRouter>
        <GameCard game={mockGame} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("game-metacritic")).toHaveTextContent("90");
  });

  it("renders a game card with image", () => {
    render(
      <MemoryRouter>
        <GameCard game={mockGame} />
      </MemoryRouter>
    );

    expect(screen.getByTestId("game-image")).toHaveAttribute("src", "img1.jpg");
  });
});
