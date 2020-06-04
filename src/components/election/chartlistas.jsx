import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

class ChartListas extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {data:{}}
  }
  componentDidMount() {
    this.setState({
      "data":this.getInitialState()
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.agrupaciones !== prevProps.agrupaciones){
      this.setState({
        "data":this.getInitialState()
      });
    }
  }
  randomScalingFactor() {
    return (Math.random() > 0.5
      ? 1.0
      : -1.0) * Math.round(Math.random() * 100)
  }
  randomColorFactor(){
    return Math.floor(Math.random() * 255) + 0;
  }
  randomColor(opacity) {
    return 'rgba(' + this.randomColorFactor() + ',' + this.randomColorFactor() + ',' + this.randomColorFactor() + ',0.7)'
  }
  getInitialState() {
    let tlabels = [];
    let tdatasets = [];
    for (let i=0;i<this.props.agrupaciones.length;i++){
      tlabels.push(this.props.agrupaciones[i].lista + " " + this.props.agrupaciones[i].votos + " VOTOS");      
      tdatasets.push(
        Number(this.props.agrupaciones[i].porcentaje) //ESTE ES EL QUE MANDA EN LA X
      );
    }
    tdatasets.push(0); //para mostrar los rangos de porcentaje 0 a 100 es necesario agregarlos.
    tdatasets.push(100);

    return {
      labels: tlabels,
      datasets: [
        {
          data: tdatasets,
          label: 'Porcentaje',
          fill: false,
          lineTension: 0.1,
          backgroundColor: ['black','green', 'blue', 'yellow'],
          borderColor: 'black',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10
        }
      ]
    };
  }
  render() {
    const options = {
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each bar to be 2px wide and green
      elements: {
        rectangle: {
          borderWidth: 1,
          borderColor: 'rgb(15, 15, 15)',
          //borderSkipped: 'bottom'
        }
      },
      responsive: true,
      legend: {
        position: 'top',
        display:false //OCULTAMOS EL RECTANGULO
      },
      title: {
        display: false, //Texto arriba de grafico
        text: 'Agrupaciones políticas'
      },
      maintainAspectRatio:false
    };
    
    return (
      <React.Fragment>
        <HorizontalBar data={this.state.data} options={options}  />
      </React.Fragment>

    );
  }
}
export default ChartListas;
