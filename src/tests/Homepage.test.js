import { render, screen, waitFor } from "@testing-library/react";

import HomePage from "../pages/index";

describe("homepage", function () {
  test("I shows title, decription and pokeball image", function () {
    render(<HomePage />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByTestId("description")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
