import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("Home page", () => {
  it("renders the editing prompt", () => {
    render(<Home />);
    const textElement = screen.getByText(/Get started by editing/);
    expect(textElement).toBeInTheDocument();
  });
});
