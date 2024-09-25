import Image from "next/image";
import { apiServer } from "../../lib/config";
import { ComponentSharedMedia } from "../../types/types";

type Props = {
  block: ComponentSharedMedia;
};

function Media({ block }: Props) {
  const fileAttributes = block.file?.data?.attributes;
  const imageUrl = fileAttributes?.url || "";
  const url = `${apiServer}${imageUrl}`;
  const imageAltText = fileAttributes?.alternativeText || "";

  return (
    <section className="my-4">
      <Image
        src={url}
        alt={imageAltText}
        width={512}
        height={512}
        className="max-w-lg"
      />
    </section>
  );
}

export default Media;
