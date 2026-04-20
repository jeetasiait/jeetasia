import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollRestoration() {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      window.scrollTo(0, 0);
    };

    // Scroll to top when route changes
    handleScroll();

    // Add event listener for when the route changes
    window.addEventListener('popstate', handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener('popstate', handleScroll);
    };
  }, [location]);
}
