import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { ReactNode } from "react";
import { Spinner } from "../Spinner";

export function LoadableContent(props: {
  error: any;
  isLoading: boolean;
  children: ReactNode;
  onReset: () => void;
}) {
  const { error, isLoading, children, onReset } = props;

  return (
    <ErrorBoundary error={error} onReset={onReset}>
      {isLoading ? <Spinner /> : <>{children}</>}
    </ErrorBoundary>
  );
}
