import { ComicEntity } from '../types/types';
import { getFrontPage, getPrevNextForSlug, PrevNextElement } from '../lib/api';
import ComicSection from '../components/comic/comic-section';

type Props = {
  comic: ComicEntity;
  prevNext: PrevNextElement;
};

function HomePage({ comic, prevNext }: Props) {
  return <ComicSection comic={comic} prevNext={prevNext} />;
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
    revalidate: 5,
  };
}

export default HomePage;
