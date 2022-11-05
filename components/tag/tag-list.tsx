import Link from 'next/link';
import { TagRelationResponseCollection } from '../../types/types';

type Props = {
  tags: TagRelationResponseCollection | null | undefined;
};

function TagList({ tags }: Props) {
  if (!tags || tags.data.length === 0) {
    return null;
  }
  return (
    <div className="flex">
      <div className="flex-shrink font-bold">Tags:</div>
      <div className="flex-grow">
        <ul className="list-none m-0">
          {tags.data.map((tag) => {
            const slug = tag.attributes?.slug;
            const name = tag.attributes?.name;

            return (
              <li className="mt-0 mb-3" key={slug}>
                <Link
                  href={`/tags/${slug}`}
                  className="no-underline hover:underline active:underline"
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default TagList;
