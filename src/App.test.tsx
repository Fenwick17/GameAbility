import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import App from "./App";

const mockGameResults = {
  results: [{ id: 123, name: "Test Game", released: "2023-01-01" }],
};

describe("App renders correctly", () => {
  it("should render the header", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("should render the search bar", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("search-bar-input")).toBeInTheDocument();
  });

  it("should render the login link", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("login-link")).toBeInTheDocument();
  });

  it("should render the game list after search", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockGameResults),
      })
    );

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const searchInput = screen.getByTestId("search-bar-input");
    const searchButton = screen.getByTestId("search-bar-submit");
    fireEvent.change(searchInput, {
      target: { value: "Test Game" },
    });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByTestId("game-list")).toBeInTheDocument();
    });
  });

  it("should render no results", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: [] }),
      })
    );

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const searchInput = screen.getByTestId("search-bar-input");
    const searchButton = screen.getByTestId("search-bar-submit");
    fireEvent.change(searchInput, {
      target: { value: "No Results" },
    });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByTestId("no-results")).toBeInTheDocument();
    });
  });
});
