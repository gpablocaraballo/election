import React from 'react';
import { cleanNavTitle, getIncidents } from '../common/utils';
import TableIncidents from './tableincidents.jsx';
import Modal from '../common/modal.jsx';

class IncidentsResults extends React.Component {
    constructor(props) {
      super(props);
      this.state = {mesas: [], abrirModal:false, errorProc:false, msg:"", cuerpo:"SIN MESA", "mesaActual":""};
      this.cerrarPdf = this.cerrarPdf.bind(this); //OPERACIONES PARA EL MODAL
      this.verPdf = this.verPdf.bind(this); //OPERACIONES PARA EL MODAL
      this.accionModal = this.accionModal.bind(this); //OPERACIONES PARA EL MODAL
    }
    huboError(){    
        this.setState({
            msg: "Error de proceso",
            errorProc:true
          });
    }
    componentDidMount() {
        cleanNavTitle("linkINCIDEN");
        getIncidents().then((res) => {
            if (res.data.entity != null){
                this.setState({"mesas":res.data.entity});
            }
        })
        .catch(
            (err) => {
                this.huboError();
            }
        ).then(function() {

        });

    }
    //componentWillUnmount() {}
    cerrarPdf(){
        this.setState({abrirModal:false});
    }
    verPdf(pmesa) {
        let pathurl = "samples/" + pmesa + ".PDF";
        const objStyle = {
            width: '100%',
            height:'650px'
        };
        this.setState({
            cuerpo:  (                
                <object style={objStyle} data={pathurl} type="application/pdf" ><embed src={pathurl} type="application/pdf" /></object>
            ), 
            abrirModal:true,
            "mesaActual":pmesa
        });
    }
    accionModal(params){
        if (params.action === "2"){
            this.setState({abrirModal:false});
        }
    }
  
    render() {

        let salida;
        const huboError = this.state.errorProc;

        let parametros = {
            "cuerpo":this.state.cuerpo,
            "boton1Style":{display:'none'},
            "boton2Txt":"Cerrar",
            "titulo":"MESA: " + this.state.mesaActual
        };
        

        if (huboError === true){
            salida = (
                <article className="message is-warning">
                <div className="message-header">
                    <p>{this.state.msg}</p>
                </div>
                <div className="message-body">
                    Hubo un error en la petición, por favor inténtelo nuevamente.
                </div>
                </article>
            );

        } else {

                salida = (
                    <React.Fragment>
                        <TableIncidents mesas={this.state.mesas} abrirModal={this.verPdf} ></TableIncidents>
                        <Modal activo={this.state.abrirModal} parametros={parametros} cerrarModal={this.cerrarPdf} accionBotones={this.accionModal} ></Modal>
                    </React.Fragment>
                );
        }

      return (
                    
            salida
        
      );
    }
  }

  export { IncidentsResults }

  