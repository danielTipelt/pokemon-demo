import { createContext, HTMLProps, useContext, useMemo } from "react";
import { nanoid } from "nanoid";

const context = createContext<{ id: string; active?: boolean }>({ id: "" });

export function LabeledButton({
  active,
  className,
  children,
  ...rest
}: {
  active?: boolean;
} & HTMLProps<HTMLDivElement>) {
  const id = useMemo(() => nanoid(), []);

  return (
    <context.Provider value={{ id, active }}>
      <div className={`${className ?? "flex flex-col"}`} {...rest}>
        {children}
      </div>
    </context.Provider>
  );
}

LabeledButton.Label = function Label({
  className,
  ...rest
}: HTMLProps<HTMLLabelElement>) {
  const { id } = useContext(context);
  return (
    <label
      htmlFor={id}
      className={`cursor-pointer text-center text-ellipsis whitespace-nowrap overflow-hidden max-w-[4rem] ${className}`}
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
      className={`btn ${shape} text-2xl border-2 hover:border-[3px] hover:border-primary-focus ${
        props.className
      } ${active ? "border-primary-focus" : ""}`}
      aria-pressed={active}
      id={id}
    >
      {props.children}
    </button>
  );
};
