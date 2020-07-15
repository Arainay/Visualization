import React, { useEffect, useRef } from 'react';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';
import Svg from '@app/components/Svg';
import { GITHUB_COMPONENTS_URL } from '@app/helpers';

const ScatterPlot = () => {
  const svgRef = useRef(null);

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  };

  const updateTickView = selection =>
    selection.selectAll(".tick line")
      .attr("stroke-opacity", 0.5)
      .attr("stroke-dasharray", 2.2);

  useEffect(() => {
    fetch(`${GITHUB_COMPONENTS_URL}/ScatterPlot/data/weight-height.json`)
      .then(response => response.json())
      .then(data => {
        const { height, width } = svgRef.current.getBoundingClientRect();

        const svgSelection = select(svgRef.current);
        const topLevelGroupSelection = svgSelection.select('#data');
        const circlesSelection = topLevelGroupSelection.selectAll('circle');
        const xAxisSelection = topLevelGroupSelection.select('#x-axis');
        const yAxisSelection = topLevelGroupSelection.select('#y-axis');
        const linesSelection = topLevelGroupSelection.select('#lines');
        const xLinesSelection = linesSelection.select('#x-lines');
        const yLinesSelection = linesSelection.select('#y-lines');

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const xScale = scaleLinear()
          .domain(extent(data, d => d.weight))
          .range([0, innerWidth]);

        const yScale = scaleLinear()
          .domain(extent(data, d => d.height))
          .range([innerHeight, 0]);

        const xAxis = axisBottom(xScale);
        const yAxis = axisLeft(yScale);

        xAxisSelection
          .attr('transform', `translate(0, ${innerHeight})`)
          .call(xAxis)
          .call(updateTickView);

        yAxisSelection
          .call(yAxis)
          .call(updateTickView);

        circlesSelection
          .data(data)
          .enter()
            .append('circle')
              .attr('cx', d => xScale(d.weight))
              .attr('cy', d => yScale(d.height))
              .attr('r', 10)
              .attr('fill', d => d.gender === 'Male' ? 'rgba(173, 216, 230, 0.5)' : 'rgba(255, 192, 203, 0.5)')
              .attr('stroke', d => d.gender === 'Male' ? 'rgb(173, 216, 230)' : 'rgb(255, 192, 203)');

        xLinesSelection
          .call(
            axisBottom(xScale)
              .ticks(xScale.ticks().length)
              .tickSize(height - margin.top - margin.bottom)
              .tickFormat('')
          );

        yLinesSelection
          .call(
            axisLeft(yScale)
              .ticks(yScale.ticks().length)
              .tickSize(-width + margin.left + margin.right)
              .tickFormat('')
          );

        linesSelection
          .selectAll('g')
          .call(updateTickView)
          .select('.domain')
          .remove();
      });
  }, []);

  return (
    <Svg ref={svgRef}>
      <g id="data" transform={`translate(${margin.left}, ${margin.top})`}>
        <g id="x-axis"/>
        <g id="y-axis"/>
        <g id="lines">
          <g id="x-lines"/>
          <g id="y-lines"/>
        </g>
      </g>
    </Svg>
  );
};

export default ScatterPlot;
