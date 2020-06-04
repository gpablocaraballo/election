import React from 'react';

class LiPosition extends React.Component {
  constructor(props) {
    super(props);
    this.clickEvt = this.clickEvt.bind(this);
  }
  clickEvt(){
    this.props.clickEvt(this.props.pid);
  }
  render() {
    const styleALink = {textDecoration:'none'}
    return (
      <React.Fragment>
        <li className={this.props.clase} onClick={this.clickEvt} ><a style={styleALink} >{this.props.nombre}</a></li>
      </React.Fragment>
    );
  }
}
export default LiPosition;