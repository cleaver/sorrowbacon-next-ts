import { AboutBlocksDynamicZone, Maybe } from '../../types/types';
import ComponentSharedRichText from './rich-text';
import ComponentSharedMedia from './media';
import ComponentSharedQuote from './quote';

type Props = {
  blocks: Array<Maybe<AboutBlocksDynamicZone>>;
};

function DynamicContent({ blocks }: Props) {
  if (!blocks || !Array.isArray(blocks)) {
    return <></>;
  }

  let dynamicBlocks = [<></>];
  blocks.map((block, index) => {
    switch (block?.__typename) {
      case 'ComponentSharedRichText':
        dynamicBlocks.push(
          <ComponentSharedRichText block={block} key={index} />
        );
        break;

      case 'ComponentSharedQuote':
        dynamicBlocks.push(<ComponentSharedQuote block={block} key={index} />);
        break;

      case 'ComponentSharedMedia':
        dynamicBlocks.push(<ComponentSharedMedia block={block} key={index} />);
        break;

      default:
        break;
    }
  });

  return <div>{dynamicBlocks}</div>;
}

export default DynamicContent;
