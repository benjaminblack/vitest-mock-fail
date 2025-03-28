vi.mock("./useResizeObserver", () => ({ useResizeObserver: vi.fn() }));
// add a line before the above mock with any comment, even literally just `//`, to fix the error

import { renderHook } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { useResizeObserver } from "./useResizeObserver";
import { useSize } from "./useSize";

it("invokes useResizeObserver", () => {
    renderHook(() => useSize());
    expect(useResizeObserver).toHaveBeenCalled();
});
