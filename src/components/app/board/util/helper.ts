import { RefObject } from 'react';
import * as d3 from 'd3';

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
  if (ref.current) d3.select(ref.current).attr('transform', transform);
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

  const handleDrag = d3
    .drag()
    .subject(() => ({ x, y }))
    .on('drag', () => {
      x = d3.event.x;
      y = d3.event.y;

      setState((prevState: Coordinates) => {
        const newState = { ...prevState };
        newState[id] = [x, y];
        return newState;
      });
    });

  if (ref.current) handleDrag(d3.select(ref.current));
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
