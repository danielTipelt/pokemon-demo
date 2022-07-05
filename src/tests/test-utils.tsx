import React, { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { SWRConfig } from "swr";
import userEvent from "@testing-library/user-event";

const Wrapper = (props: { children: ReactNode }) => {
  return (
    <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
      {props.children}
    </SWRConfig>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) => ({
  user: userEvent.setup(),
  ...render(ui, { wrapper: Wrapper, ...options }),
});

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
