import React, { useContext, useEffect, useRef } from 'react';

import { makeDraggable, updateCoor, resetCoor } from './util/helper';
import { CoorContext } from './util/CoorContext';

const svgDim = 24;
const svgWidth = svgDim;
const svgHeight = svgDim;

const Ball: React.FC = () => {
  const id = 'ball';

  const ref = useRef<SVGSVGElement>(null);
  const { coorState, setCoorState } = useContext(CoorContext);
  const currState = coorState[id];

  useEffect(() => {
    makeDraggable(id, ref, currState, setCoorState);
    updateCoor(ref, currState);
  }, [id, currState, setCoorState]);

  return (
    <svg
      width={svgWidth}
      height={svgHeight}
      ref={ref}
      onDoubleClick={() => resetCoor(id, setCoorState)}
    >
      <circle
        cx={svgWidth / 2}
        cy={svgHeight / 2}
        r={svgDim / 3}
        className="fill-current text-gray-300"
      />
      <circle
        cx={svgWidth / 2}
        cy={svgHeight / 2}
        r={svgDim / 3}
        strokeWidth="3"
        fill="none"
        className="stroke-current text-gray-600"
      />
      <title>Ball</title>
    </svg>
  );
};

export default Ball;
