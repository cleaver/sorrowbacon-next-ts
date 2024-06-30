import React, { useEffect, useRef, useState } from 'react';
import CopyIcon from './icons/copy-icon';
import LinkIcon from './icons/link-icon';

type Props = {
  text: string;
};

function CopyClipboard({ text }: Props) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const linkRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setShow(false);
  }, [text]);

  const openHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setShow(!show);
    linkRef.current?.select();
  };

  const linkClickHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
    linkRef.current?.select();
  };

  const copyClickHandler = (_event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const linkClasses = ['flex', 'flex-row'];
  if (!show) {
    linkClasses.push('hidden');
  }

  return (
    <>
      <button onClick={openHandler} title="Share link">
        <LinkIcon />
      </button>

      <div className={linkClasses.join(' ')}>
        <input
          type="text"
          name="link"
          id="link"
          className="border border-gray-300"
          value={text}
          ref={linkRef}
          onClick={linkClickHandler}
          readOnly={true}
        />

        <button onClick={copyClickHandler} className="pl-2">
          <CopyIcon />
        </button>
      </div>
      {copied && (
        <div className="px-2 bg-gray-700 text-white rounded">Copied!</div>
      )}
    </>
  );
}

export default CopyClipboard;
