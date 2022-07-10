import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { SimplePokemon } from "@/types/SimplePokemon";
import Link from "next/link";
import { ReactNode } from "react";
import { Spinner } from "../Spinner";
import { SpriteWithName } from "../sprite-with-name/SpriteWithName";

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
