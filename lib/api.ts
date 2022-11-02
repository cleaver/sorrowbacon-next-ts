import { apiServer, apiKey } from '../lib/config';

export async function getFrontPage() {
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
  return Array.isArray(comicArray) ? comicArray[0] : {};
}
