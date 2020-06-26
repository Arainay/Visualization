import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Visualization from '@app/components/Visualization';

render(
  <BrowserRouter>
    <Visualization/>
  </BrowserRouter>,
  document.getElementById('root')
);
