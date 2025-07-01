import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Leaderboard from "../Leaderboard";
import { act } from "react";

describe("Leaderboard component", () => {
  it("renders heading", () => {
    render(<Leaderboard />);
    expect(screen.getByRole("heading", {level: 1}).textContent).toMatch(/leaderboard/i);
  });

  it("renders loading", () => {
    render(<Leaderboard />);
    expect(screen.getByRole("heading", {level: 2}).textContent).toMatch(/loading/i);
  });
  
  it("renders leaderboard", async() => {
    const mockLeaderboard = [{id: 1, name: "john", score: 3742}];
    
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockLeaderboard),
      }),
    );
    
    await act(() => render(<Leaderboard />));
    expect(screen.getByText("Name")).toBeInTheDocument();
  });
});