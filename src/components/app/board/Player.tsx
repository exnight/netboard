import React from 'react';
import { useDrag } from 'react-dnd';

import { DragItem } from './util/BoardInterface';

const svgDim = 48;
const svgWidth = svgDim;
const svgHeight = svgDim;

interface Props {
  player: DragItem;
}

const Player: React.FC<Props> = (props) => {
  const { player } = props;
  const { type, id, left, top } = player;

  const [{ isDragging }, drag] = useDrag({
    item: { type, id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isDragging)
    return (
      <div ref={drag}>
        <svg width={svgWidth} height={svgHeight} />
      </div>
    );
  return (
    <div ref={drag} style={{ position: 'relative', left, top }}>
      <svg width={svgWidth} height={svgHeight}>
        <circle
          cx={svgWidth / 2}
          cy={svgHeight / 2}
          r={svgDim / 2.5}
          className="fill-current text-teal-400"
        />
        <text x={svgWidth / 2} y={svgHeight / 2} strokeWidth="14px">
          {id}
        </text>
      </svg>
    </div>
  );
};

export default Player;
