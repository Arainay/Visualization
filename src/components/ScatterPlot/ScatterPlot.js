import React, { useRef } from 'react';
import Svg from '@app/components/Svg';

const ScatterPlot = () => {
  const svgRef = useRef(null);

  return (
    <Svg ref={svgRef}>

    </Svg>
  );
};

export default ScatterPlot;
