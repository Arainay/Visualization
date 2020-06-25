import React, { useEffect, useRef, useState } from 'react';
import { select } from 'd3-selection';
import { arc } from 'd3-shape';
import { transition } from 'd3-transition';
import Svg from '@app/components/Svg';

const SmileFace = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const svgRef = useRef(null);
  const eyebrowsRef = useRef(null);
  const mouthRef = useRef(null);

  const onClick = () => {
    // animation
    const t = transition().duration(300);
    select(eyebrowsRef.current)
      .transition(t)
        .attr('transform', 'translate(0, -70)')
      .transition(t)
        .attr('transform', 'translate(0, -40)')
      .transition(t)
        .attr('transform', 'translate(0, -70)')
      .transition(t)
        .attr('transform', 'translate(0, -40)')
      .transition(t)
        .attr('transform', 'translate(0, -70)')
      .transition(t)
        .attr('transform', 'translate(0, -40)');
  };

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.style('background-color', 'green');

    const { height, width } = svgRef.current.getBoundingClientRect();

    select(mouthRef.current)
      .attr('d', arc()({
        innerRadius: 90,
        outerRadius: 100,
        startAngle: Math.PI / 2,
        endAngle: Math.PI * 3 / 2
      }));

    setSize({ width, height });
  }, []);

  const { height, width } = size;

  return (
    <Svg ref={svgRef}>
      <g transform={`translate(${width / 2}, ${height / 2})`} onClick={onClick}>
        <circle r={200} fill="yellow" stroke="black"/>
        <g id="eyes" transform="translate(0, -60)">
          <g ref={eyebrowsRef} id="eyebrows" transform="translate(0, -40)">
            <rect x={-75} width={30} height={10}/>
            <rect x={45} width={30} height={10}/>
          </g>
          <circle id="left-eye" r={15} cx={-60}/>
          <circle id="right-eye" r={15} cx={60}/>
        </g>
        <path ref={mouthRef}/>
      </g>
    </Svg>
  );
};

export default SmileFace;
