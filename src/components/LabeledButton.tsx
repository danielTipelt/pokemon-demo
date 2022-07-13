import { createContext, HTMLProps, useContext, useMemo } from "react";
import { nanoid } from "nanoid";
import classnames from "classnames";

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
      className={classnames(
        `cursor-pointer text-center text-ellipsis whitespace-nowrap overflow-hidden max-w-[4rem]`,
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
