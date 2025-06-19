import { useEffect, useRef } from "react";

export function useScrollLock(isLocked: boolean) {
  // Store the scroll position in a ref to maintain it across renders
  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    if (!isLocked) return;

    // Calculate scrollbar width to add padding and prevent layout shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // Save initial scroll position when locking
    scrollYRef.current = window.scrollY;

    // Save original padding to restore later
    const originalPaddingRight = document.body.style.paddingRight;

    // Apply fixed position to body while preserving scrollbar
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.width = "100%";
    document.body.style.paddingRight = `${scrollbarWidth}px`; // Add padding equal to scrollbar width

    // Prevent various events that could cause scrolling
    const preventDefault = (e: Event) => {
      // Allow scrolling within elements inside the modal
      if (
        e.target &&
        e.target instanceof Element &&
        (e.target.closest(".modal-content") ||
          e.target.classList.contains("modal-content"))
      ) {
        return;
      }
      e.preventDefault();
    };

    // These are the events that could potentially scroll the page
    const wheelOpt = { passive: false };
    window.addEventListener("wheel", preventDefault, wheelOpt);
    window.addEventListener("touchmove", preventDefault, wheelOpt);

    // Handle keyboard scrolling
    const preventDefaultForScrollKeys = (e: KeyboardEvent) => {
      const keys = {
        ArrowUp: 1,
        ArrowDown: 1,
        ArrowLeft: 1,
        ArrowRight: 1,
        " ": 1,
        PageUp: 1,
        PageDown: 1,
        Home: 1,
        End: 1,
      };

      if (keys[e.key as keyof typeof keys]) {
        preventDefault(e);
        return false;
      }
    };
    window.addEventListener("keydown", preventDefaultForScrollKeys);

    return () => {
      // Clean up event listeners
      window.removeEventListener(
        "wheel",
        preventDefault,
        wheelOpt as EventListenerOptions
      );
      window.removeEventListener(
        "touchmove",
        preventDefault,
        wheelOpt as EventListenerOptions
      );
      window.removeEventListener("keydown", preventDefaultForScrollKeys);

      // Reset body styles
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.paddingRight = originalPaddingRight;

      // Restore scroll position
      window.scrollTo(0, scrollYRef.current);
    };
  }, [isLocked]);
}
