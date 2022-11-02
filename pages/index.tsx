import { ComicEntity } from '../types/types';
import ComicList from '../components/comic/comic-list';
import { getFrontPage } from '../lib/api';

type Props = {
  comic: ComicEntity;
};

const HomePage = ({ comic }: Props) => {
  const imageData = comic?.attributes?.image.data;

  if (!Array.isArray(imageData)) {
    return <article></article>;
  }

  return (
    <article>
      <div>
        <ComicList
          images={comic?.attributes?.image.data}
          imageAltText={comic?.attributes?.image_alt_text || ''}
        />
        <h1>{comic?.attributes?.title}</h1>
      </div>
    </article>
  );
};

export async function getStaticProps() {
  const comic = await getFrontPage();

  return {
    props: {
      comic: comic,
    },
  };
}

export default HomePage;
