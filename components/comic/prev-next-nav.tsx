import Link from 'next/link';
import { PrevNextElement } from '../../lib/api';

type Props = {
  prevNext: PrevNextElement;
};

function PrevNextNav({ prevNext }: Props) {
  return (
    <nav className="flex not-prose">
      <ul className="flex list-none gap-40 m-auto p-0 mt-6">
        <li className="p-0 w-12">
          {prevNext.prev && (
            <Link
              href={`/comic/${prevNext.prev}`}
              className="font-bold active:underline hover:underline"
            >
              Prev
            </Link>
          )}
        </li>

        <li className="p-0 w-12">
          {prevNext.next && (
            <Link
              href={`/comic/${prevNext.next}`}
              className="font-bold active:underline hover:underline"
            >
              Next
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PrevNextNav;
