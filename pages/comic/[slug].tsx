import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import { ComicEntity } from '../../types/types';
import {
  getAllSlugs,
  getComicBySlug,
  getPrevNextForSlug,
  PrevNextElement,
} from '../../lib/api';
import ComicSection from '../../components/comic/comic-section';
import { revalidateInterval } from '../../lib/config';

type Props = {
  comic: ComicEntity;
  prevNext: PrevNextElement;
};

function ComicPage({ comic, prevNext }: Props) {
  return <ComicSection comic={comic} prevNext={prevNext} />;
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  const slugParam = ctx?.params?.slug;

  if (!slugParam) {
    return;
  }

  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  const prevNext = await getPrevNextForSlug(slug);
  const comic = await getComicBySlug(slug);

  return {
    props: {
      comic: comic,
      prevNext: prevNext,
    },
    revalidate: revalidateInterval,
  };
}

export async function getStaticPaths() {
  const slugs = await getAllSlugs();
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

export default ComicPage;
