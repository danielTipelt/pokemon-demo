import { ErrorBoundary } from "@/components/common/error/ErrorBoundary";
import { ReactNode } from "react";
import { Spinner } from "@/components/common/Spinner";

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
