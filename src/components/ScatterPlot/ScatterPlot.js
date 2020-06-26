import React, { useRef } from 'react';
import Svg from '@app/components/Svg';
import dataset from './data/auto-mpg.csv';

const ScatterPlot = () => {
  const svgRef = useRef(null);

  console.log(dataset);

  return (
    <Svg ref={svgRef}>

    </Svg>
  );
};

export default ScatterPlot;
