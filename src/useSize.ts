import { type RefCallback, useReducer, useState } from "react";

import { useResizeObserver } from "./useResizeObserver";

export type Rect = Omit<DOMRectReadOnly, "toJSON">;

export const initialRect: Rect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
};

export function useSize(): [
    RefCallback<HTMLElement>,
    Rect,
    HTMLElement | null
] {
    const [element, callbackRef] = useState<HTMLElement | null>(null);

    // By using `useReducer` instead of `useState` + `useCallback`, we get a single function that
    // is both a stable ref and typed to be the `useResizeObserver` callback, marshalling the
    // `ResizeObserverEntry` to `Rect`.
    const [rect, updateRect] = useReducer(
        (_: Rect, { contentRect }: ResizeObserverEntry) => contentRect,
        initialRect
    );

    useResizeObserver(element, updateRect);

    return [callbackRef, rect, element];
}
