import Image from "next/image";
import Link from "next/link";
import nextImg from "../../public/menu/next-arrow.png";
import prevImg from "../../public/menu/prev-arrow.png";
import { PrevNextElement } from "../../types/types";

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
              <Image
                src={prevImg}
                width={100}
                height={40}
                alt="Previous comic"
                className="h-8 w-auto hover:skew-x-6 hover:-translate-x-1 transition-transform"
              />
            </Link>
          )}
        </li>

        <li className="p-0 w-12">
          {prevNext.next && (
            <Link
              href={`/comic/${prevNext.next}`}
              className="font-bold active:underline hover:underline"
            >
              <Image
                src={nextImg}
                width={100}
                height={40}
                alt="Previous comic"
                className="h-8 w-auto hover:-skew-x-6 hover:translate-x-1 transition-transform"
              />
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PrevNextNav;
