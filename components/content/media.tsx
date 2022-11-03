import { ComponentSharedMedia } from '../../types/types';
import { imageServer } from '../../lib/config';
import Image from 'next/image';

type Props = {
  block: ComponentSharedMedia;
};

function Media({ block }: Props) {
  const fileAttributes = block.file?.data?.attributes;
  const imageUrl = `${imageServer}${fileAttributes?.url}`;
  const imageAltText = fileAttributes?.alternativeText || '';

  return (
    <div className="my-4">
      <Image src={imageUrl} alt={imageAltText} width={1000} height={1000} />
    </div>
  );
}

export default Media;
