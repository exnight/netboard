import { RefObject } from 'react';
import { event, select } from 'd3-selection';
import { drag } from 'd3-drag';

import { Coordinates } from './CoorContext';

export const COOR_PREFIX = 'coor_';

export const getCoorFromLocalStorage = (key: string) => {
  const xy = localStorage
    .getItem(key)
    ?.split(',')
    .map((val) => parseInt(val, 10)) || [0, 0];
  return xy as [number, number];
};

export const setCoorToLocalStorage = (key: string, coor: [number, number]) => {
  localStorage.setItem(key, `${coor[0]},${coor[1]}`);
};

export const drawAtCoor = (
  ref: RefObject<SVGSVGElement>,
  [x, y]: [number, number]
) => {
  const transform = `translate(${x}, ${y})`;
  if (ref.current) select(ref.current).attr('transform', transform);
};

export const updateCoor = (
  id: string,
  ref: RefObject<SVGSVGElement>,
  newCoor: [number, number]
) => {
  setCoorToLocalStorage(`${COOR_PREFIX}${id}`, newCoor);
  drawAtCoor(ref, newCoor);
};

export const makeDraggable = (
  id: string,
  ref: RefObject<SVGSVGElement>,
  state: [number, number],
  setState: Function
) => {
  let [x, y] = state;

  const handleDrag = drag()
    .subject(() => ({ x, y }))
    .on('drag', () => {
      x = event.x;
      y = event.y;

      setState((prevState: Coordinates) => {
        const newState = { ...prevState };
        newState[id] = [x, y];
        return newState;
      });
    });

  if (ref.current) handleDrag(select(ref.current));
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
