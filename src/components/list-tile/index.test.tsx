import Image from "next/image";
import { ListTile } from ".";
import { render, screen } from "../../tests/test-utils";

describe("List tile", function () {
  describe("Standalone button", function () {
    test("It renders with working action", async function () {
      const onClick = jest.fn();

      const { user } = render(
        <ListTile
          image={<Image src="/pokebal-icon" alt="pokebal icon" layout="fill" />}
        >
          <ListTile.Button onClick={onClick} />
        </ListTile>
      );

      expect(screen.getByAltText("pokebal icon")).toBeInTheDocument();
      await user.click(screen.getByRole("button"));
      expect(onClick).toBeCalledTimes(1);
    });
  });

  describe("Multipurpose button", function () {
    test("It renders with edit and delete button", async function () {
      const onDelete = jest.fn();
      const onEdit = jest.fn();
      const { user } = render(
        <ListTile
          image={<Image src="/pokebal-icon" alt="pokebal icon" layout="fill" />}
        >
          <ListTile.Controls onDelete={onDelete} onEdit={onEdit} />
        </ListTile>
      );
      expect(screen.getByAltText("pokebal icon")).toBeInTheDocument();
      expect(screen.getAllByRole("button")).toHaveLength(2);

      await user.click(screen.getAllByRole("button")[0]);
      await user.click(screen.getAllByRole("button")[1]);
      expect(onDelete).toBeCalledTimes(1);
      expect(onEdit).toBeCalledTimes(1);
    });
  });
});
