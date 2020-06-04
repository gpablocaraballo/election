import React from 'react';
import down32 from '../../assets/download32.png';

class ButtonLink extends React.Component {
  constructor(props) {
    super(props);
    this.viewFileButton = this.viewFileButton.bind(this);
  }
  viewFileButton(){
    this.props.verArchivo(this.props.pmesa);
  }
  render() {
    const linkStyle = {
      marginLeft:'10px'
    };
    let mesaurl = "samples/"  + this.props.pmesa + ".PDF";
    return (
      <React.Fragment>
        <a target="_blank" rel="noopener noreferrer" className="button is-light" href={mesaurl} ><img src={down32} alt="Descargar" title="Descargar" /></a>
        <button style={linkStyle} className="button is-info is-hidden-touch textoColor fondoColor" onClick={this.viewFileButton} >Ver</button>
      </React.Fragment>
    );
  }
}
export default ButtonLink;