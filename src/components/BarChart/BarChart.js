import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { format } from 'd3-format';
import { transition } from 'd3-transition';
import Svg from '@app/components/Svg';
import './bar-chart.scss';

const total = {
  country: 'All',
  confirmed: 0,
  recovered: 0,
  deaths: 0
};

const BarChart = () => {
  const [data, setData] = useState([]);
  const { state } = useLocation();
  const defaultCountry = state && data.find(({ country }) => state.country === country) ? state.country : total.country;

  const [country, setCountry] = useState(defaultCountry);
  const svgRef = useRef(null);

  const selectCountry = event => {
    setCountry(event.target.value);
  };

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

  const draw = name => {
    const { height, width } = svgRef.current.getBoundingClientRect();

    const svgSelection = select(svgRef.current);
    const topLevelGroupSelection = svgSelection.select('#data');
    const rectsSelection = topLevelGroupSelection.selectAll('rect');
    const xAxisSelection = topLevelGroupSelection.select('#x-axis');
    const yAxisSelection = topLevelGroupSelection.select('#y-axis');
    const linesSelection = topLevelGroupSelection.select('#lines');

    // eslint-disable-next-line no-unused-vars
    const { country, ...counters } = !name || name === 'All' ? total : data.find(item => item.country === name);
    const counterKeys = Object.keys(counters);
    const counterEntries = Object.entries(counters);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleBand()
      .domain(counterKeys)
      .range([0, innerWidth])
      .padding(0.05);

    const yScale = scaleLinear()
      .domain([0, counters.confirmed + counters.deaths / 2])
      .range([innerHeight, 0]);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale)
      .tickFormat(format(".2s"));

    const transitionWithDelay = transition().delay(700);

    xAxisSelection
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis)
      .selectAll('.tick line')
        .remove();

    yAxisSelection
      .call(yAxis)
      .call(updateTickView);

    // enter + update
    rectsSelection
      .data(counterEntries, d => d[0])
        .enter()
        .append('rect')
          .attr('x', d => xScale(d[0]))
          .attr('y', innerHeight)
          .attr('width', xScale.bandwidth())
          .attr('class', d => `bar-chart__rect bar-chart__rect--${d[0]}`)
          .transition(transitionWithDelay)
            .selection()
        .merge(rectsSelection)
          .on('mouseover', d => { console.log(`${d[0]}: ${d[1]}`); })
          .on('mouseout', d => { console.log(d); })
          .transition()
            .duration(700)
            .attr('y', d => yScale(d[1]))
            .attr('height', d => innerHeight - yScale(d[1]));

    // update
    // rectsSelection
    //   .transition()
    //     .duration(700)
    //     .attr('y', d => yScale(d[1]))
    //     .attr('height', d => innerHeight - yScale(d[1]));

    // exit
    rectsSelection
      .exit()
      .remove();

    // add lines
    linesSelection
      .call(
        axisLeft(yScale)
          .ticks(yScale.ticks().length)
          .tickSize(-width + margin.left + margin.right)
          .tickFormat('')
      )
      .call(updateTickView)
      .select('.domain')
        .remove();
  };

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Arainay/Visualization/master/src/components/BarChart/data/dataset.json')
      .then(response => response.json())
      .then(data => {
        data.forEach(item => {
          total.confirmed += item.confirmed;
          total.recovered += item.recovered;
          total.deaths += item.deaths;
        });
        setData(data);
      });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      draw(country !== total.country ? country : null);
    }
  });

  if (data.length === 0) {
    // todo add loading spinner
    return null;
  }

  return (
    <div style={{ display: 'grid' }}>
      <select
        id="countries"
        name="countries"
        value={country}
        onChange={selectCountry}
      >
        <option value={total.country}>{total.country}</option>
        {data.map(item => (
          <option key={item.country} value={item.country}>{item.country}</option>
        ))}
      </select>
      <Svg ref={svgRef} className="bar-chart">
        <g id="data" transform={`translate(${margin.left}, ${margin.top})`}>
          <g id="x-axis"/>
          <g id="y-axis"/>
          <g id="lines"/>
        </g>
      </Svg>
    </div>
  );
};

export default BarChart;
