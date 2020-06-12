import React, { useEffect, useRef } from 'react';

import { makeDraggable, setPositions } from './util/helper';

const svgDim = 16;
const svgWidth = svgDim;
const svgHeight = svgDim;

const Player: React.FC = () => {
  const id = 'ball';

  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    setPositions(ref, id);
    makeDraggable(ref, id);
  }, [id]);

  return (
    <svg width={svgWidth} height={svgHeight} ref={ref}>
      <circle
        cx={svgWidth / 2}
        cy={svgHeight / 2}
        r={svgDim / 2.5}
        className="fill-current text-white"
      />
      <circle
        cx={svgWidth / 2}
        cy={svgHeight / 2}
        r={svgDim / 2.5}
        stroke="black"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export default Player;
