import { RefObject } from 'react';
import * as d3 from 'd3';

export const makeDraggable = (ref: RefObject<SVGSVGElement>) => {
  let translateX = 0;
  let translateY = 0;

  const handleDrag = d3
    .drag()
    .subject(() => ({ x: translateX, y: translateY }))
    .on('drag', () => {
      const me = d3.select(ref.current);
      const transform = `translate(${d3.event.x}, ${d3.event.y})`;
      translateX = d3.event.x;
      translateY = d3.event.y;
      me.attr('transform', transform);
    });
  if (ref.current) handleDrag(d3.select(ref.current));
};

export const test = '';
