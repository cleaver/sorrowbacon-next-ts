import { ImageEntity } from "../../types/types";
import Comic from "./comic";

type Props = {
  images: ImageEntity[];
  imageAltText: string;
};

function ComicList({ images, imageAltText }: Props) {
  return (
    <div className="not-prose ">
      {images.map((image) => (
        <Comic
          image={image}
          imageAltText={imageAltText}
          key={image.id.toString()}
        />
      ))}
    </div>
  );
}

export default ComicList;
