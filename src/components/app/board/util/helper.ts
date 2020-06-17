import { RefObject } from 'react';
import { event, select } from 'd3-selection';
import { drag } from 'd3-drag';

import { Coordinates } from './CoorContext';

export const updateCoor = (
  ref: RefObject<SVGSVGElement>,
  [x, y]: [number, number]
) => {
  const transform = `translate(${x}, ${y})`;
  if (ref.current) select(ref.current).attr('transform', transform);
};

export const makeDraggable = (
  id: string,
  ref: RefObject<SVGSVGElement>,
  currState: [number, number],
  setState: Function
) => {
  let [x, y] = currState;

  const handleDrag = drag()
    .subject(() => ({ x, y }))
    .on('drag', () => {
      setState((prevState: Coordinates) => ({
        ...prevState,
        [id]: [event.x, event.y],
      }));
    });

  if (ref.current) handleDrag(select(ref.current));
};

export const resetCoor = (id: string, setState: (fn: Function) => void) => {
  setState((prevState: Coordinates) => ({ ...prevState, [id]: [0, 0] }));
};

export const resetAllCoor = (setState: (fn: Function) => void) => {
  setState((prevState: Coordinates) => {
    const newState = { ...prevState };
    Object.keys(prevState).forEach((key) => {
      newState[key] = [0, 0];
    });
    return newState;
  });
};

export const getRelativePosition = (
  cv: HTMLCanvasElement,
  e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
) => {
  const rect = cv.getBoundingClientRect();

  const cssScaleX = cv.width / cv.offsetWidth;
  const cssScaleY = cv.height / cv.offsetHeight;

  const x = (e.clientX - Math.round(rect.left)) * cssScaleX;
  const y = (e.clientY - Math.round(rect.top)) * cssScaleY;

  return [x, y];
};
