import {
  createContext,
  HTMLProps,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { nanoid } from "nanoid";
import classnames from "classnames";

const context = createContext<{
  id: string;
  active?: boolean;
  hovered?: boolean;
}>({ id: "" });

export function LabeledButton({
  active,
  className,
  children,
  direction = "column",
  ...rest
}: {
  active?: boolean;
  direction?: "row" | "column";
} & HTMLProps<HTMLDivElement>) {
  const id = useMemo(() => nanoid(), []);
  const [hovered, setHovered] = useState(false);

  return (
    <context.Provider value={{ id, active, hovered }}>
      <div
        className={classnames("flex flex-wrap items-center", {
          "flex-col": direction === "column",
          "flex-row gap-4": direction === "row",
        })}
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
        {...rest}
      >
        {children}
      </div>
    </context.Provider>
  );
}

LabeledButton.Label = function Label({
  className,
  autohide,
  ...rest
}: HTMLProps<HTMLLabelElement> & { autohide?: boolean }) {
  const { id, hovered } = useContext(context);

  return (
    <label
      htmlFor={id}
      className={classnames(
        `cursor-pointer text-center`,
        "transition-all duration-200 ease-in-out translate-origin-center",
        // todo: imrpove out animation
        { "-translate-x-full w-0 opacity-0": autohide && !hovered },
        { "translate-x-0 w-fit opacity-100": autohide && hovered },
        className
      )}
      {...rest}
    >
      {rest.children}
    </label>
  );
};

LabeledButton.Button = function Button(
  props: HTMLProps<HTMLButtonElement> & {
    shape?: "btn-square" | "btn-circle";
  }
) {
  const { id, active } = useContext(context);
  const { className, type, shape = "btn-square", ...rest } = props;

  return (
    <button
      type="button"
      {...rest}
      className={classnames(
        `btn text-2xl border-2 hover:border-[3px] hover:border-primary-focus`,
        { "border-primary-focus": active },
        shape,
        props.className
      )}
      aria-pressed={active}
      id={id}
    >
      {props.children}
    </button>
  );
};

LabeledButton.ShowOnHover = function ShowOnHover({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { hovered } = useContext(context);

  if (hovered) {
    return <div className={className}>{children}</div>;
  } else return <></>;
};
