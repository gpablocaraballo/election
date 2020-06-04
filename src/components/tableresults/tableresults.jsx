import React from 'react';
import { cleanNavTitle, myTrim, getDatosNroMesa } from '../common/utils';
import GeneralResults from '../generalresults/generalresults.jsx';
import BodyCargosComp from './bodycargos.jsx';
import Modal from '../common/modal.jsx';
import down32 from '../../assets/download32.png';

class TableResults extends React.Component {
    constructor(props) {
      super(props);
      this.state =  {
                    ubicacion:"",
                    cargos:[],
                    listas:[],
                    actualmesa: "",
                    cuerpo:"",
                    nromesa:"",
                    tipomesa:"",
                    establecimiento:"",
                    abrirModal:false,
                    showResults:false,
                    showLoading:false,
                    showWarning:false,
                    filtro:{
                        municipioId:0,
                        circuitoId:0,
                        establecimientoId:0,
                        mesaId:0
                    },
                    ntelegramacodigo:"",
                    };
        this.getDatosMesa = this.getDatosMesa.bind(this);
        this.getDatosMesaKey = this.getDatosMesaKey.bind(this);
        this.nuevabusqueda = this.nuevabusqueda.bind(this);
        this.buscarMesa = this.buscarMesa.bind(this);
        this.unSetLoading = this.unSetLoading.bind(this);
        this.cerrarPdf = this.cerrarPdf.bind(this); //OPERACIONES PARA EL MODAL
        this.verPdf = this.verPdf.bind(this); //OPERACIONES PARA EL MODAL
        this.accionModal = this.accionModal.bind(this); //OPERACIONES PARA EL MODAL
    }
    huboError(perr){
        this.setState({
            msg: "Error de proceso",
            errorProc:true,
            "nromesa":"",
            "actualmesa":""
        });
    }
    componentDidMount() {
        cleanNavTitle("linkNROMESA");
        this.getDatosMesa();
    }
    getDatosMesaKey(event){
        this.setState({nromesa:event.target.value});
        if (event.keyCode === 13){
            this.getDatosMesa();
        }
    }
    getDatosMesa(){
        if (this.state.actualmesa === this.state.nromesa)
        return;

        if (myTrim(this.state.nromesa) !== ""){
            this.setState({"showLoading":true});
            setTimeout(this.buscarMesa,800);
        }
    }
    buscarMesa(){
        getDatosNroMesa(myTrim(this.state.nromesa)).then((res) => {
            if ( (res.data.cod !== undefined) && (res.data.cod !== null) ) {

                if (res.data.cod.toString() === "0"){
                    this.setState(
                        {
                            filtro:{
                                municipioId:0,
                                circuitoId:0,
                                establecimientoId:0,
                                mesaId:res.data.entity.mesaId
                            },
                            "actualmesa":myTrim(this.state.nromesa),
                            "nromesa":myTrim(this.state.nromesa),
                            "tipomesa":res.data.entity.tipomesa,
                            "establecimiento":res.data.entity.establecimiento,
                            "ubicacion":res.data.entity.ubicacion,
                            "cargos":res.data.entity.cargos,
                            "listas":res.data.entity.listas,
                            "ntelegramacodigo":res.data.entity.ntelegramacodigo,
                            "showWarning":false,
                            "showResults":true
                        }
                    );
                } else {
                        let msg = "Error de proceso, intentelo nuevamente.";
                        if ( (res.data.msg !== undefined) &&  (res.data.msg !== null) ) {
                            msg = res.data.msg;
                        }
                        if (res.data.cod === "1"){

                            this.setState({
                                    actualmesa:myTrim(this.state.nromesa),
                                    msg: msg,
                                    showWarning:true
                                });

                        }   else {
                                    this.setState({
                                        msg: msg,
                                        showWarning:true
                                    });
                        }

                }
            } else {
                        this.setState({
                            msg: "Error de proceso, intentelo nuevamente.",
                            showWarning:true
                        });
            }
             
        })
        .catch(
            (perr) => {
                this.huboError(perr);
            }
        ).then(
            () => {
            this.unSetLoading();
            }
        );
    }
    unSetLoading(){
        this.setState({"showLoading":false});
    }
    nuevabusqueda(){
        this.setState(
            {
            actualmesa:"",
            cuerpo:"",
            abrirModal:false,
            nromesa:"",
            tipomesa:"",
            establecimiento:"",
            ubicacion:"",
            cargos:[],
            listas:[],
            ntelegramacodigo:"",
            showWarning:false,
            showResults:false,
            showLoading:false,
            filtro:{
                municipioId:0,
                circuitoId:0,
                establecimientoId:0,
                mesaId:0
            }
            }
        );
    }
    cerrarPdf(){
        this.setState({abrirModal:false});
    }
    verPdf(pmesa) {
        let pathurl = "samples/" + this.state.ntelegramacodigo + ".PDF";
        const objStyle = {
            width: '100%',
            height:'650px'
        };
        this.setState({
            cuerpo:  (                
                <object style={objStyle} data={pathurl} type="application/pdf" ><embed src={pathurl} type="application/pdf" /></object>
            ), 
            abrirModal:true
        });
    }
    accionModal(params){
        if (params.action === "2"){
            this.setState({abrirModal:false});
        }
    }
    render() {
        let salida;
        let mensaje;
        let parametros = {
            "cuerpo":this.state.cuerpo,
            "boton1Style":{display:'none'},
            "boton2Txt":"Cerrar",
            "titulo":"MESA: " + this.state.actualmesa
        };

        if (this.state.showWarning){
            mensaje = (
                <article className="message is-info">
                <div className="message-header textoColor fondoColor">
                    <p>Mensaje</p>
                </div>
                <div className="message-body textoColor" style={{fontWeight:'bold'}}>
                    {this.state.msg}
                </div>
                </article>
            );
        }
        if (this.state.errorProc === true){
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

                const headerCargos = this.state.cargos.map((cargo,i) =>
                <th key={i} id={i} >
                    <abbr title="Mesa">{cargo}</abbr>
                </th>
                );

                const bodyCargos =   this.state.listas.map((lista, idx) => {
                    return (
                      <tr key={idx} >
                          <BodyCargosComp listas={lista} ></BodyCargosComp>
                      </tr>
                    )
                  });


                const styleResults = (this.state.showResults)?{}:{display:'none'};
                const styleSearch = (this.state.showResults)?{display:'none'}:{};
                let classLoading = (this.state.showLoading)?"is-loading ":"";
                classLoading += "button is-rounded textoColor fondoColor is-medium"; 

                const linkStyle = {
                    marginLeft:'10px',
                  };
                let mesaurl = "samples/"  + this.state.ntelegramacodigo + ".PDF";
                let resultadoComponente = null;
                if (this.state.showResults){
                    resultadoComponente = (
                        <div className="columns" style={styleResults} >
                        <div className="column has-text-centered" >
                            <GeneralResults linkTitle={"linkNROMESA"} filtroComponente={this.state.filtro} ></GeneralResults>
                        </div>
                    </div>
                    );
                }
                
                salida = (
                    <React.Fragment>
                        <Modal activo={this.state.abrirModal} parametros={parametros} cerrarModal={this.cerrarPdf} accionBotones={this.accionModal} ></Modal>
                        <div style={styleSearch} >
                            <div className="columns">
                                <div className="column is-one-quarter is-hidden-touch"></div>
                                    <div className="column is-half has-text-centered">
                                        <div className="field">
                                            <div className="control has-text-centered" >
                                                <input style={{width:'210px'}} className="input is-rounded" type="text" onChange={this.getDatosMesaKey} onKeyDown={this.getDatosMesaKey} value={this.state.nromesa} placeholder="Pruebe ingresando 2000" />
                                            </div>
                                        </div>
                                    </div>
                                <div className="column is-one-quarter is-hidden-touch"></div>
                            </div>
                            <div className="columns">
                                <div className="column is-one-quarter is-hidden-touch"></div>
                                    <div className="column is-half has-text-centered">
                                        <button className={classLoading} onClick={this.getDatosMesa} >Consultar</button>
                                    </div>
                                <div className="column is-one-quarter is-hidden-touch"></div>
                            </div>
                            <div className="columns">
                                <div className="column is-one-quarter is-hidden-touch"></div>
                                    <div className="column is-half has-text-centered">
                                        {mensaje}
                                    </div>
                                <div className="column is-one-quarter is-hidden-touch"></div>
                            </div>
                        </div>
                        <div className="columns" style={styleResults} >
                            <div className="column is-one-quarter has-text-centered">
                                    <button style={{marginBottom:'15px'}} className="button is-rounded textoColor fondoColor" onClick={this.nuevabusqueda} >Nueva consulta</button>
                                    <br/>
                                    <table className="table is-striped is-fullwidth is-bordered is-hoverable is-size-7-touch">
                                        <thead>
                                            <tr>
                                                <th><abbr title="Filtro aplicado">Info de la mesa</abbr></th>
                                                <th>
                                                    <a target="_blank" rel="noopener noreferrer" className="button is-light" href={mesaurl} >
                                                        <img src={down32} alt="Descargar" title="Descargar" />
                                                    </a>
                                                    <button style={linkStyle} className="button is-info is-hidden-touch textoColor fondoColor" onClick={this.verPdf} >Ver mesa</button>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>N&uacute;mero de mesa</td>
                                                <td>{this.state.nromesa}</td>
                                            </tr>
                                            <tr>
                                                <td>Telegrama</td>
                                                <td>{this.state.ntelegramacodigo}</td>
                                            </tr>
                                            <tr>
                                                <td>Tipo de mesa</td>
                                                <td>{this.state.tipomesa}</td>
                                            </tr>
                                            <tr>
                                                <td>Establecimiento</td>
                                                <td>{this.state.establecimiento}</td>
                                            </tr>
                                            <tr>
                                                <td>Ubicaci&oacute;n</td>
                                                <td>{this.state.ubicacion}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                            </div>
                            <div className="column is-three-quarter has-text-centered">
                                <table className="table is-fullwidth is-bordered is-hoverable is-size-7-touch">
                                <thead>
                                    <tr>
                                    <th><abbr title="Lista" >Lista</abbr></th>
                                    {headerCargos}
                                    </tr>
                                </thead>
                                <tbody>
                                    {bodyCargos}
                                </tbody>
                                </table> 
                            </div>
                        </div>
                        <div className="columns" style={styleResults} >
                            <div className="column has-text-centered" >
                                <div style={{height:'1px',width:'100%',borderStyle:'solid',borderWidth:'1px',borderColor:'black'}} ></div>
                            </div>
                        </div>
                        {resultadoComponente}
                    </React.Fragment>
                );
        }
      return (      
            salida
      );
    }
  }
  export default TableResults