import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import { ComicEntity } from '../../types/types';
import {
  getAllSlugs,
  getComicBySlug,
  getPrevNextForSlug,
  PrevNextElement,
} from '../../lib/api';
import ComicList from '../../components/comic/comic-list';
import PrevNextNav from '../../components/comic/prev-next-nav';

type Props = {
  comic: ComicEntity;
  prevNext: PrevNextElement;
};

function ComicPage({ comic, prevNext }: Props) {
  const imageData = comic?.attributes?.image.data;

  if (!Array.isArray(imageData)) {
    return <article></article>;
  }

  return (
    <article>
      <div>
        <PrevNextNav prevNext={prevNext} />

        <ComicList
          images={comic?.attributes?.image.data}
          imageAltText={comic?.attributes?.image_alt_text || ''}
        />
        <h1>{comic?.attributes?.title}</h1>
      </div>
    </article>
  );
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
  };
}

export async function getStaticPaths(ctx: GetStaticPathsContext) {
  const slugs = await getAllSlugs();
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

export default ComicPage;
