import React, { forwardRef } from 'react';
import './svg.scss';

const Svg = forwardRef(({ children, className, ...props }, ref) => (
  <svg className={className ? `${className} svg` : 'svg'} ref={ref} {...props}>
    {children}
  </svg>
));

export default Svg;
