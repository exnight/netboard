import React from 'react';
import { useDrop, XYCoord } from 'react-dnd';

import ItemTypes from './util/ItemTypes';
import { DragItem } from './util/BoardInterface';

const multFactor = 30;

let extDist = 3.05;
let courtWidth = 30.5;
let courtHeight = 15.25;
let fullWidth = courtWidth + extDist * 2;
let fullHeight = courtHeight + extDist * 2;
let goalCircleR = 4.9;
let centerCircleR = 0.9 / 2;

extDist *= multFactor;
courtWidth *= multFactor;
courtHeight *= multFactor;
fullWidth *= multFactor;
fullHeight *= multFactor;
goalCircleR *= multFactor;
centerCircleR *= multFactor;

interface Props {
  updateState: Function;
}

const Court: React.FC<Props> = (props) => {
  const { updateState } = props;
  const moveBox = (item: DragItem, delta: XYCoord) => {
    const { type, id, left, top } = item;
    updateState((prevState: { [key: string]: DragItem }) => {
      return {
        ...prevState,
        [id]: { type, id, left: left + delta.x, top: top + delta.y },
      };
    });
  };
  const [, drop] = useDrop({
    accept: ItemTypes.PLAYER,
    drop(item: DragItem, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      moveBox(monitor.getItem(), delta);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop} className="flex justify-center">
      <svg
        width={fullWidth}
        height={fullHeight}
        // transform="rotate(-90) translate(-90)"
      >
        <defs>
          <clipPath id="cutOffLeft">
            <rect
              x={extDist}
              y={extDist}
              width={goalCircleR * 2}
              height={courtHeight}
            />
          </clipPath>
          <clipPath id="cutOffRight">
            <rect
              x={fullWidth - extDist - goalCircleR * 2}
              y={extDist}
              width={goalCircleR * 2}
              height={courtHeight}
            />
          </clipPath>
        </defs>

        <rect
          id="full"
          width={fullWidth}
          height={fullHeight}
          className="fill-current text-gray-500"
        />
        <rect
          id="court"
          x={extDist}
          y={extDist}
          width={courtWidth}
          height={courtHeight}
          className="fill-current text-blue-400"
        />
        <circle
          id="shootC1"
          cx={extDist}
          cy={fullHeight / 2}
          r={goalCircleR}
          fill="none"
          stroke="white"
          strokeWidth="4"
          clipPath="url(#cutOffLeft)"
        />
        <circle
          id="shootC2"
          cx={fullWidth - extDist}
          cy={fullHeight / 2}
          r={goalCircleR}
          fill="none"
          stroke="white"
          strokeWidth="4"
          clipPath="url(#cutOffRight)"
        />
        <circle
          id="centerC"
          cx={fullWidth / 2}
          cy={fullHeight / 2}
          r={centerCircleR}
          fill="none"
          stroke="white"
          strokeWidth="4"
        />
        <rect
          id="sideline"
          x={extDist}
          y={extDist}
          width={courtWidth}
          height={courtHeight}
          style={{ fill: 'none', stroke: 'white', strokeWidth: 8 }}
        />
        <circle
          id="post1"
          cx={extDist}
          cy={fullHeight / 2}
          r={0.25 * multFactor}
          className="fill-current text-blue-800"
        />
        <circle
          id="post2"
          cx={fullWidth - extDist}
          cy={fullHeight / 2}
          r={0.25 * multFactor}
          className="fill-current text-blue-800"
        />

        <line
          id="thridLine1"
          x1={courtWidth / 3 + extDist}
          y1={extDist}
          x2={courtWidth / 3 + extDist}
          y2={courtHeight + extDist}
          style={{ stroke: 'white', strokeWidth: 4 }}
        />
        <line
          id="thridLine2"
          x1={(courtWidth / 3) * 2 + extDist}
          y1={extDist}
          x2={(courtWidth / 3) * 2 + extDist}
          y2={courtHeight + extDist}
          style={{ stroke: 'white', strokeWidth: 4 }}
        />
      </svg>
    </div>
  );
};

export default Court;
