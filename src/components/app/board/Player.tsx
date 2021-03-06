import React, { useContext, useEffect, useRef } from 'react';

import { makeDraggable, updateCoor, resetCoor } from './util/helper';
import { CoorContext } from './util/CoorContext';

const svgDim = 24;
const svgWidth = svgDim;
const svgHeight = svgDim;

interface Props {
  team: number;
  pos: string;
  circleColor: string;
  textColor: string;
}

const Player: React.FC<Props> = (props) => {
  const { team, pos, circleColor, textColor } = props;
  const id = `T${team}_${pos}`;

  const ref = useRef<SVGSVGElement>(null);
  const { coorState, setCoorState } = useContext(CoorContext);
  const currState = coorState[id];

  useEffect(() => {
    makeDraggable(id, ref, currState, setCoorState);
    updateCoor(ref, currState);
  }, [id, currState, setCoorState]);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      textAnchor="middle"
      ref={ref}
      onDoubleClick={() => resetCoor(id, setCoorState)}
    >
      <circle
        cx={svgWidth / 2}
        cy={svgHeight / 2}
        r={svgDim / 3}
        className={`fill-current ${circleColor}`}
      />
      <text
        x={svgWidth / 2}
        y={svgHeight * 0.6}
        fontSize="40%"
        className={`fill-current ${textColor}`}
      >
        {pos}
      </text>
    </svg>
  );
};

export default Player;
