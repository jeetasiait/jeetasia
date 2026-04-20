import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    // First, try to scroll immediately
    window.scrollTo(0, 0);
    
    // Then use requestAnimationFrame for a more reliable scroll after DOM updates
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: 'instant' // Instant scroll to top
      });
      
      // Add a small delay as a fallback to ensure scroll happens
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    });
  }, [location.pathname, location.search]); // React to both path and query changes

  return null;
}
