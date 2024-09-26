import Link from "next/link";
import { JjComicCollection } from "../../types/types";

type Props = {
  comics: JjComicCollection;
};

function ArchiveList({ comics }: Props) {
  if (!comics || !Array.isArray(comics)) {
    return null;
  }

  return (
    <section>
      <ul>
        {comics.map((comic) => (
          <li key={comic.slug}>
            <Link
              href={`/comic/${comic.slug}`}
              className="no-underline active:underline hover:underline text-xl"
            >
              {comic.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ArchiveList;
