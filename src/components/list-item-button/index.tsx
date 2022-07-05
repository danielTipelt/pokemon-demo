import { ReactNode } from "react";
import { ListItemButtonControl } from "./Control";

type StandaloneButtonProps = {
  image: ReactNode;
  onClick: () => void;
  onEdit?: never;
  onDelete?: never;
};

type MultifunctionButtonProps = {
  image: ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: never;
};

const StandaloneButtonContent = (props: { onClick(): void }) => (
  <button type="button" className="w-full h-full" onClick={props.onClick} />
);

function CommonButton(props: {
  image: ReactNode;
  onClick?: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="relative w-28 h-28">
      <div className="absolute w-full h-full p-1 flex items-center justify-center -z-10">
        {props.image}
      </div>
      {props.onClick ? (
        <StandaloneButtonContent onClick={props.onClick} />
      ) : (
        <div className="flex flex-wrap">{props.children}</div>
      )}
    </div>
  );
}

export function ListItemButton(
  props: StandaloneButtonProps | MultifunctionButtonProps
) {
  if ("onClick" in props) {
    return <CommonButton {...(props as StandaloneButtonProps)}></CommonButton>;
  }

  return (
    <CommonButton image={props.image}>
      {props.onEdit && (
        <ListItemButtonControl onClick={props.onEdit}>✍️</ListItemButtonControl>
      )}
      {props.onDelete && (
        <ListItemButtonControl onClick={props.onDelete}>
          ❌
        </ListItemButtonControl>
      )}
    </CommonButton>
  );
}
