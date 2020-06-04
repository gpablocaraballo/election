import React from 'react';

function TableVotantes(props) {
  const styleTdTitle = {fontWeight:'bold'};
  const styleTRMid = {
        borderTopStyle: 'solid',
        borderTopWidth: '2px'
  }
  return (
      <table className="table is-fullwidth is-bordered is-hoverable" >
        <tbody>
          <tr>
            <td style={styleTdTitle} >Mesas Habilitadas.</td>
            <td colSpan="2" >{props.mesasyvotantes.mesashab.total}</td>
          </tr>
          <tr>
            <td style={styleTdTitle} >Escrutadas</td>
            <td>{props.mesasyvotantes.mesashab.escrutadas.total}</td>
            <td>{props.mesasyvotantes.mesashab.escrutadas.porcentaje} %</td>
          </tr>
          <tr>
            <td style={styleTdTitle} >Incidencia Definitiva</td>
            <td>{props.mesasyvotantes.mesashab.incidencia.total}</td>
            <td>{props.mesasyvotantes.mesashab.incidencia.porcentaje} %</td>
          </tr>
          <tr>
            <td style={styleTdTitle} >Pendientes o en Proceso</td>
            <td>{props.mesasyvotantes.mesashab.pendientes.total}</td>
            <td>{props.mesasyvotantes.mesashab.pendientes.porcentaje} %</td>
          </tr>


          <tr style={styleTRMid} >
            <td style={styleTdTitle} >Votantes Habilitados.</td>
            <td colSpan="2" >{props.mesasyvotantes.votanteshab.total}</td>
          </tr>
          <tr>
            <td style={styleTdTitle} >Votos Escrutados</td>
            <td>{props.mesasyvotantes.votanteshab.escrutadas.total}</td>
            <td>{props.mesasyvotantes.votanteshab.escrutadas.porcentaje} %</td>
          </tr>
          <tr>
            <td style={styleTdTitle} >Votos Impugnados</td>
            <td>{props.mesasyvotantes.votanteshab.impugnadas.total}</td>
            <td>{props.mesasyvotantes.votanteshab.impugnadas.porcentaje} %</td>
          </tr>
        </tbody>
      </table>
  );
}
export default TableVotantes;
