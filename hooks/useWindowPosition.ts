import { useEffect, useState } from 'react';

export function useWindowPosition() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    scrollY: 0,
  });

  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      scrollY: window.scrollY,
    });
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, []);

  return windowSize;
}
