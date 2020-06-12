import { RefObject } from 'react';
import * as d3 from 'd3';

const coorPrefix = 'coor_';

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

export const makeDraggable = (ref: RefObject<SVGSVGElement>, id: string) => {
  let [x, y] = getCoorFromLocalStorage(`${coorPrefix}${id}`);

  const handleDrag = d3
    .drag()
    .subject(() => ({ x, y }))
    .on('drag', () => {
      const me = d3.select(ref.current);
      const transform = `translate(${d3.event.x}, ${d3.event.y})`;
      x = d3.event.x;
      y = d3.event.y;
      me.attr('transform', transform);
      setCoorToLocalStorage(`${coorPrefix}${id}`, [x, y]);
    });

  if (ref.current) handleDrag(d3.select(ref.current));
};

export const setPositions = (ref: RefObject<SVGSVGElement>, id: string) => {
  const [x, y] = getCoorFromLocalStorage(`${coorPrefix}${id}`);
  const transform = `translate(${x}, ${y})`;
  if (ref.current) d3.select(ref.current).attr('transform', transform);
};

export const resetAllPositions = () => {
  const keys = Object.keys(localStorage).filter((item) =>
    item.startsWith(coorPrefix)
  );
  keys.forEach((key) => setCoorToLocalStorage(key, [0, 0]));
};
