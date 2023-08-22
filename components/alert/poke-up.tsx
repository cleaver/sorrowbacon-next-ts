import { ReactNode, useEffect, useRef, useState } from 'react';
import { useWindowPosition } from '../../hooks/useWindowPosition';

const INITIAL_WAIT_TIME = 1000 * 10;
const MAX_WAIT_TIME = 1000 * 60 * 10;
const DISPLAY_TIME = 1000 * 10;

type Props = {
  children: ReactNode;
};

function PokeUp({ children }: Props) {
  const size = useWindowPosition();
  const [displayPokeUp, setDisplayPokeUp] = useState(false);

  function showPokeUp(msTime: number) {
    msTime = increaseWaitTime(msTime);
    setDisplayPokeUp(true);
    setTimeout(hidePokeUp, DISPLAY_TIME);
    setTimeout(() => {
      showPokeUp(msTime);
    }, msTime);
  }

  function hidePokeUp() {
    setDisplayPokeUp(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      showPokeUp(INITIAL_WAIT_TIME);
    }, INITIAL_WAIT_TIME);
    console.log('useEffect');
    return () => clearTimeout(timer);
  }, []);

  const pokeRef = useRef<HTMLDivElement | null>(null);
  // const screenBottom = size.height + size.scrollY;
  const screenBottom = size.height;
  let pokeTop = screenBottom;
  if (displayPokeUp) {
    pokeTop = screenBottom - pokeRef.current?.offsetHeight! + 16;
  }

  return (
    <div
      className="fixed border-t-2 border-l-2 border-r-2 border-gray-600 rounded-t bg-white pt-4 pb-8 px-6"
      style={{
        top: pokeTop,
        right: 40,
        transitionProperty: 'top',
        transitionDuration: '420ms',
        transitionTimingFunction: 'cubic-bezier(.68,-0.55,.27,1.55)',
      }}
      ref={pokeRef}
    >
      {children}
    </div>
  );
}

export default PokeUp;

function increaseWaitTime(time: number) {
  if (time >= MAX_WAIT_TIME) return time;

  return time * 1.5 + INITIAL_WAIT_TIME;
}
