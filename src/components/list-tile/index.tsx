import { createContext, ReactNode, useContext } from "react";
import { ListTileControl } from "./Control";

type StandaloneButtonProps = {
  image: ReactNode;
  selected?: boolean;
  onClick: () => void;
  onEdit?: never;
  onDelete?: never;
  children: ReactNode;
};

type MultifunctionButtonProps = {
  image: ReactNode;
  selected?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: never;
  children: ReactNode;
};

const context = createContext({ isSelected: false });

export function ListTile(
  props: StandaloneButtonProps | MultifunctionButtonProps
) {
  return (
    <context.Provider value={{ isSelected: props.selected || false }}>
      <div
        className={`btn ${props.selected ? "btn-active" : ""}`}
        aria-selected={props.selected}
      >
        <div className="absolute w-full h-full p-1 flex items-center justify-center -z-10">
          {props.image}
        </div>
        {props.children}
      </div>
    </context.Provider>
  );
}

ListTile.Button = ListTileButton;
ListTile.Controls = ListTileControls;

function ListTileButton(props: { onClick(): void }) {
  const { isSelected } = useContext(context);
  return (
    <button
      type="button"
      className="w-full h-full"
      onClick={props.onClick}
      aria-pressed={isSelected}
    />
  );
}

function ListTileControls(props: {
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const { isSelected } = useContext(context);
  return (
    <div className="flex items-center justify-end" aria-pressed={isSelected}>
      {props.onEdit && (
        <button
          type="button"
          className="btn btn-circle"
          onClick={props.onEdit}
          title="Edit"
        >
          o
        </button>
      )}
      {props.onDelete && (
        <button
          type="button"
          className="btn btn-circle"
          onClick={props.onDelete}
          title="Delete"
        >
          x
        </button>
      )}
    </div>
  );
}
