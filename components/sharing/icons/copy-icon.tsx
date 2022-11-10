function CopyIcon() {
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
      style={svgStyle}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        fill="none"
        points="216 184 216 40 72 40"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
      />
      <rect
        fill="none"
        height="144"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="12"
        width="144"
        x="40"
        y="72"
      />
    </svg>
  );
}

export default CopyIcon;
