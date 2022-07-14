import { render, screen } from "@/tests/test-utils";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  test("should render", async () => {
    let offset = 0;
    const setOffset = function (oldVal: number | ((val: number) => number)) {
      if (typeof oldVal === "number") {
        offset = oldVal;
      } else {
        offset = oldVal(offset);
      }
    };

    const { user } = render(
      <Pagination limit={5} total={10} setOffset={setOffset}>
        <Pagination.PrevButton />
        <Pagination.NextButton />
      </Pagination>
    );
    expect(screen.getByTestId("pagination")).toBeInTheDocument();
    await user.click(screen.getByTitle("Load next page"));
    expect(offset).toBe(5);
    await user.click(screen.getByTitle("Load previous page"));
    expect(offset).toBe(0);
  });
});
