import React from 'react';
import logoFlag from '../../assets/logoHeader.png';
import logoCorreo from '../../assets/logoCorreoSmall.png';

function Header() {
  const headStyle = {
    paddingTop: '10px',
    paddingBottom:'15px'
  };
  const mobileTextStyle1 = {
    fontSize: '1.2em',
    fontWeight: 'bold'
  };
  const mobileTextStyle2 = {
    fontSize: '1em'
  };
  const logoCorreoMobile = {
    height: '30px',
    marginLeft: '10px'
  };
  const logoFlagMobile = {
    height: '50px'
  };

  return (
          <React.Fragment>
          <nav className="level fondoColor is-hidden-touch" style={headStyle} >
              <div className="level-item has-text-centered">
                <img src={logoFlag} alt="Logo Argentina" title="Logo Argentina" />
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="title textoColor">Elecciones con React</p>
                  <p className="title textoColor">RECUENTO PROVISIONAL DE RESULTADOS</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <img src={logoCorreo} alt="Logo Argentina" title="Logo Argentina" />
              </div>
          </nav>
          <nav className="level fondoColor is-hidden-desktop" style={headStyle} >
          <div className="level-item has-text-centered">
            <img src={logoFlag} alt="Logo Argentina" title="Logo Argentina" style={logoFlagMobile}/>
            <img src={logoCorreo} alt="Logo Argentina" title="Logo Argentina" style={logoCorreoMobile} />
          </div>
          <div className="level-item has-text-centered" >
            <div>
              <p className="title textoColor" style={mobileTextStyle1} >Elecciones 2019</p>
              <p className="title textoColor" style={mobileTextStyle2} >RECUENTO PROVISIONAL DE RESULTADOS</p>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );

}
export default Header;