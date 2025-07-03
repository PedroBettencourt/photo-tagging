import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { act } from "react";

describe("App component", () => {
  it("renders the image", () => {
    render(<App />);
    expect(screen.getByAltText("Netherlandish Proverbs painting")).toBeInTheDocument();
  });

  it ("renders selection after clicking", async () => {
    const user = userEvent.setup();
    render(<App />);
    const img = screen.getByAltText("Netherlandish Proverbs painting");
    await user.click(img);
    expect(screen.getByRole("button", { name: "man menu man" }))
  });

  it("clicks character correctly", async() => {

    const mockPosition = [{ chosen: "man", coords: { x: 140, y: 560 } }];
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPosition),
      }),
    );

    const user = userEvent.setup();
    await act(() => render(<App />));

    const img = screen.getByAltText("Netherlandish Proverbs painting");
    await user.click(img, {imageX: 140, imageY: 560});
    const man = screen.getByAltText("man menu");
    await user.click(man);
    
    expect(screen.getByTestId("answer")).toBeInTheDocument();
    

    // The menu doesn't have that character anymore
    await user.click(img);
    expect(screen.queryByAltText("man menu")).not.toBeInTheDocument();
  });
});