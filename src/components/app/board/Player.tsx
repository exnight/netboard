import React, { useEffect, useRef } from 'react';

import { makeDraggable } from './util/helper';

const svgDim = 48;
const svgWidth = svgDim;
const svgHeight = svgDim;

interface Props {
  pos: string;
  circleColor: string;
  textColor: string;
}

const Player: React.FC<Props> = (props) => {
  const { pos, circleColor, textColor } = props;

  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    makeDraggable(ref);
    return () => {
      // cleanup
    };
  }, []);

  return (
    <svg width={svgWidth} height={svgHeight} textAnchor="middle" ref={ref}>
      <circle
        cx={svgWidth / 2}
        cy={svgHeight / 2}
        r={svgDim / 2.5}
        className={`fill-current ${circleColor}`}
      />
      <text
        x={svgWidth / 2}
        y={svgHeight * 0.6}
        strokeWidth="14px"
        className={`fill-current ${textColor}`}
      >
        {pos}
      </text>
    </svg>
  );
};

export default Player;
