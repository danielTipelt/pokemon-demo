import { ReactElement } from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  ErrorBoundaryProps,
} from "react-error-boundary";
import { ErrorComponent } from "./Error";

export function ErrorBoundary(props: {
  error?: Error;
  onReset: ErrorBoundaryProps["onReset"];
  children: ReactElement;
}) {
  if (props.error) {
    return (
      <ErrorComponent error={props.error} resetErrorBoundary={props.onReset} />
    );
  } else {
    return <ReactErrorBoundary {...props} FallbackComponent={ErrorComponent} />;
  }
}
