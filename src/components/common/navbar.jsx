import React from 'react';
import { Link } from "react-router-dom";

function toggleHamb(){
  document.querySelector('.navbar-menu').classList.toggle('is-active');
}

function Navbar() {
  const navStyle = {
    margin: '20px'
  };
  const linkNavStyle = {
    borderBottomStyle: 'solid',
    borderBottomWidth: '0px',
  };
    return (

<nav className="navbar" role="navigation" aria-label="main navigation" style={navStyle} >
  <div className="navbar-brand">
    <h1 className="title is-hidden-desktop is-4" id="navTitle" >&nbsp;</h1>
    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarOptions" onClick={toggleHamb} >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="navbarOptions" className="navbar-menu">
    <div className="navbar-start">
      <Link to="/generalresults" id="linkRESGRALES" className="navbar-item" style={linkNavStyle} onClick={toggleHamb} >
          Resultados generales.
      </Link>
      <Link to="/filterresults" id="linkCONSULTAFILTRO" className="navbar-item" style={linkNavStyle} onClick={toggleHamb} >
          Consulta por filtro
      </Link>
      <Link to="/tableresults" id="linkNROMESA" className="navbar-item" style={linkNavStyle} onClick={toggleHamb} >
          Consulta por Nro de Mesa
      </Link>
      <Link to="/incidentsresults" id="linkINCIDEN" className="navbar-item" style={linkNavStyle} onClick={toggleHamb} >
          Mesas en incidencia definitiva
      </Link>
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link"  >
          Mas
        </a>
        <div className="navbar-dropdown">
          <a className="navbar-item"  >
            Sobre nosotros
          </a>
          <a className="navbar-item"  >
            Contactanos
          </a>
          <hr className="navbar-divider" />
          <a className="navbar-item"  >
            Reportar un problema
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>


    );
  }
  export default Navbar;