import { render, screen } from "@/tests/test-utils";
import { FieldError } from "react-hook-form";
import { ValidationError } from ".";

describe("ValidationError", () => {
  test("It shows error message", () => {
    const error = { message: "Error message", type: "required" } as FieldError;
    render(<ValidationError error={error} />);

    expect(screen.getByRole("alert")).toBeVisible();
  });

  test("It doesn't show error message", () => {
    const error = undefined;
    render(<ValidationError error={error} />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
