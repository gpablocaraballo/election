import React from 'react';
//import { cleanNavTitle, getPositions, getDatosResultados } from '../common/utils';
import { cleanNavTitle, getDatosResultados } from '../common/utils';
import TabsPositions from '../election/tabspositions.jsx';
import TableAgrup from '../election/tableagrup.jsx';
import TableTotalVotos from '../election/tabletotalvotos.jsx';
import TableVotantes from '../election/tablevotantes.jsx';
import ChartListas from '../election/chartlistas.jsx'
import ChartMesasEscrutadas from '../election/chartmesasescrutadas.jsx'
//REDUX
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {loadingPositions, loadingResult, typeResponsePositions, typeResponseResultados} from '../../redux/actions/loadResult';
//import findResults from '../../redux/actions/findResults'; //acciones de redux


class GeneralResults extends React.Component {
    constructor(props) {
      super(props);
      this.state =  {
                    positions: [], 
                    errorProc:false, 
                    msg:"", 
                    defaultposition:0, 
                    agrupaciones: [], 
                    totales: [],
                    porcmesasescrutadas:"",
                    mesasyvotantes:
                                    {
                                        "mesashab":
                                        {
                                            "total":"",
                                            "escrutadas":{"total":"","porcentaje":""},
                                            "incidencia":{"total":"","porcentaje":""},
                                            "pendientes":{"total":"","porcentaje":""}
                                        },
                                        "votanteshab":
                                        {
                                            "total":"",
                                            "escrutadas":{"total":"","porcentaje":""},
                                            "impugnadas":{"total":"","porcentaje":""}
                                        }
                                    }
                    };
      this.verCargoResultados = this.verCargoResultados.bind(this);
    }
    huboError(perr){
        this.setState({
            msg: "Error de proceso",
            errorProc:true
          });
    }
    componentDidMount() {
        let linkTitle = "linkRESGRALES";
        if (this.props.linkTitle !== undefined) linkTitle = this.props.linkTitle;
        cleanNavTitle(linkTitle);
        this.inicializarResultados({});
    }
    componentDidUpdate(prevProps) {
        if ((this.props.filtroComponente !== undefined) && (this.props.filtroComponente !== prevProps.filtroComponente)){
            this.inicializarResultados(this.props.filtroComponente);
        }
    }
    inicializarResultados(pFiltroComponente){
        this.props.loadingPositions(pFiltroComponente);
        /*
        getPositions(pFiltroComponente).then((res) => {
            if (res.data.entity != null){
                let tdefaultposition = 0;
                if (res.data.entity.length > 0){
                    tdefaultposition = res.data.entity[0].id;
                    this.getResultados(tdefaultposition);
                }
                this.setState({"positions":res.data.entity, "defaultposition": tdefaultposition});
            }
        })
        .catch(
            (perr) => {
                this.huboError(perr);
            }
        ).then(function() {

        });
        */
    }
    getResultados(pPosId){
        getDatosResultados(pPosId).then((res) => {
            if (res.data.entity != null){
                this.setState(
                    {
                        "agrupaciones":res.data.entity.agrupaciones,
                        "totales":res.data.entity.totales,
                        "mesasyvotantes":res.data.entity.mesasyvotantes,
                        "porcmesasescrutadas":res.data.entity.porcmesasescrutadas
                    });
            }
        })
        .catch(
            (perr) => {
                this.huboError(perr);
            }
        ).then(function() {

        });
    }
    verCargoResultados(pid){
        //this.setState({defaultposition: pid});
        //this.getResultados(pid);
        this.props.loadingResult({"positions":this.props.datos.payload.positions,"defaultposition":pid});
    }
    render() {
        let salida;
        let positions = [];
        let defaultposition = 0;
        let agrupaciones = [];
        let totales= [];
        let porcmesasescrutadas  = "";
        let mesasyvotantes  = 
                        {
                            "mesashab":
                            {
                                "total":"",
                                "escrutadas":{"total":"","porcentaje":""},
                                "incidencia":{"total":"","porcentaje":""},
                                "pendientes":{"total":"","porcentaje":""}
                            },
                            "votanteshab":
                            {
                                "total":"",
                                "escrutadas":{"total":"","porcentaje":""},
                                "impugnadas":{"total":"","porcentaje":""}
                            }
                        };

        if (this.props.datos.payload !== undefined && !this.props.datos.payload.error && this.props.datos.type === typeResponseResultados){
            if (this.props.datos.payload.positions !== undefined && this.props.datos.payload.positions !== null && this.props.datos.payload.positions.length > 0)
            positions = this.props.datos.payload.positions;
            defaultposition = this.props.datos.payload.defaultposition;
            agrupaciones = this.props.datos.payload.agrupaciones;
            totales = this.props.datos.payload.totales;
            mesasyvotantes = this.props.datos.payload.mesasyvotantes;
            porcmesasescrutadas = this.props.datos.payload.porcmesasescrutadas;
        }

        if (this.props.datos.payload !== undefined && this.props.datos.payload.error){
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
                        <TabsPositions activeposition={defaultposition} positions={positions} verCargoResultados={this.verCargoResultados} ></TabsPositions>
                        
                        <div className="columns is-size-7-touch">
                            <div className="column">
                                <TableAgrup agrupaciones={agrupaciones} ></TableAgrup>
                            </div>
                            <div className="column">
                                <TableTotalVotos votos={totales} ></TableTotalVotos>
                            </div>
                            <div className="column">
                                <TableVotantes mesasyvotantes={mesasyvotantes} ></TableVotantes>
                            </div>
                        </div>
                        <div className="columns is-vcentered is-centered">
                            <div className="column">
                                <ChartMesasEscrutadas porcmesasescrutadas={porcmesasescrutadas} ></ChartMesasEscrutadas>
                            </div>
                            <div className="column">
                                <ChartListas agrupaciones={agrupaciones} ></ChartListas>
                            </div>
                        </div>

                    </React.Fragment>
                );
        }

      return (
                    
            salida
        
      );
    }
  }


const mapStateToProps = state => ({
    datos: state.election,
    //datos: state.result,
});

const mapDispatchToProps = {
    loadingPositions,
    loadingResult
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(GeneralResults)
);