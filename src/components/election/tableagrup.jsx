import React from 'react';

class TableAgrup extends React.Component {
  render() {

    const tabla = this.props.agrupaciones.map((lista) =>
  
      <tr key={lista.lista} id={lista.lista} >
          <td>{lista.lista}</td>
          <td>{lista.votos}</td>
          <td>{lista.porcentaje}</td>
      </tr>

    );

    return (
        <table className="table is-striped is-fullwidth is-bordered is-hoverable">
          <thead>
              <tr>
                <th><abbr title="Agrupaciones politicas">AGRUPACIONES POLITICAS</abbr></th>
                <th><abbr title="Votos">VOTOS</abbr></th>
                <th><abbr title="Porcentaje">%</abbr></th>
              </tr>
          </thead>
          <tbody>
            {tabla}
          </tbody>
        </table> 
    );
  }
}
export default TableAgrup;