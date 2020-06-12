import React, { useEffect, useRef, useState } from 'react';

import {
  makeDraggable,
  COOR_PREFIX,
  getCoorFromLocalStorage,
  updateCoor,
} from './util/helper';

const svgDim = 48;
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
  const id = `${team}_${pos}`;

  const ref = useRef<SVGSVGElement>(null);
  const [x, y] = getCoorFromLocalStorage(`${COOR_PREFIX}${id}`);
  const [playerCoor, setPlayerCoor] = useState<[number, number]>([x, y]);

  useEffect(() => {
    makeDraggable(id, ref, playerCoor, setPlayerCoor);
    updateCoor(id, ref, playerCoor);
  }, [id, playerCoor]);

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
