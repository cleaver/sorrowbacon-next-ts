import { ReactNode } from "react";
import { AboutBlocksDynamicZone, Maybe } from "../../types/types";
import ComponentSharedMedia from "./media";
import ComponentSharedQuote from "./quote";
import ComponentSharedRichText from "./rich-text";

type Props = {
  blocks: Array<Maybe<AboutBlocksDynamicZone>>;
};

function DynamicContent({ blocks }: Props) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  let dynamicBlocks: ReactNode[] = [];
  blocks.map((block, index) => {
    switch (block?.__typename) {
      case "ComponentSharedRichText":
        dynamicBlocks.push(
          <ComponentSharedRichText block={block} key={index} />,
        );
        break;

      case "ComponentSharedQuote":
        dynamicBlocks.push(<ComponentSharedQuote block={block} key={index} />);
        break;

      case "ComponentSharedMedia":
        dynamicBlocks.push(<ComponentSharedMedia block={block} key={index} />);
        break;

      default:
        break;
    }
  });
  if (dynamicBlocks.length === 0) {
    dynamicBlocks = [<></>];
  }

  return <div>{dynamicBlocks}</div>;
}

export default DynamicContent;
