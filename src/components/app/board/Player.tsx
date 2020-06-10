import React, { Component, RefObject, createRef } from 'react';
import * as d3 from 'd3';

const svgDim = 48;
const svgWidth = svgDim;
const svgHeight = svgDim;

interface Props {
  pos: string;
  circleColor: string;
  textColor: string;
}

function makeDraggable(ref: RefObject<SVGSVGElement>) {
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
}

class Player extends Component<Props> {
  ref: RefObject<SVGSVGElement>;

  constructor(props: Props) {
    super(props);
    this.ref = createRef();
  }

  componentDidMount() {
    makeDraggable(this.ref);
  }

  render() {
    const { pos, circleColor, textColor } = this.props;

    return (
      <svg
        width={svgWidth}
        height={svgHeight}
        textAnchor="middle"
        ref={this.ref}
      >
        <circle
          cx={svgWidth / 2}
          cy={svgHeight / 2}
          r={svgDim / 2.5}
          className={`fill-current ${circleColor}`}
        />
        <text
          x={svgWidth / 2}
          y={svgHeight * 0.6}
          strokeWidth="14px"
          className={`fill-current ${textColor}`}
        >
          {pos}
        </text>
      </svg>
    );
  }
}

export default Player;
