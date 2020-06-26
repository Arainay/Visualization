import React, { useEffect, useRef } from 'react';
import { extent } from 'd3-array';
import { format } from 'd3-format';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { transition } from 'd3-transition';
import { easeLinear } from 'd3-ease';
import Svg from '@app/components/Svg';
import dataset from './data/temperature_Moscow.csv';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';

const Line = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  const data = dataset
    .map((item) => ({
      city: item.City,
      date: new Date(item.Year, item.Month - 1, item.Day),
      temperature: Number(format(".3n")((item.AvgTemperature - 32) / 1.8))
    }))
    .filter(({ temperature }) => temperature !== -72.8);

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  };

  useEffect(() => {
    const { height, width } = svgRef.current.getBoundingClientRect();
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = select(svgRef.current);
    const g = svg.select('#data');

    const xScale = scaleTime()
      .domain([data[0].date, data[data.length - 1].date])
      .range([0, innerWidth]);

    const yScale = scaleLinear()
      .domain(extent(data, d => d.temperature))
      .range([innerHeight, 0]);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale);
    const lineGenerator = line()
      .x(d => xScale(d.date))
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
