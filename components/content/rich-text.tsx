import ReactMarkdown from "react-markdown";
import { ComponentSharedRichText } from "../../types/types";

type Props = {
  block: ComponentSharedRichText;
};

function RichText({ block }: Props) {
  return (
    <section className="my-4">
      <ReactMarkdown>{block.body || ""}</ReactMarkdown>
    </section>
  );
}

export default RichText;
