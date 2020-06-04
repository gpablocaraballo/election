import React from 'react';

function BodyCargosComp(props) {
  const listas = props.listas;
  
  const salida = listas.map((item,idx) =>
    <td key={idx} >{item}</td>
  );

  return (
    salida
  );
}

export default BodyCargosComp;