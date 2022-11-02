import { ComicEntity } from '../types/types';
import { apiServer } from '../lib/config';
import ComicList from '../components/comic/comic-list';

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
  const url = apiServer + '/graphql';
  const apiKey = process.env.API_KEY;

  const comicResult = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `
      {
        comics(sort: "post_date:desc", pagination: {page:1, pageSize: 1}) {
          data {
            id
            attributes {
              title
              body
              slug
              post_date
              meta_description
              image_alt_text
              image {
                data {
                  attributes {
                    name
                    url
                  }
                }
              }
              tag {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
            }
          }
        }
      }`,
      variables: {
        Authorization: `Bearer ${apiKey}`,
      },
    }),
  });
  const comicData = await comicResult.json();
  const comicArray = comicData?.data?.comics?.data;
  const comic = Array.isArray(comicArray) ? comicArray[0] : {};

  return {
    props: {
      comic: comic,
    },
  };
}

export default HomePage;
