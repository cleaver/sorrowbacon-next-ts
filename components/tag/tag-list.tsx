import Link from "next/link";
import { JjTagCollection } from "../../types/jj_types";

type Props = {
  tags: JjTagCollection;
};

function TagList({ tags }: Props) {
  if (tags.length === 0) {
    return null;
  }
  return (
    <div className="flex">
      <div className="flex-shrink font-bold">Tags:</div>
      <div className="flex-grow">
        <ul className="list-none m-0">
          {tags.map((tag) => {
            const slug = tag.slug;
            const name = tag.name;

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
