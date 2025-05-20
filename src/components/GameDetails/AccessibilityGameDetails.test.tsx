import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { mockGamesData } from "../../test/mockGamesData";

const mockGameAccessibilityData = mockGamesData[0];

describe("AccessibilityGameDetails", () => {
  it("Should render no accessibility features if none are in the data", () => {});

  it("Should render 1 accessibility features if 1 is present in the data", () => {});

  it("Should render multiple accessibility features if multiple are present in the data", () => {});
});
