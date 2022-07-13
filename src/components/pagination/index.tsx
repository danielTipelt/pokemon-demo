import { createContext, ReactNode, useContext } from "react";
import classnames from "classnames";

const context = createContext({ onPrev(): void {}, onNext(): void {} });

export function Pagination(props: {
  children: ReactNode;
  className?: string;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
  total: number;
}) {
  const { limit, setOffset, total, children, className } = props;
  return (
    <context.Provider
      value={{
        onPrev: () => {
          setOffset((offset) => Math.max(offset - limit, 0));
        },
        onNext: () => {
          setOffset((offset) => Math.min(offset + limit, total));
        },
      }}
    >
      <div
        className={classnames(`flex gap-4 mt-8`, className)}
        data-testid="pagination"
      >
        {children}
      </div>
    </context.Provider>
  );
}

Pagination.PrevButton = PrevButton;
Pagination.NextButton = NextButton;

function PrevButton(props: { className?: string }) {
  const { onPrev } = useContext(context);
  return (
    <button
      className={classnames(`btn btn-secondary`, props.className)}
      title="Load previous page"
      type="button"
      onClick={onPrev}
    >
      {"<"}
    </button>
  );
}
function NextButton(props: { className?: string }) {
  const { onNext } = useContext(context);
  return (
    <button
      className={classnames(`btn btn-secondary`, props.className)}
      title="Load next page"
      type="button"
      onClick={onNext}
    >
      {">"}
    </button>
  );
}
