import { useEffect } from "react";

export function useScrollLock(isLocked: boolean) {
    useEffect(() => {
      if (!isLocked) return;
      
      // Save initial body style and scroll position
      const originalStyle = window.getComputedStyle(document.body);
      const scrollY = window.scrollY;
      
      // Prevent scrolling while maintaining scrollbar visibility
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.bottom = '0';
      // Don't set overflow - this keeps the scrollbar visible
      
      // Prevent various events that could cause scrolling
      const preventDefault = (e: Event) => {
        // Allow scrolling within elements inside the modal
        if (e.target && 
            e.target instanceof Element && 
            (e.target.closest('.modal-content') || 
             e.target.classList.contains('modal-content'))) {
          return;
        }
        e.preventDefault();
      };
      
      // These are the events that could potentially scroll the page
      const wheelOpt = { passive: false };
      window.addEventListener('wheel', preventDefault, wheelOpt);
      window.addEventListener('touchmove', preventDefault, wheelOpt);
      
      // Handle keyboard scrolling
      const preventDefaultForScrollKeys = (e: KeyboardEvent) => {
        const keys = { 
          ArrowUp: 1, ArrowDown: 1, ArrowLeft: 1, ArrowRight: 1,
          ' ': 1, PageUp: 1, PageDown: 1, Home: 1, End: 1
        };
        
        if (keys[e.key as keyof typeof keys]) {
          preventDefault(e);
          return false;
        }
      };
      window.addEventListener('keydown', preventDefaultForScrollKeys);
      
      return () => {
        // Clean up and restore original position
        window.removeEventListener('wheel', preventDefault, wheelOpt as EventListenerOptions);
        window.removeEventListener('touchmove', preventDefault, wheelOpt as EventListenerOptions);
        window.removeEventListener('keydown', preventDefaultForScrollKeys);
        
        // Restore body style
        document.body.style.position = originalStyle.position;
        document.body.style.top = originalStyle.top;
        document.body.style.left = originalStyle.left;
        document.body.style.right = originalStyle.right;
        document.body.style.bottom = originalStyle.bottom;
        
        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }, [isLocked]);
  }