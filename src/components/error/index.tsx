import Router from "next/router";
import { useEffect } from "react";

const defaultRetry = () => {
  Router.reload();
};

export function ErrorComponent({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary?: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "test") {
      console.error(error);
    }
  }, [error]);

  return (
    <div role="alert" className="alert-error alert">
      <p>Something went wrong</p>
      <button
        className="btn btn-primary"
        onClick={resetErrorBoundary || defaultRetry}
      >
        Try again
      </button>
    </div>
  );
}
