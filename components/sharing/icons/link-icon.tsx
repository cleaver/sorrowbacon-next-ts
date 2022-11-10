function LinkIcon() {
  const svgStyle = {
    fill: 'none',
    stroke: '#606060',
    strokeMiterlimit: '10',
    strokeWidth: '16',
    height: '24px',
    width: '24px',
  };

  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      style={svgStyle}
    >
      <path d="M122.3,71.4l19.8-19.8a44.1,44.1,0,0,1,62.3,62.3l-28.3,28.2a43.9,43.9,0,0,1-62.2,0" />
      <path d="M133.7,184.6l-19.8,19.8a44.1,44.1,0,0,1-62.3-62.3l28.3-28.2a43.9,43.9,0,0,1,62.2,0" />
    </svg>
  );
}

export default LinkIcon;
