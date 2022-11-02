import Link from 'next/link';
import { PrevNextElement } from '../../lib/api';

type Props = {
  prevNext: PrevNextElement;
};

function PrevNextNav({ prevNext }: Props) {
  return (
    <nav className="flex">
      <ul>
        {prevNext.prev && (
          <li>
            <Link href={`/comic/${prevNext.prev}`}>Prev</Link>
          </li>
        )}
        {prevNext.next && (
          <li>
            <Link href={`/comic/${prevNext.next}`}>Next</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default PrevNextNav;
