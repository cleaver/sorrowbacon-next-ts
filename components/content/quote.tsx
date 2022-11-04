import ReactMarkdown from 'react-markdown';
import { ComponentSharedQuote } from '../../types/types';

type Props = {
  block: ComponentSharedQuote;
};

function Quote({ block }: Props) {
  return (
    <section className="my-4">
      <div className="pl-8 border-l-4 border-gray-200">
        <ReactMarkdown>{block.body || ''}</ReactMarkdown>
      </div>
      <p className="pl-8 italic">{block.title}</p>
    </section>
  );
}

export default Quote;
