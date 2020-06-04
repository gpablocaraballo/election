import React from 'react';

class TableTotalVotos extends React.Component {
  render() {

    const tabla = this.props.votos.map((voto) =>
  
      <tr key={voto.nombre} id={voto.nombre} >
          <td>{voto.nombre}</td>
          <td>{voto.votos}</td>
          <td>{voto.porcentaje}</td>
      </tr>

    );

    return (
        <table className="table is-striped is-fullwidth is-bordered is-hoverable">
          <thead>
              <tr>
                <th><abbr title="Agrupaciones politicas">TOTAL DE</abbr></th>
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
export default TableTotalVotos;