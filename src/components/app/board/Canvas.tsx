import React, { useEffect, useRef, useState } from 'react';

import { fullWidth, fullHeight } from './Court';

import { getRelativePosition } from './util/helper';

const lineWidth = 0.05;
let ctx = {} as CanvasRenderingContext2D;

export const clearCanvas = () => ctx.clearRect(0, 0, fullWidth, fullHeight);

const setStrokeStyle = () => {
  ctx.strokeStyle = 'white';
  ctx.lineCap = 'round';
  ctx.lineWidth = lineWidth;
};

const initCanvasState = { drawing: false, x: 0, y: 0 };

const Canvas: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [canvasState, setCanvasState] = useState(initCanvasState);
  const prevStateRef = useRef(initCanvasState);
  const prevCanvasState = prevStateRef.current;

  const draw = (prevX: number, prevY: number, nextX: number, nextY: number) => {
    setStrokeStyle();

    ctx.moveTo(prevX, prevY);
    ctx.lineTo(nextX, nextY);
    ctx.stroke();
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    // left click only
    if (ref.current && e.button === 0) {
      const [x, y] = getRelativePosition(ref.current, e);

      ctx.beginPath();
      prevStateRef.current = {
        x: x - lineWidth,
        y: y - lineWidth,
        drawing: false,
      };
      setCanvasState({ x: x + lineWidth, y: y + lineWidth, drawing: true });
    }
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (canvasState.drawing && ref.current) {
      const [currentX, currentY] = getRelativePosition(ref.current, e);

      setCanvasState({
        drawing: true,
        x: currentX,
        y: currentY,
      });
    }
  };

  const handleonMouseUp = () => {
    setCanvasState((prevState) => ({ ...prevState, drawing: false }));
  };

  useEffect(() => {
    if (ref.current) ctx = ref.current.getContext('2d')!;
  }, []);

  useEffect(() => {
    draw(prevCanvasState.x, prevCanvasState.y, canvasState.x, canvasState.y);
    prevStateRef.current = canvasState;
  }, [canvasState]);

  return (
    <canvas
      ref={ref}
      className="absolute w-full h-full inset-0"
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseMove={(e) => handleMouseMove(e)}
      onMouseUp={handleonMouseUp}
      // disable right click
      onContextMenu={(e) => e.preventDefault()}
    />
  );
};

export default Canvas;
