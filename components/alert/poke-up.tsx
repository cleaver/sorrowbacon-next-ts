import { ReactElement } from 'react';

type Props = {
  children: ReactElement;
};

function PokeUp({ children }: Props) {
  return { children };
}

export default PokeUp;
