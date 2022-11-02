import { apiServer, apiKey } from '../lib/config';
import { ComicEntity } from '../types/types';

const url = apiServer + '/graphql';

export type PrevNextElement = {
  prev: string | null;
  next: string | null;
};

export async function getFrontPage() {
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
  const comic: ComicEntity = Array.isArray(comicArray) ? comicArray[0] : {};
  return comic;
}

export async function getComicBySlug(slug: string) {
  const comicResult = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `
        query ComicBySlug($slug: String) {
          comics(
            filters: { slug: { eq: $slug } }
            pagination: { page: 1, pageSize: 1 }
          ) {
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
        slug: slug,
      },
    }),
  });
  const comicData = await comicResult.json();
  const comicArray = comicData?.data?.comics?.data;
  const comic: ComicEntity = Array.isArray(comicArray) ? comicArray[0] : {};
  return comic;
}

export async function getAllSlugs() {
  const slugsResult = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `
      query Slugs {
        comics(sort: "post_date:asc", pagination: {pageSize: 9999}) {
          data {
            attributes {
              slug
            }
          }
        }
      }`,
      variables: {
        Authorization: `Bearer ${apiKey}`,
      },
    }),
  });

  const slugsData = await slugsResult.json();
  const dataArray = slugsData?.data?.comics?.data;

  if (!Array.isArray(dataArray)) {
    return [];
  }
  const slugsArray: string[] = dataArray.map(
    (comic) => comic?.attributes?.slug
  );
  return slugsArray;
}

async function getPrevNextMap() {
  const orderedSlugs = await getAllSlugs();
  const prevNextMap = new Map<string, PrevNextElement>();

  orderedSlugs.forEach((slug, index) => {
    if (index === 0) {
      prevNextMap.set(slug, { prev: null, next: orderedSlugs[1] });
    } else if (index >= orderedSlugs.length - 1) {
      prevNextMap.set(slug, { prev: orderedSlugs[index - 1], next: null });
    } else {
      prevNextMap.set(slug, {
        prev: orderedSlugs[index - 1],
        next: orderedSlugs[index + 1],
      });
    }
  });
  return prevNextMap;
}

export async function getPrevNextForSlug(slug: string) {
  return (await getPrevNextMap()).get(slug);
}
