import React from 'react';
import {Line} from 'react-chartjs-2';

export class ChartComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      labels: props.currencyHistory.time,
      datasets: [
          {
            label: props.currency[0].name,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.currencyHistory.data
          },
          {
            label: `${props.currency[0].name}-Bitso`,
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,255,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,255,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 3,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,255,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.currencyHistory.dataBitso
          }
        ]
    };
  }

  componentDidCatch(error, info) {
    console.log("------------------");
  }

  componentWillReceiveProps(nextProps){
    if(this.props.refreshChart){
      let stateTmp = this.state;
      stateTmp.datasets[0].data = nextProps.currencyHistory.data;
      stateTmp.datasets[1].data = nextProps.currencyHistory.dataBitso;
      stateTmp.labels = nextProps.currencyHistory.time;
      this.props.setUpdateToFalse(this.props.currency[0].name);
      this.setState({stateTmp});
    }
  }

  shouldComponentUpdate(nextProps,nextState){
    return this.props.refreshChart;
  }

  render() {

    return (
      <div>
          <Line data={this.state} />
      </div>
    );
  }
}
