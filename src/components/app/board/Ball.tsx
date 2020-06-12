import React, { useEffect, useRef, useState } from 'react';

import {
  makeDraggable,
  COOR_PREFIX,
  getCoorFromLocalStorage,
  updateCoor,
} from './util/helper';

const svgDim = 24;
const svgWidth = svgDim;
const svgHeight = svgDim;

const Ball: React.FC = () => {
  const id = 'ball';

  const ref = useRef<SVGSVGElement>(null);
  const [x, y] = getCoorFromLocalStorage(`${COOR_PREFIX}${id}`);
  const [ballCoor, setBallCoor] = useState<[number, number]>([x, y]);

  useEffect(() => {
    makeDraggable(id, ref, ballCoor, setBallCoor);
    updateCoor(id, ref, ballCoor);
  }, [ballCoor]);

  return (
    <>
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

      <button
        type="button"
        onClick={() => {
          setBallCoor([0, 0]);
        }}
      >
        Reset Pos
      </button>
    </>
  );
};

export default Ball;
