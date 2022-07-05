import { useEffect } from "react";

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
    <div role="alert" className="text-red-500">
      <p>Something went wrong</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
