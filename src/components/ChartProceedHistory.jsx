import React from 'react';
import {Line} from 'react-chartjs-2';
import {Card, CardHeader, CardText} from 'material-ui/Card';

let dataForChart = {
      labels: [],
      datasets: [
          {
            label: "Proceed",
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            data: []
          }
        ]
    };

export class ChartProceedHistoryComponent extends React.Component {

  render() {

    let title = (<h3>{this.props.title}</h3>);
    let subTitle = (<h3>{this.props.subTitle}</h3>);
    let stateTmp = dataForChart;
    stateTmp.datasets[0].data = this.props.dataForChart.value;
    stateTmp.labels = this.props.dataForChart.date;
    return (
      <div>
        <Card style={this.props.style} >
          <CardHeader
            title={title}
            subtitle={subTitle}
            actAsExpander={true}
          />
          <CardText expandable={false}>
            <Line data={stateTmp} />
          </CardText>
        </Card>
      </div>
    );
  }
}
