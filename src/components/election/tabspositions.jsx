import React from 'react';
import LiPosition from './liposition.jsx';

class TabsPositions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {vActivos: {}};
    this.clickEvt = this.clickEvt.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.activeposition !== prevProps.activeposition){
      let tmpActivos = {};
      tmpActivos["0"] = "";
      for (let i=0;i<this.props.positions.length;i++){
        tmpActivos[this.props.positions[i].id] = "";
      }
      tmpActivos[this.props.activeposition] = "is-active";
      this.setState({
        vActivos: tmpActivos
      });
      return true;
    }
  }
  clickEvt(pid){   
    if (this.props.activeposition !== pid){
      this.props.verCargoResultados(pid);
    }
  }
  render() {

    let lis = this.props.positions.map((cargo) =>
      <LiPosition key={cargo.id} id={cargo.id} pid={cargo.id} clase={this.state.vActivos[cargo.id]} clickEvt={this.clickEvt} nombre={cargo.nombre} ></LiPosition>
    );

    return (
      <div className="tabs">
        <ul>
          {lis}
        </ul>
      </div>
    );

  }
}
export default TabsPositions;