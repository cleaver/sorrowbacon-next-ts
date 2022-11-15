import Link from 'next/link';
import { ComicEntity, Maybe } from '../../types/types';

type Props = {
  comics: Array<ComicEntity>;
};

function ArchiveList({ comics }: Props) {
  if (!comics || !Array.isArray(comics)) {
    return null;
  }

  return (
    <section>
      <ul>
        {comics.map((comic) => (
          <li key={comic.attributes?.slug}>
            <Link
              href={`/comic/${comic.attributes?.slug}`}
              className="no-underline active:underline hover:underline text-xl"
            >
              {comic?.attributes?.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ArchiveList;
