import React, { useEffect, useRef } from 'react';
import { extent } from 'd3-array';
import { format } from 'd3-format';
import { scaleLinear, scaleTime } from 'd3-scale';
import Svg from '@app/components/Svg';
import dataset from './data/temperature_Moscow.csv';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';

const Line = () => {
  const svgRef = useRef(null);

  const data = dataset.map(item => ({
    city: item.City,
    date: new Date(item.Year, item.Month - 1, item.Day),
    temperature: format(".3n")((item.AvgTemperature - 32) / 1.8)
  }));

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

    g.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis);

    g.append('g')
      .call(yAxis);
  }, []);

  return (
    <Svg ref={svgRef}>
      <g id="data" transform={`translate(${margin.left}, ${margin.top})`}/>
    </Svg>
  );
};

export default Line;
