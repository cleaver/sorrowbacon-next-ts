/**
 * @file lib/api.ts
 *
 * API for static generation (SSG).
 *
 */
import { accessCache } from 'next-build-cache';
import { apiServer, apiKey, buildCacheFile } from '../lib/config';
import {
  ComicEntity,
  TagEntity,
  TagEntityResponseCollection,
} from '../types/types';

const url = apiServer + '/graphql';

export type PrevNextElement = {
  prev: string | null;
  next: string | null;
};

async function apiCall(query: string, variables = {}) {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });
}

/**
 * Get the comic for the front page.
 *
 * @returns comic
 */
export async function getFrontPage() {
  const comicResult = await apiCall(
    `
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
              tags {
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
      }
    `
  );
  const comicData = await comicResult.json();
  const comicArray = comicData?.data?.comics?.data;
  const comic: ComicEntity = Array.isArray(comicArray) ? comicArray[0] : {};
  return comic;
}

/**
 * Get a single comic by slug.
 *
 * @param slug The unique slug for the comic.
 * @returns comic
 */
export async function getComicBySlug(slug: string) {
  const comicResult = await apiCall(
    `
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
              tags {
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
      }
    `,
    {
      slug: slug,
    }
  );
  const comicData = await comicResult.json();
  const comicArray = comicData?.data?.comics?.data;
  const comic: ComicEntity = Array.isArray(comicArray) ? comicArray[0] : {};
  return comic;
}

/**
 * Get all the published comic slugs.
 *
 * @returns an array of all comic slugs
 */
export async function getAllSlugs() {
  const slugsResult = await apiCall(
    `
      query Slugs {
        comics(sort: "post_date:asc", pagination: {pageSize: 9999}) {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `
  );

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

/**
 * Get a map of previous and next for each published comic.
 *
 * @returns a map of previous and next for each comic.
 */
async function getPrevNextMap(): Promise<object> {
  const orderedSlugs = await getAllSlugs();
  const prevNextMap: any = {};

  orderedSlugs.forEach((slug, index) => {
    if (index === 0) {
      prevNextMap[slug] = { prev: null, next: orderedSlugs[1] };
    } else if (index >= orderedSlugs.length - 1) {
      prevNextMap[slug] = { prev: orderedSlugs[index - 1], next: null };
    } else {
      prevNextMap[slug] = {
        prev: orderedSlugs[index - 1],
        next: orderedSlugs[index + 1],
      };
    }
  });
  return prevNextMap;
}

/**
 * Get the previous and next slugs for a given comic.
 *
 * @param slug identifies the comic.
 * @returns prev and next slug for the comic.
 */
export async function getPrevNextForSlug(slug: string) {
  const cache = accessCache(buildCacheFile);

  let map: any = await cache.get('prev-next-map');

  if (!map) {
    map = await getPrevNextMap();
    console.log('new map');
    console.log(map);

    await cache.put('prev-next-map', map, 30 * 1000);
  }

  const prevNext: PrevNextElement | null = map[slug] || null;

  return prevNext;
}

/**
 * Get tag  by slug.
 *
 * @param slug The unique slug for the tag.
 * @returns tag with partially populated comics (slug and title).
 */
export async function getTagLinksBySlug(slug: string) {
  const tagResult = await apiCall(
    `
      query TagBySlug($slug: String) {
        tags(filters: { slug: { eq: $slug } }, pagination: { page: 1, pageSize: 1 }) {
          data {
            id
            attributes {
              slug
              name
              comics {
                data {
                  attributes {
                    title
                    slug
                  }
                }
              }
            }
          }
        }
      }
    `,
    {
      slug: slug,
    }
  );
  const tagData = await tagResult.json();

  const tagArray = tagData?.data?.tags?.data;
  const tag: TagEntity = Array.isArray(tagArray) ? tagArray[0] : {};
  return tag;
}

/**
 * Get an array containing all tag slugs.
 * @returns array of tag slugs
 */
export async function getAllTagSlugs() {
  const result = await apiCall(
    `
      query Tags {
        tags(pagination: {pageSize: 9999 }) {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `
  );

  const tagsJson = await result.json();
  const tagData: TagEntityResponseCollection = tagsJson?.data?.tags;
  const tagArray = tagData.data;

  if (!Array.isArray(tagArray)) {
    return [];
  }

  const slugsArray = tagArray.reduce(
    (notUndefined: string[], maybeUndefinedTag) => {
      if (!!maybeUndefinedTag.attributes?.slug) {
        notUndefined.push(maybeUndefinedTag.attributes?.slug);
      }
      return notUndefined;
    },
    []
  );

  return slugsArray;
}

export async function getAbout() {
  const result = await apiCall(
    `
      query About {
        about {
          data {
            id
            attributes {
              title
              blocks {
                __typename
                ...on ComponentSharedQuote {
                  title
                  body
                }
                ...on ComponentSharedRichText {
                  body
                }
                ...on ComponentSharedMedia {
                  file {
                    data {
                      id
                      attributes{
                        name
                        alternativeText
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  );

  const aboutJson = await result.json();
  const about = aboutJson.data?.about;
  return about;
}
