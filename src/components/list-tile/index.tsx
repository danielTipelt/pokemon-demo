import { createContext, ReactNode, useContext } from "react";

const context = createContext({ isSelected: false });

export function ListTile(props: {
  selected?: boolean;
  children: ReactNode;
  image: ReactNode;
  className?: string;
}) {
  return (
    <context.Provider value={{ isSelected: props.selected || false }}>
      {/* TODO: use classnames lib */}
      <div
        className={`w-11 h-11 btn relative ${
          props.selected ? "btn-active" : ""
        } ${props.className}`}
        aria-selected={props.selected}
      >
        <div className="absolute w-full h-full p-1 flex items-center justify-center">
          {props.image}
        </div>
        {props.children}
      </div>
    </context.Provider>
  );
}

ListTile.Button = ListTileButton;
ListTile.Controls = ListTileControls;

function ListTileButton(props: { onClick(): void; id?: string }) {
  const { isSelected } = useContext(context);
  return (
    <button
      id={props.id}
      type="button"
      className="w-full h-full absolute"
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
