import React, { useEffect, useRef } from 'react';
import { feature } from 'topojson-client';
import { geoPath, geoNaturalEarth1 } from 'd3-geo';
import { event, select } from 'd3-selection';
import { zoom } from 'd3-zoom';
import Svg from '@app/components/Svg';
import './world-map.scss';

const WorldMap = () => {
  const svgRef = useRef(null);

  // todo add service
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        const countries = feature(data, data.objects.countries);

        const projection = geoNaturalEarth1();
        const pathGenerator = geoPath().projection(projection);

        const svgSelection = select(svgRef.current);
        const boundariesSelection = svgSelection.select('#boundaries');
        const countriesSelection = svgSelection.select('#countries');
        const pathsSelection = countriesSelection.selectAll('path');

        boundariesSelection.select('#sphere')
          .attr('d', pathGenerator({ type: 'Sphere' }));

        pathsSelection.data(countries.features)
          .enter()
          .append('path')
            .attr('d', pathGenerator)
            .attr('class', 'world-map__country')
            .append('title')
              .text(d => d.properties.name);

        svgSelection.call(
          zoom()
            .on('zoom', () => {
              boundariesSelection.attr('transform', event.transform);
            })
        );
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Svg ref={svgRef} className="world-map">
      <g id="boundaries">
        <path id="sphere" className="world-map__sphere"/>
        <g id="countries"/>
      </g>
    </Svg>
  );
};

export default WorldMap;
