import React, { useEffect, useRef } from 'react';
import { extent } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { transition } from 'd3-transition';
import { easeLinear } from 'd3-ease';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import Svg from '@app/components/Svg';
import { GITHUB_COMPONENTS_URL } from '@app/helpers';

const Line = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  };

  useEffect(() => {
    fetch(`${GITHUB_COMPONENTS_URL}/Line/data/temperature_Moscow.json`)
      .then(response => response.json())
      .then(data => {
        const { height, width } = svgRef.current.getBoundingClientRect();
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = select(svgRef.current);
        const g = svg.select('#data');

        const xScale = scaleTime()
          .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
          .range([0, innerWidth]);

        const yScale = scaleLinear()
          .domain(extent(data, d => d.temperature))
          .range([innerHeight, 0]);

        const xAxis = axisBottom(xScale);
        const yAxis = axisLeft(yScale);
        const lineGenerator = line()
          .x(d => xScale(new Date(d.date)))
          .y(d => yScale(d.temperature));

        const path = select(pathRef.current);
        path
          .attr('d', lineGenerator(data));

        const pathLength = path.node().getTotalLength();
        const pathTransition = transition()
          .duration(5000)
          .ease(easeLinear);

        path
          .attr('stroke-dashoffset', pathLength)
          .attr("stroke-dasharray", pathLength)
          .transition(pathTransition)
          .attr('stroke-dashoffset', 0);

        g.append('g')
          .attr('transform', `translate(0, ${innerHeight})`)
          .call(xAxis);

        g.append('g')
          .call(yAxis);

        g.append('g')
          .call(
            axisLeft(yScale)
              .ticks(yScale.ticks().length)
              .tickSize(-width + margin.left + margin.right)
              .tickFormat('')
          )
          .call(d =>
            d.selectAll(".tick line")
              .attr("stroke-opacity", 0.5)
              .attr("stroke-dasharray", 1))
          .select('.domain')
          .remove();
      });
  }, []);

  return (
    <Svg ref={svgRef}>
      <g id="data" transform={`translate(${margin.left}, ${margin.top})`}>
        <path ref={pathRef} d={''} stroke="lightblue" fill="none"/>
      </g>
    </Svg>
  );
};

export default Line;
