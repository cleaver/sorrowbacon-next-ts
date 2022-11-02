import { ComicEntity } from '../types/types';
import ComicList from '../components/comic/comic-list';
import { getFrontPage, getPrevNextForSlug, PrevNextElement } from '../lib/api';
import PrevNextNav from '../components/comic/prev-next-nav';

type Props = {
  comic: ComicEntity;
  prevNext: PrevNextElement;
};

function HomePage({ comic, prevNext }: Props) {
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

export async function getStaticProps() {
  const comic = await getFrontPage();
  const slug = comic?.attributes?.slug || '';
  const prevNext = await getPrevNextForSlug(slug);

  return {
    props: {
      comic: comic,
      prevNext: prevNext,
    },
  };
}

export default HomePage;
