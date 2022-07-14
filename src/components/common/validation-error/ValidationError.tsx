import classnames from "classnames";
import { FieldError } from "react-hook-form";

export function ValidationError({ error }: { error?: FieldError | undefined }) {
  return (
    <span
      className={classnames("label-text-alt text-error", {
        invisible: !error?.message,
      })}
      hidden={!error?.message}
      role={"alert"}
    >
      {error?.message || "placeholder"}
    </span>
  );
}
