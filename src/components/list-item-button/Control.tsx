import { ReactNode } from "react";

export function ListItemButtonControl(props: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className="rounded-full bg-neutral-500 bg-opacity-25 w-11 h-11 p-1"
    >
      {props.children}
    </button>
  );
}
