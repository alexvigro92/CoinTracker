import React from 'react';
import {Line} from 'react-chartjs-2';
import {Card, CardHeader, CardText} from 'material-ui/Card';

export class ChartProceedsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      datasets: [
          {
            label: props.dataForCharts.bitcoin.coinName,
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: []
          },
          {
            label: props.dataForCharts.bitcash.coinName,
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(245,167,86,0.4)',
            borderColor: 'rgba(245,167,86,1)',
            pointBorderColor: 'rgba(245,167,86,1)',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: 'rgba(245,167,86,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: []
          },
          {
            label: props.dataForCharts.ethereum.coinName,
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(46,91,145,0.4)',
            borderColor: 'rgba(46,91,145,1)',
            pointBorderColor: 'rgba(46,91,145,1)',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: 'rgba(46,91,145,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: []
          },
          {
            label: props.dataForCharts.ripple.coinName,
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(200,101,96,0.4)',
            borderColor: 'rgba(200,101,96,1)',
            pointBorderColor: 'rgba(200,101,96,1)',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: 'rgba(200,101,96,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: []
          },
          {
            label: props.dataForCharts.litecoin.coinName,
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(173,199,104,0.4)',
            borderColor: 'rgba(173,199,104,1)',
            pointBorderColor: 'rgba(173,199,104,1)',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: 'rgba(173,199,104,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: []
          }
        ]
    };
  }

  componentWillReceiveProps(nextProps){
    let stateTmp = this.state;
    stateTmp.datasets[0].data = nextProps.dataForCharts.bitcoin.proceed;
    stateTmp.datasets[1].data = nextProps.dataForCharts.bitcash.proceed;
    stateTmp.datasets[2].data = nextProps.dataForCharts.ethereum.proceed;
    stateTmp.datasets[3].data = nextProps.dataForCharts.ripple.proceed;
    stateTmp.datasets[4].data = nextProps.dataForCharts.litecoin.proceed;
    stateTmp.labels = nextProps.dataForCharts.time;
    this.setState({stateTmp});
  }

  render() {

    let title = (<h3>{this.props.title}</h3>);
    let subTitle = (<h3>{this.props.subTitle}</h3>);

    return (
      <div>
        <Card style={this.props.style} >
          <CardHeader
            title={title}
            subtitle={subTitle}
            actAsExpander={true}
          />
          <CardText expandable={false}>
            <Line data={this.state} />
          </CardText>
        </Card>
      </div>
    );
  }
}
