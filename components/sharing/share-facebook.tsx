import FacebookIcon from "./icons/facebook-icon";

type Props = {
  url: string;
};

function ShareFacebook({ url }: Props) {
  return (
    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
      target="_blank"
      rel="noreferrer"
      title="Share to Facebook"
    >
      <FacebookIcon />
    </a>
  );
}

export default ShareFacebook;
