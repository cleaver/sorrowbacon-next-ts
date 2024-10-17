import ReactMarkdown from "react-markdown";

type Props = {
  body: string;
};

function RichText({ body }: Props) {
  return (
    <section className="my-4">
      <ReactMarkdown>{body}</ReactMarkdown>
    </section>
  );
}

export default RichText;
