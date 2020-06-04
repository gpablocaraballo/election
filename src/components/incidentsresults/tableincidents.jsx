import React from 'react';
import ButtonLink from './buttonlink.jsx';

class TableIncidents extends React.Component {
  constructor(props) {
    super(props);
    this.verArchivoTabla = this.verArchivoTabla.bind(this);
  }
  verArchivoTabla(pmesa){
    this.props.abrirModal(pmesa);
  }
  render() {
    const spanStyle = {fontSize:'0.7em'};

    const tabla = this.props.mesas.map((mesa) =>
  
      <tr key={mesa.mesa} id={mesa.mesa} >
          <td className="is-hidden-touch" >{mesa.departamento}</td>
          <td className="is-hidden-touch" >{mesa.municipio}</td>
          <td className="is-hidden-desktop" >
            {mesa.departamento}/{mesa.municipio}
            <span style={spanStyle} ><br/>{mesa.establecimiento}</span>
          </td>
          <td>{mesa.mesa}</td>
          <td className="is-hidden-touch" >{mesa.tipo}</td>
          <td className="is-hidden-touch" >{mesa.establecimiento}</td>
          <td className="is-hidden-touch" >{mesa.detalle}</td>
          <td>
            <ButtonLink verArchivo={this.verArchivoTabla}  pmesa={mesa.telegrama} />
          </td>
      </tr>

    );

    return (
        <table className="table is-striped is-fullwidth is-bordered is-hoverable">
          <thead>
              <tr>
              <th className="is-hidden-touch" ><abbr title="Departamento">Departamento</abbr></th>
              <th className="is-hidden-touch" ><abbr title="Municipio">Municipio</abbr></th>
              <th className="is-hidden-desktop" ><abbr title="Depto/Municipio">Dto/Mun</abbr></th>
              <th><abbr title="Mesa">Mesa</abbr></th>
              <th className="is-hidden-touch" ><abbr title="Tipo">Tipo</abbr></th>
              <th className="is-hidden-touch" ><abbr title="Establecimiento">Establecimiento</abbr></th>
              <th className="is-hidden-touch" ><abbr title="Detalle de la incidencia">Desc.</abbr></th>
              <th><abbr title="Operaciones">Oper.</abbr></th>
              </tr>
          </thead>
          <tbody>
            {tabla}
          </tbody>
        </table> 
    );
  }
}
export default TableIncidents;