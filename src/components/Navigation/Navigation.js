import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
          <NavLink exact to="/" activeClassName="navigation__link--active" className="navigation__link">
            Smile
          </NavLink>
        </li>
        <li className="navigation__pages-item">
          <NavLink to="/bar" activeClassName="navigation__link--active" className="navigation__link">
            Bar (COVID-19)
          </NavLink>
        </li>
        <li className="navigation__pages-item">
          <NavLink to="/scatter-plot" activeClassName="navigation__link--active" className="navigation__link">
            Scatter (Wight to Height)
          </NavLink>
        </li>
        <li className="navigation__pages-item">
          <NavLink to="/line" activeClassName="navigation__link--active" className="navigation__link">
            Line (Moscow temperature)
          </NavLink>
        </li>
      </ul>
      <div className="navigation__active" ref={activeRef}/>
    </nav>
  );
};

export default Navigation;
