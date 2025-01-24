import { useEffect } from "react";

interface Option {
  rootElement: Element | null;
  targetElement: Element | null;
  onIntersection: () => void;
}

export function useIntersectionObserver({
  rootElement,
  targetElement,
  onIntersection,
}: Option) {
  useEffect(() => {
    if (!rootElement || !targetElement) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersection();
        }
      },
      {
        root: rootElement,
        threshold: 0,
      }
    );

    observer.observe(targetElement);

    return () => {
      observer.unobserve(targetElement);
    };
  }, [onIntersection, rootElement, targetElement]);
}
