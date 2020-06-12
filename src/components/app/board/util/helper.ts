import { RefObject } from 'react';
import * as d3 from 'd3';

const coorPrefix = 'coor_';

export const makeDraggable = (ref: RefObject<SVGSVGElement>, id: string) => {
  let [translateX, translateY] = localStorage
    .getItem(`${coorPrefix}${id}`)
    ?.split(',') || [0, 0];

  const handleDrag = d3
    .drag()
    .subject(() => ({ x: translateX, y: translateY }))
    .on('drag', () => {
      const me = d3.select(ref.current);
      const transform = `translate(${d3.event.x}, ${d3.event.y})`;
      translateX = d3.event.x;
      translateY = d3.event.y;
      me.attr('transform', transform);
      localStorage.setItem(`${coorPrefix}${id}`, `${translateX},${translateY}`);
    });

  if (ref.current) handleDrag(d3.select(ref.current));
};

export const setPositions = (ref: RefObject<SVGSVGElement>, id: string) => {
  const xy = localStorage.getItem(`${coorPrefix}${id}`)?.split(',') || [0, 0];
  const transform = `translate(${xy[0]}, ${xy[1]})`;
  if (ref.current) d3.select(ref.current).attr('transform', transform);
};

export const resetAllPositions = () => {
  const keys = Object.keys(localStorage).filter((item) =>
    item.startsWith(coorPrefix)
  );
  keys.forEach((key) => localStorage.setItem(key, '0,0'));
};
