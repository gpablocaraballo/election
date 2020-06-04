import React from 'react';

class ComboComp extends React.Component {
  constructor(props) {
    super(props);
    this.changeEvt = this.changeEvt.bind(this);
  }
  changeEvt(event){    
    //let index = event.nativeEvent.target.selectedIndex; //Con nativeElement funcionaria tambien
    //let valor = event.nativeEvent.target[index].text; //Con nativeElement funcionaria tambien

    let index = event.target.selectedIndex;
    let valorTxt = event.target[index].text;
    let valorId = event.target.value;

    this.props.changeEvt(valorId, valorTxt);

  }
  render() {
    const isLoadingCls = (this.props.isLoading)?"select is-rounded is-loading":"select is-rounded";
    const combodatos= this.props.datos.map((item) =>
      <option key={item.id} id={item.id} value={item.id} >{item.nombre}</option>
    );

    return (
      <React.Fragment>
        <div className={isLoadingCls} >
          <select onChange={this.changeEvt} value={this.props.value} >
            {combodatos}
          </select>
        </div>
      </React.Fragment>
    );
  }
}
export default ComboComp;