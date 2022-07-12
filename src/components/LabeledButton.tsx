import { createContext, HTMLProps, useContext } from "react";

const context = createContext<{ id: string; active?: boolean }>({ id: "" });

export function LabeledButton({
  active,
  id,
  className,
  children,
  ...rest
}: {
  active?: boolean;
  id: string;
} & HTMLProps<HTMLDivElement>) {
  return (
    <context.Provider value={{ id, active }}>
      <div
        className={`${className ?? "flex flex-col"}`}
        aria-current={active}
        {...rest}
      >
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
    variant?: "btn-square" | "btn-circle";
  }
) {
  const { id, active } = useContext(context);
  const { className, type, variant = "btn-square", ...rest } = props;

  return (
    <button
      type="button"
      {...rest}
      className={`btn ${variant} text-2xl border-2 hover:border-[3px] hover:border-primary-focus ${
        props.className
      } ${active ? "border-primary-focus" : ""}`}
      id={id}
    >
      {props.children}
    </button>
  );
};
