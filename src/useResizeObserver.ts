import { useEffect } from "react";

export const multipleObserversUnsupportedMessage =
    "Multiple observers per element not supported";

const callbacks = new Map<Element, (entry: ResizeObserverEntry) => void>();

const observer = new ResizeObserver((entries) =>
    entries.forEach((entry) => callbacks.get(entry.target)?.(entry))
);

export function useResizeObserver(
    element: Element | null,
    callback: (entry: ResizeObserverEntry) => void
) {
    useEffect(() => {
        if (element === null) return;
        callbacks.set(element, (entry) => callback(entry));
        observer.observe(element);
        return () => {
            observer.unobserve(element);
            callbacks.delete(element);
        };
    }, [callback, element]);
}
