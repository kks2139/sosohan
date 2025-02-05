import { useEffect } from "react";

interface Option {
  rootElement: Element | null;
  targetElement: Element | null;
  threshold?: number;
  onIntersection?: () => void;
  onOutOfView?: () => void;
}

export function useIntersectionObserver({
  rootElement,
  targetElement,
  threshold = 0,
  onIntersection,
  onOutOfView,
}: Option) {
  useEffect(() => {
    if (!rootElement || !targetElement) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersection?.();
        } else {
          onOutOfView?.();
        }
      },
      {
        root: rootElement,
        threshold,
      }
    );

    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
    };
  }, [onIntersection, onOutOfView, rootElement, targetElement, threshold]);
}
