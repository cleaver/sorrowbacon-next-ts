import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { title } from 'process';
import { getAllTagSlugs, getTagLinksBySlug } from '../../lib/api';
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
    slug: comic.attributes?.slug,
    title: comic.attributes?.title,
  }));

  return (
    <ul>
      {linkList.map(({ slug, title }) => (
        <li key={slug}>
          <Link href={`/comic/${slug}`}>{title}</Link>
        </li>
      ))}
    </ul>
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
  };
}

export async function getStaticPaths(ctx: GetStaticPathsContext) {
  const slugs = await getAllTagSlugs();
  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug: slug,
        },
      };
    }),
    fallback: false,
  };
}

export default TagPage;
