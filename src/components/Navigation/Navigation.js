import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { PAGES } from '@app/helpers';
import './navigation.scss';

const Navigation = () => {
  const activeRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const activeElement = document.querySelector('.navigation__link--active');
    const firstElement = document.querySelector('.navigation__link');
    const { width, x } = activeElement.getBoundingClientRect();
    const firstElementRects = firstElement.getBoundingClientRect();

    activeRef.current.style = `width: ${width}px; left: ${x - firstElementRects?.x}px`;
  }, [pathname]);

  return (
    <nav className="navigation navigation__inner">
      <ul className="navigation__pages">
        <li className="navigation__pages-item">
          <NavLink
            exact
            to={PAGES.MAIN}
            activeClassName="navigation__link--active"
            className="navigation__link"
          >
            Smile
          </NavLink>
        </li>
        <li className="navigation__pages-item">
          <NavLink
            to={PAGES.BAR_CHART}
            activeClassName="navigation__link--active"
            className="navigation__link"
          >
            Bar (COVID-19)
          </NavLink>
        </li>
        <li className="navigation__pages-item">
          <NavLink
            to={PAGES.SCATTER_PLOT}
            activeClassName="navigation__link--active"
            className="navigation__link"
          >
            Scatter (Wight to Height)
          </NavLink>
        </li>
        <li className="navigation__pages-item">
          <NavLink
            to={PAGES.LINE}
            activeClassName="navigation__link--active"
            className="navigation__link"
          >
            Line (Moscow temperature)
          </NavLink>
        </li>
        <li className="navigation__pages-item">
          <NavLink
            to={PAGES.WORLD_MAP}
            activeClassName="navigation__link--active"
            className="navigation__link"
          >
            World Map
          </NavLink>
        </li>
        <li className="navigation__pages-item">
          <NavLink
            to={PAGES.TREE}
            activeClassName="navigation__link--active"
            className="navigation__link"
          >
            Countries Hierarchy
          </NavLink>
        </li>
      </ul>
      <div className="navigation__active" ref={activeRef}/>
    </nav>
  );
};

export default Navigation;
