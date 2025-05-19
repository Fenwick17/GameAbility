import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router";
import App from "./App";

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
});
