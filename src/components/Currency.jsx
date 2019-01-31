import React from 'react';
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import { ChartComponent } from './Chart';
import IconButton from 'material-ui/IconButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const buttonThumbsUp = {
  color: '#00CC00'
}
const buttonThumbsDown = {
  color: '#CC0000'
}
const buttonEquals = {
  color: '#0000CC'
}

export class CurrencyComponent extends React.Component {

  render() {
    let costoMarketCap = [];
    let costoBitso = [];
    let title = "";
    let subtitle = "";
    let sellOrBuyMarket = "";
    let sellOrBuyBitso = "";
    let sellIcon = (<IconButton iconStyle={buttonThumbsUp} iconClassName="fa fa-thumbs-up" tooltip="Sell" tooltipPosition="left-center"/>);
    let buyIcon = (<IconButton iconStyle={buttonThumbsDown} iconClassName="fa fa-thumbs-down" tooltip="Buy" tooltipPosition="left-center"/>);
    let equalsIcon = (<IconButton iconStyle={buttonEquals} iconClassName="fa fa-sort" tooltip="Stay" tooltipPosition="left-center"/>);


    subtitle = `$${Number((this.props.currencyBitso.price)).toFixed(2)}`
    title = `${this.props.currency[0].name} - ${this.props.currency[0].symbol}`;

    if(this.props.currencyBitso.maker_side === 'sell'){
      sellOrBuyBitso = sellIcon;
    }else if(this.props.currencyBitso.maker_side === 'buy'){
      sellOrBuyBitso = buyIcon;
    }else{
      sellOrBuyBitso = equalsIcon;
    }

    if(this.props.oldCurrency[0] !== undefined){

      if(this.props.currencyHistory.data[0] < this.props.currency[0].price_mxn){
        sellOrBuyMarket = sellIcon;
      }else if (this.props.currencyHistory.data[0] > this.props.currency[0].price_mxn){
        sellOrBuyMarket = buyIcon;
      }else{
        sellOrBuyMarket = equalsIcon;
      }

      costoMarketCap[0] = (`$${Number((this.props.oldCurrency[0].price_mxn)).toFixed(2)}`);
      costoMarketCap[1] = (`$${Number((this.props.currency[0].price_mxn)).toFixed(2)}`);
      costoBitso[0] =  (`$${Number((this.props.oldCurrencyBitso.price)).toFixed(2)}`);
      costoBitso[1] =  (`$${Number((this.props.currencyBitso.price)).toFixed(2)} `);
    }else{
      costoMarketCap[1] = (`$${Number((this.props.currency[0].price_mxn)).toFixed(2)}`);
      costoBitso[1] = (`$${Number((this.props.currencyBitso.price)).toFixed(2)}`);
      costoMarketCap[0] = (`$${Number((this.props.currency[0].price_mxn)).toFixed(2)}`);
      costoBitso[0] = (`$${Number((this.props.currencyBitso.price)).toFixed(2)}`);
      sellOrBuyMarket = equalsIcon;
    }
    return (
        <Card style={this.props.style} >
          <CardHeader
            title={title}
            subtitle={subtitle}
            actAsExpander={true}
            avatar={sellOrBuyBitso}
          />
        <CardMedia>
            <ChartComponent
            currency={this.props.currency}
            currencyHistory={this.props.currencyHistory}
            refreshChart={this.props.refreshChart}
            setUpdateToFalse={this.props.setUpdateToFalse}
            />
          </CardMedia>
          <CardText expandable={false}>
            <Table>
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
                                  >
               <TableRow>
                 <TableHeaderColumn>Page</TableHeaderColumn>
                 <TableHeaderColumn>After</TableHeaderColumn>
                 <TableHeaderColumn>Now</TableHeaderColumn>
                 <TableHeaderColumn>Action</TableHeaderColumn>
               </TableRow>
             </TableHeader>
             <TableBody displayRowCheckbox={false} >
               <TableRow>
                 <TableRowColumn>Bitso</TableRowColumn>
                 <TableRowColumn>{costoBitso[0]}</TableRowColumn>
                 <TableRowColumn>{costoBitso[1]}</TableRowColumn>
                 <TableRowColumn>{sellOrBuyBitso}</TableRowColumn>
               </TableRow>
               <TableRow>
                 <TableRowColumn>Market</TableRowColumn>
                 <TableRowColumn>{costoMarketCap[0]}</TableRowColumn>
                 <TableRowColumn>{costoMarketCap[1]}</TableRowColumn>
                 <TableRowColumn>{sellOrBuyMarket}</TableRowColumn>
               </TableRow>
             </TableBody>
           </Table>
          </CardText>
        </Card>
    );
  }
}
