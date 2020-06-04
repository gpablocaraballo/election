import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';

class ChartMesasEscrutadas extends React.Component {
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
    if (this.props.porcmesasescrutadas !== prevProps.porcmesasescrutadas){
      this.setState({
        "data":this.getInitialState()
      });
    }
  }
  getInitialState() {
    let tdatasets = [Number(this.props.porcmesasescrutadas)];
    tdatasets.push(0); //para mostrar los rangos de porcentaje 0 a 100 es necesario agregarlos.
    tdatasets.push(100);

    return {
      labels: [""], //NO MOSTRAMOS
      datasets: [
        {
          data: tdatasets,
          label: 'Mesas escrutadas %',
          fill: false,
          lineTension: 0.1,
          backgroundColor: ['#15539B'],
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
        display: true, //Texto arriba de grafico
        text: 'MESAS ESCRUTADAS ' + this.props.porcmesasescrutadas + '%'
      },
      maintainAspectRatio:false
    };
    
    return (
      <React.Fragment>
        <HorizontalBar height={100} data={this.state.data} options={options}  />
      </React.Fragment>

    );
  }
}
export default ChartMesasEscrutadas;
