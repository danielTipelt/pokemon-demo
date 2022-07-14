import { render, screen } from "@/tests/test-utils";
import { LoadableContent } from "./LoadableContent";

describe("LoadableContent", () => {
  test("It shows loading indicator", async () => {
    const { getByRole } = render(
      <LoadableContent isLoading error={false} onReset={() => {}}>
        <div data-testid="loadable-content"></div>
      </LoadableContent>
    );

    expect(getByRole("progressbar")).toBeInTheDocument();
  });

  test("It handles error", async () => {
    const onReset = jest.fn();

    const { user } = render(
      <LoadableContent isLoading={false} error={"some error"} onReset={onReset}>
        <div data-testid="loadable-content"></div>
      </LoadableContent>
    );

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
    await user.click(screen.getByRole("button"));

    expect(onReset).toHaveBeenCalled();
  });
});
