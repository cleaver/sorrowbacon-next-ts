import DynamicContent from '../components/content/dynamic-content';
import { getAbout } from '../lib/api';
import { AboutEntityResponse } from '../types/types';

type Props = {
  about: AboutEntityResponse;
};

function AboutPage({ about }: Props) {
  const title = about.data?.attributes?.title;
  const maybeBlocksArray = about.data?.attributes?.blocks;
  const blocks = Array.isArray(maybeBlocksArray) ? maybeBlocksArray : [];

  console.log('about: ', about);
  console.log('title: ', title);

  return (
    <article>
      <h1>{title}</h1>
      <DynamicContent blocks={blocks} />
    </article>
  );
}

export async function getStaticProps() {
  const about = await getAbout();

  return {
    props: { about },
  };
}

export default AboutPage;
