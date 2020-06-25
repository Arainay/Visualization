import React, { Suspense } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Visualization from '@app/components/Visualization';

render(
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Visualization/>
    </BrowserRouter>
  </Suspense>,
  document.getElementById('root')
);
