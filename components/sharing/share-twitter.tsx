import TwitterIcon from './icons/twitter-icon';

type Props = {
  url: string;
};

function ShareTwitter({ url }: Props) {
  return (
    <a
      href={`https://twitter.com/intent/tweet?text=${url}`}
      target="_blank"
      rel="noreferrer"
      title="Share to Twitter"
    >
      <TwitterIcon />
    </a>
  );
}

export default ShareTwitter;
