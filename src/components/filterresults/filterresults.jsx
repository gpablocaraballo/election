import React from 'react';
import { cleanNavTitle, getDatosMunicipios, getDatosCircuitos, getDatosEstablecimientos, getDatosMesas } from '../common/utils';
import ComboComp from '../common/combocomp.jsx';
import GeneralResults from '../generalresults/generalresults.jsx'

class FilterResults extends React.Component {
    constructor(props) {
      super(props);
      this.state =  {
                    firstLoadData:false,
                    municipios: [], 
                    circuitos: [],
                    establecimientos: [],
                    mesas: [],
                    filtro:{
                        municipioId:0,
                        circuitoId:0,
                        establecimientoId:0,
                        mesaId:0,
                        municipioTxt:"Todos los municipios",
                        circuitoTxt:"Todos los circuitos",
                        establecimientoTxt:"Todos los establecimientos",
                        mesaTxt:"Todas las mesas"
                    },
                    errorProc:false, 
                    msg:"",
                    showLoading:false,
                    showFilters:false,
                    showResults:false,
                    circuitoLoading:false,
                    establecimientoLoading:false,
                    mesaLoading:false
                    };
        this.getCircuitosPre = this.getCircuitosPre.bind(this);
        this.getEstablecimientosPre = this.getEstablecimientosPre.bind(this);
        this.getMesasPre = this.getMesasPre.bind(this);
        this.buscarPre = this.buscarPre.bind(this);
        this.buscar = this.buscar.bind(this);
        this.nuevabusqueda = this.nuevabusqueda.bind(this);
        this.unSetLoading = this.unSetLoading.bind(this);
        this.baseState = {
            municipios: [], 
            circuitos: [],
            establecimientos: [],
            mesas: []
        }
    }
    huboError(perr){
        this.setState({
            msg: "Error de proceso",
            errorProc:true
        });
    }
    componentDidMount() {
        cleanNavTitle("linkCONSULTAFILTRO");
        this.getMunicipios();
    }
    getMunicipios(){
        getDatosMunicipios().then((res) => {
                if (res.data.entity != null){
                        this.setState({"municipios":res.data.entity});
                        this.getCircuitos(this.state.filtro);
                }
            })
            .catch(
                (perr) => {
                    this.huboError(perr);
                }
            ).then(function() {
    
            });
    }
    getCircuitosPre(pMunicipioId,pMunicipioTxt){
        const filtro = {
            municipioId:pMunicipioId,
            circuitoId:0,
            establecimientoId:0,
            mesaId:0,
            municipioTxt:pMunicipioTxt,
            circuitoTxt:"Todos los circuitos",
            establecimientoTxt:"Todos los establecimientos",
            mesaTxt:"Todas las mesas"
        };
        this.setState({
            filtro:filtro,
            circuitoLoading:true,
            establecimientoLoading:true,
            mesaLoading:true
        });
        this.getCircuitos(filtro);
    }
    getCircuitos(pFiltro){
        getDatosCircuitos(pFiltro).then((res) => {
            if (res.data.entity != null){
                this.setState({"circuitos":res.data.entity});
                this.getEstablecimientos(this.state.filtro);
            }
        })
        .catch(
            (perr) => {
                this.huboError(perr);
            }
        ).then(function() {

        });
    }
    getEstablecimientosPre(pCircuito,pCircuitoTxt){
        const filtro = {
            municipioId:this.state.filtro.municipioId,
            circuitoId:pCircuito,
            establecimientoId:0,
            mesaId:0,
            municipioTxt:this.state.filtro.municipioTxt,
            circuitoTxt:pCircuitoTxt,
            establecimientoTxt:"Todos los establecimientos",
            mesaTxt:"Todas las mesas"
        };
        this.setState({
            filtro:filtro,
            establecimientoLoading:true,
            mesaLoading:true
        });
        this.getEstablecimientos(filtro);
    }
    getEstablecimientos(pFiltro){
        getDatosEstablecimientos(pFiltro).then((res) => {
            if (res.data.entity != null){
                this.setState({"establecimientos":res.data.entity});
                this.getMesas(this.state.filtro);
            }
        })
        .catch(
            (perr) => {
                this.huboError(perr);
            }
        ).then(function() {

        });
    }
    getMesasPre(pEstablecimiento,pEstablecimientoTxt){
        const filtro = {
            municipioId:this.state.filtro.municipioId,
            circuitoId:this.state.filtro.circuitoId,
            establecimientoId:pEstablecimiento,
            mesaId:0,
            municipioTxt:this.state.filtro.municipioTxt,
            circuitoTxt:this.state.filtro.circuitoTxt,
            establecimientoTxt:pEstablecimientoTxt,
            mesaTxt:"Todas las mesas"
        };
        this.setState({
            filtro:filtro,
            mesaLoading:true
        });
        this.getMesas(filtro);
    }
    getMesas(pFiltro){
        getDatosMesas(pFiltro).then((res) => {
            if (res.data.entity != null){
                this.setState({"mesas":res.data.entity});

                //DEJO UNA COPIA ORIGINAL DE LOS COMBOS LA PRIMERA VEZ QUE CARGO EL COMPONENTE
                if (this.state.firstLoadData === false){
                    this.setState({firstLoadData:true});
                    this.baseState.municipios = this.state.municipios;
                    this.baseState.circuitos = this.state.circuitos;
                    this.baseState.establecimientos = this.state.establecimientos;
                    this.baseState.mesas = this.state.mesas;
                }
            }
        })
        .catch(
            (perr) => {
                this.huboError(perr);
            }
        ).then(    
            () => {
            //this.unSetLoading();
            setTimeout(this.unSetLoading,800);
            }
        );
    }
    unSetLoading(){
        this.setState({
            circuitoLoading:false,
            establecimientoLoading:false,
            mesaLoading:false
        });
    }
    nuevabusqueda(){
        this.setState({
            showFilters:false,
            showLoading:false,
            showResults:false,
            municipios:this.baseState.municipios,
            circuitos:this.baseState.circuitos,
            establecimientos:this.baseState.establecimientos,
            mesas:this.baseState.mesas,
            filtro:{
                municipioId:0,
                circuitoId:0,
                establecimientoId:0,
                mesaId:0,
                municipioTxt:"Todos los municipios",
                circuitoTxt:"Todos los circuitos",
                establecimientoTxt:"Todos los establecimientos",
                mesaTxt:"Todas las mesas"
            }
        });
    }
    buscarPre(pmesaId,pMesaTxt){
        let filtro = this.state.filtro;
        
        if (pmesaId !== undefined){
            filtro.mesaId = pmesaId;
        } 
        if (pMesaTxt !== undefined){
            filtro.mesaTxt = pMesaTxt;
        }
        this.setState({filtro:filtro});
        this.buscar();
    }
    buscar(){        
        this.setState({showFilters:true,showLoading:true,showResults:true});
    }
    render() {
        let salida;
        let huboError = this.state.errorProc;

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

                const styleFiltro = (this.state.showFilters)?{display:'none'}:{};
                const styleResults = (this.state.showResults)?{}:{display:'none'};
                let resultadoComponente = null;
                if (this.state.showResults){
                    resultadoComponente = (
                        <div className="columns" style={styleResults} >
                        <div className="column has-text-centered" >
                            <GeneralResults linkTitle={"linkCONSULTAFILTRO"} filtroComponente={this.state.filtro} ></GeneralResults>
                        </div>
                    </div>
                    );
                }
                salida = (
                    <React.Fragment>
                        <div style={styleFiltro} >
                            <div className="columns">
                                <div className="column is-one-quarter is-hidden-touch"></div>
                                    <div className="column is-half has-text-centered">
                                        <ComboComp datos={this.state.municipios} value={this.state.filtro.municipioId} isLoading={false} changeEvt={this.getCircuitosPre} ></ComboComp>
                                    </div>
                                <div className="column is-one-quarter is-hidden-touch"></div>
                            </div>
                            <div className="columns">
                                <div className="column is-one-quarter is-hidden-touch"></div>
                                    <div className="column is-half has-text-centered">
                                        <ComboComp datos={this.state.circuitos} value={this.state.filtro.circuitoId} isLoading={this.state.circuitoLoading} changeEvt={this.getEstablecimientosPre} ></ComboComp>
                                    </div>
                                <div className="column is-one-quarter is-hidden-touch"></div>
                            </div>
                            <div className="columns">
                                <div className="column is-one-quarter is-hidden-touch"></div>
                                    <div className="column is-half has-text-centered">
                                        <ComboComp datos={this.state.establecimientos} value={this.state.filtro.establecimientoId} isLoading={this.state.establecimientoLoading} changeEvt={this.getMesasPre} ></ComboComp>
                                    </div>
                                <div className="column is-one-quarter is-hidden-touch"></div>
                            </div>
                            <div className="columns">
                                <div className="column is-one-quarter is-hidden-touch"></div>
                                        <div className="column is-half has-text-centered">
                                            <ComboComp datos={this.state.mesas} value={this.state.filtro.mesaId} isLoading={this.state.mesaLoading} changeEvt={this.buscarPre} ></ComboComp>
                                        </div>
                                <div className="column is-one-quarter is-hidden-touch"></div>
                            </div>
                            <div className="columns">
                                <div className="column is-one-quarter is-hidden-touch"></div>
                                        <div className="column is-half has-text-centered">
                                            <button className="button is-rounded textoColor fondoColor is-medium" onClick={this.buscar} >Consultar</button>
                                        </div>
                                <div className="column is-one-quarter is-hidden-touch"></div>
                            </div>
                        </div>
                        <div className="columns" style={styleResults} >
                                <div className="column is-half">
                                    <table className="table is-striped is-fullwidth is-bordered is-hoverable is-size-7-touch">
                                        <thead>
                                            <tr>
                                                <th><abbr title="Filtro aplicado">Filtro aplicado</abbr></th>
                                                <th><abbr title="Valor">Valor</abbr></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Municipio</td>
                                                <td>{this.state.filtro.municipioTxt}</td>
                                            </tr>
                                            <tr>
                                                <td>Circuito</td>
                                                <td>{this.state.filtro.circuitoTxt}</td>
                                            </tr>
                                            <tr>
                                                <td>Establecimiento</td>
                                                <td>{this.state.filtro.establecimientoTxt}</td>
                                            </tr>
                                            <tr>
                                                <td>Mesa</td>
                                                <td>{this.state.filtro.mesaTxt}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="column is-half">
                                    <button className="button is-rounded textoColor fondoColor is-medium" onClick={this.nuevabusqueda} >Nueva consulta</button>
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
  export default FilterResults