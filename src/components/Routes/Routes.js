import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PAGES } from '@app/helpers';

const SmileFace = lazy(() => import(/* webpackPrefetch: true */ '@app/components/SmileFace'));
const BarChart = lazy(() => import(/* webpackPrefetch: true */ '@app/components/BarChart'));
const ScatterPlot = lazy(() => import(/* webpackPrefetch: true */ '@app/components/ScatterPlot'));
const Line = lazy(() => import(/* webpackPrefetch: true */ '@app/components/Line'));
const WorldMap = lazy(() => import(/* webpackPrefetch: true */ '@app/components/WorldMap'));
const CountriesHierarchy = lazy(() => import(/* webpackPrefetch: true */ '@app/components/CountriesHierarchy'));

const Routes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route exact path={PAGES.MAIN}>
        <SmileFace/>
      </Route>
      <Route path={PAGES.BAR_CHART}>
        <BarChart/>
      </Route>
      <Route path={PAGES.SCATTER_PLOT}>
        <ScatterPlot/>
      </Route>
      <Route path={PAGES.LINE}>
        <Line/>
      </Route>
      <Route path={PAGES.LINE}>
        <Line/>
      </Route>
      <Route path={PAGES.WORLD_MAP}>
        <WorldMap/>
      </Route>
      <Route path={PAGES.TREE}>
        <CountriesHierarchy/>
      </Route>
      <Redirect to={PAGES.BAR_CHART}/>
    </Switch>
  </Suspense>
);

export default Routes;
