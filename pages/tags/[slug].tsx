import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { getAllTagSlugs, getTagLinksBySlug } from '../../lib/api';
import { revalidateInterval } from '../../lib/config';
import { TagEntity } from '../../types/types';

type Props = {
  tag: TagEntity;
};

function TagPage({ tag }: Props) {
  const comicList = tag?.attributes?.comics?.data;

  if (!Array.isArray(comicList)) {
    return;
  }

  const linkList = comicList.map((comic) => ({
    slug: comic?.attributes?.slug,
    title: comic?.attributes?.title,
  }));

  return (
    <article>
      <h1 className="mt-12">
        Comics Tagged &quot;{tag?.attributes?.name}&quot;{' '}
      </h1>
      <ul>
        {linkList.map(({ slug, title }) => (
          <li key={slug}>
            <Link
              href={`/comic/${slug}`}
              className="no-underline active:underline hover:underline text-xl"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const slugParam = ctx.params?.slug;

  if (!slugParam) {
    return;
  }

  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  const tag = await getTagLinksBySlug(slug);

  return {
    props: {
      tag: tag,
    },
    revalidate: revalidateInterval,
  };
}

export async function getStaticPaths(_ctx: GetStaticPathsContext) {
  const slugs = await getAllTagSlugs();
  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug: slug,
        },
      };
    }),
    fallback: 'blocking',
  };
}

export default TagPage;
