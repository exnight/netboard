import React from 'react';

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

const Court: React.FC = () => {
  return (
    <div className="w-3/4">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${fullWidth} ${fullHeight}`}
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
          className="fill-current text-gray-400"
        />
        <rect
          id="court"
          x={extDist}
          y={extDist}
          width={courtWidth}
          height={courtHeight}
          className="fill-current text-blue-500"
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
