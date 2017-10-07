import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router-dom';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNavBar">
    <div className="container">
      <Link className="navbar-brand" id="oi" to='/projects'>Open Innovation</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
              aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <Link className="nav-link" to='/projects'>Proyectos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/projects/create'>Nuevo Proyecto</Link>
          </li>
          <li className="nav-item">
            <AccountsUIWrapper/>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavBar;