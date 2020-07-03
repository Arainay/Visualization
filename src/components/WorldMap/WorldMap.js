import React, { useEffect, useRef } from 'react';
import { feature } from 'topojson-client';
import { geoPath, geoNaturalEarth1 } from 'd3-geo';
import { select } from 'd3-selection';
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
        const pathsSelection = svgSelection.selectAll('path');

        pathsSelection.data(countries.features)
          .enter()
          .append('path')
            .attr('d', pathGenerator)
            .attr('class', 'world-map__path');
      })
      .catch(error => {
        console.error(error);
      });




  }, []);

  return (
    <Svg ref={svgRef} className="world-map"/>
  );
};

export default WorldMap;
