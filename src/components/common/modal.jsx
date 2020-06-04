import React from 'react';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.cerrarModal = this.cerrarModal.bind(this);
    this.accion1 = this.accion1.bind(this);
    this.accion2 = this.accion2.bind(this);
    this.accion3 = this.accion3.bind(this);
  }
  cerrarModal(){
    this.props.cerrarModal();
  }
  accion1(){
    this.props.accionBotones({"action":"1"});
  }
  accion2(){
    this.props.accionBotones({"action":"2"});
  }
  accion3(){
    this.props.accionBotones({"action":"3"});
  }

  render() {
    let titulo = (this.props.parametros.titulo !== undefined)?this.props.parametros.titulo:"Mensaje";
    let cuerpo = (this.props.parametros.cuerpo !== undefined)?this.props.parametros.cuerpo:"";
    let boton1Txt = (this.props.parametros.boton1Txt !== undefined)?this.props.parametros.boton1Txt:"Aceptar";
    let boton2Txt = (this.props.parametros.boton2Txt !== undefined)?this.props.parametros.boton2Txt:"Cancelar";
    let boton3Txt = (this.props.parametros.boton3Txt !== undefined)?this.props.parametros.boton3Txt:"Accion";
    let botonCloseStyle = (this.props.parametros.botonCloseStyle !== undefined)?this.props.parametros.botonCloseStyle:{};
    let boton1Style = (this.props.parametros.boton1Style !== undefined)?this.props.parametros.boton1Style:{};
    let boton2Style = (this.props.parametros.boton2Style !== undefined)?this.props.parametros.boton2Style:{};
    let boton3Style = (this.props.parametros.boton3Style !== undefined)?this.props.parametros.boton3Style:{display:'none'};

    let claseModal = "modal ";
    if (this.props.activo)
    claseModal = "modal is-active";
    
    return (
      <div className={claseModal} >
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{titulo}</p>
            <button className="delete" aria-label="close" style={botonCloseStyle} onClick={this.cerrarModal} ></button>
          </header>
          <section className="modal-card-body">
            {cuerpo}
          </section>
          <footer className="modal-card-foot">
            <button onClick={this.accion1} className="button is-success textoColor fondoColor" style={boton1Style} >{boton1Txt}</button>
            <button onClick={this.accion2} className="button" style={boton2Style} >{boton2Txt}</button>
            <button onClick={this.accion3} className="button" style={boton3Style} >{boton3Txt}</button>
          </footer>
        </div>
      </div>
    )

  }
}
export default Modal;