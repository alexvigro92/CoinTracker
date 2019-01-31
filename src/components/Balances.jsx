import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
// import { ChartProceedsComponent } from './ChartProceeds';
import { ChartProceedHistoryComponent } from './ChartProceedHistory';


const style = {
    width: "100px"
};

const proceedGood = {
  color: '#00CC00'
}
const proceedBad = {
  color: '#CC0000'
}

const styleButton = {
  margin: '20px',
};

const styleBalance = {
  margin: 20,
  textAlign: 'center',
};

export class BalancesComponent extends Component {

  constructor(props){
    super(props);

    let proceedCache = localStorage.getItem("proceedHistory");
    if (proceedCache) {
      proceedCache = JSON.parse(proceedCache);
    }else{
      proceedCache = {
          "date": [],
          "value": []
      }
    }

    this.state = {

      proceedCache: proceedCache,

      cookieToState: false,
      currentBalance: 0,
      currentInvestment: 0,
      bitcoin: 0,
      bitcash: 0,
      ethereum: 0,
      ripple: 0,
      litecoin: 0,
      pesos: 0,

      bitcoinQty: 0,
      bitcashQty: 0,
      ethereumQty: 0,
      rippleQty: 0,
      litecoinQty: 0,
      pesosQty: 0,

      bitcoinProceed: 0,
      bitcashProceed: 0,
      ethereumProceed: 0,
      rippleProceed: 0,
      litecoinProceed: 0,
      pesosProceed: 0,

      bitcoinSpend: 0,
      bitcashSpend: 0,
      ethereumSpend: 0,
      rippleSpend: 0,
      litecoinSpend: 0,
      pesosSpend: 0,

      proceedsForChart:{
        bitcoin: {
          coinName: "bitcoin",
          proceed: []
        },
        bitcash: {
          coinName: "bitcash",
          proceed: []
        },
        ethereum: {
          coinName: "ethereum",
          proceed: []
        },
        ripple: {
          coinName: "ripple",
          proceed: []
        },
        litecoin: {
          coinName: "litecoin",
          proceed: []
        },
        time: []
      }
    }
  }

refreshTable = () => {
  this.multiplyCoins(this.state.bitcoinQty,this.state.bitcoinSpend,"btc");
  this.multiplyCoins(this.state.ethereumQty,this.state.ethereumSpend,"eth");
  this.multiplyCoins(this.state.rippleQty,this.state.rippleSpend,"rip");
  this.multiplyCoins(this.state.litecoinQty,this.state.litecoinSpend,"lic");
  this.multiplyCoins(this.state.pesosQty,this.state.pesosSpend,"pes");
  this.multiplyCoins(this.state.bitcashQty,this.state.bitcashSpend,"bch");
}

getDataProceedToChart = () => {
  let proceedsForChartTmp = this.state.proceedsForChart;
  proceedsForChartTmp.bitcoin.proceed.push(this.state.bitcoinProceed);
  proceedsForChartTmp.bitcash.proceed.push(this.state.bitcashProceed);
  proceedsForChartTmp.ethereum.proceed.push(this.state.ethereumProceed);
  proceedsForChartTmp.ripple.proceed.push(this.state.rippleProceed);
  proceedsForChartTmp.litecoin.proceed.push(this.state.litecoinProceed);
  let dateNow = new Date();
  let hoursNow = dateNow.getHours();
  let minutesNow = dateNow.getMinutes();
  let secondsNow = dateNow.getSeconds();

  let yearNow = dateNow.getFullYear();
  let monthNow = dateNow.getMonth()+1;
  let dayNow = dateNow.getDay();

  let proceedCache = localStorage.getItem("proceedHistory");
  if (proceedCache) {
    proceedCache = JSON.parse(proceedCache);

    if((proceedCache.date[proceedCache.date.length-1]) === (`${yearNow}/${monthNow}/${dayNow}`)){
      proceedCache.value[proceedCache.date.length-1] = ((this.state.currentBalance - this.state.currentInvestment).toFixed(2));
    }else{
      proceedCache.value.push((this.state.currentBalance - this.state.currentInvestment).toFixed(2));
      proceedCache.date.push((`${yearNow}/${monthNow}/${dayNow}`));
    }
  }else{
    proceedCache = {
        "date": [(`${yearNow}/${monthNow}/${dayNow}`)],
        "value": [((this.state.currentBalance - this.state.currentInvestment).toFixed(2))],
    }
  }
  localStorage.setItem("proceedHistory",JSON.stringify(proceedCache));

  proceedsForChartTmp.time.push(`${hoursNow}:${minutesNow}:${secondsNow}`);

  if(proceedsForChartTmp.bitcoin.proceed.length === 75){
    proceedsForChartTmp.bitcoin.proceed.splice(0, 1);
    proceedsForChartTmp.bitcash.proceed.splice(0, 1);
    proceedsForChartTmp.ethereum.proceed.splice(0, 1);
    proceedsForChartTmp.ripple.proceed.splice(0, 1);
    proceedsForChartTmp.litecoin.proceed.splice(0, 1);
    proceedsForChartTmp.time.splice(0, 1);
  }
  this.setState({proceedsForChart: proceedsForChartTmp, proceedCache:proceedCache});
}

multiplyCoins = (coinQty,mnyInvested,coin) => {

  let proceedPerCoin = 0;
  let currentBalanceTmp = 0;
  let currentInvestmentTmp = 0;
  let valueCoin = 0;

  switch (coin) {
    case "btc":
      valueCoin = coinQty * Number(this.props.bitcoinBitso.price);
      valueCoin = (isNaN(valueCoin))? 0:valueCoin;
      proceedPerCoin = (valueCoin - mnyInvested);
      currentBalanceTmp = (Number(valueCoin)+Number(this.state.bitcash)+Number(this.state.ethereum)+Number(this.state.ripple)+Number(this.state.litecoin)+Number(this.state.pesos))
      currentInvestmentTmp = (Number(mnyInvested)+Number(this.state.bitcashSpend)+Number(this.state.ethereumSpend)+Number(this.state.rippleSpend)+Number(this.state.litecoinSpend)+Number(this.state.pesosSpend))
      this.setState({bitcoinQty:coinQty, bitcoin:valueCoin.toFixed(2), currentBalance:currentBalanceTmp.toFixed(2),bitcoinProceed:proceedPerCoin.toFixed(2), bitcoinSpend:mnyInvested, currentInvestment:currentInvestmentTmp});
      break;

    case "bch":
      valueCoin = coinQty * Number(this.props.bitcashBitso.price);
      valueCoin = (isNaN(valueCoin))? 0:valueCoin;
      proceedPerCoin = (valueCoin - mnyInvested);
      currentBalanceTmp = (Number(this.state.bitcoin)+Number(valueCoin)+Number(this.state.ethereum)+Number(this.state.ripple)+Number(this.state.litecoin)+Number(this.state.pesos))
      currentInvestmentTmp = (Number(this.state.bitcoinSpend)+Number(mnyInvested)+Number(this.state.ethereumSpend)+Number(this.state.rippleSpend)+Number(this.state.litecoinSpend)+Number(this.state.pesosSpend))
      this.setState({bitcashQty:coinQty, bitcash:valueCoin.toFixed(2), currentBalance:currentBalanceTmp.toFixed(2),bitcashProceed:proceedPerCoin.toFixed(2), bitcashSpend:mnyInvested,currentInvestment:currentInvestmentTmp});
      break;

    case "eth":
      valueCoin = coinQty * Number(this.props.ethereumBitso.price);
      valueCoin = (isNaN(valueCoin))? 0:valueCoin;
      proceedPerCoin = (valueCoin - mnyInvested);
      currentBalanceTmp = (Number(this.state.bitcoin)+Number(this.state.bitcash)+Number(valueCoin)+Number(this.state.ripple)+Number(this.state.litecoin)+Number(this.state.pesos))
      currentInvestmentTmp = (Number(this.state.bitcoinSpend)+Number(this.state.bitcashSpend)+Number(mnyInvested)+Number(this.state.rippleSpend)+Number(this.state.litecoinSpend)+Number(this.state.pesosSpend))
      this.setState({ethereumQty:coinQty, ethereum:valueCoin.toFixed(2), currentBalance:currentBalanceTmp.toFixed(2),ethereumProceed:proceedPerCoin.toFixed(2), ethereumSpend:mnyInvested, currentInvestment:currentInvestmentTmp});
      break;

    case "rip":
      valueCoin = coinQty * Number(this.props.rippleBitso.price);
      valueCoin = (isNaN(valueCoin))? 0:valueCoin;
      proceedPerCoin = (valueCoin - mnyInvested);
      currentBalanceTmp = (Number(this.state.bitcoin)+Number(this.state.bitcash)+Number(this.state.ethereum)+Number(valueCoin)+Number(this.state.litecoin)+Number(this.state.pesos))
      currentInvestmentTmp = (Number(this.state.bitcoinSpend)+Number(this.state.bitcashSpend)+Number(this.state.ethereumSpend)+Number(mnyInvested)+Number(this.state.litecoinSpend)+Number(this.state.pesosSpend))
      this.setState({rippleQty:coinQty, ripple:valueCoin.toFixed(2), currentBalance:currentBalanceTmp.toFixed(2),rippleProceed:proceedPerCoin.toFixed(2), rippleSpend:mnyInvested, currentInvestment:currentInvestmentTmp});
      break;

    case "lic":
      valueCoin = coinQty * Number(this.props.litecoinBitso.price);
      valueCoin = (isNaN(valueCoin))? 0:valueCoin;
      proceedPerCoin = (valueCoin - mnyInvested);
      currentBalanceTmp = (Number(this.state.bitcoin)+Number(this.state.bitcash)+Number(this.state.ethereum)+Number(this.state.ripple)+Number(valueCoin)+Number(this.state.pesos))
      currentInvestmentTmp = (Number(this.state.bitcoinSpend)+Number(this.state.bitcashSpend)+Number(this.state.ethereumSpend)+Number(this.state.rippleSpend)+Number(mnyInvested)+Number(this.state.pesosSpend))
      this.setState({litecoinQty:coinQty, litecoin:valueCoin.toFixed(2), currentBalance:currentBalanceTmp.toFixed(2),litecoinProceed:proceedPerCoin.toFixed(2), litecoinSpend:mnyInvested, currentInvestment:currentInvestmentTmp});
      break;

    case "pes":
      valueCoin = Number(coinQty);
      valueCoin = (isNaN(valueCoin))? 0:valueCoin;
      proceedPerCoin = (valueCoin - mnyInvested);
      currentBalanceTmp = (Number(this.state.bitcoin)+Number(this.state.bitcash)+Number(this.state.ethereum)+Number(this.state.ripple)+Number(this.state.litecoin)+Number(valueCoin))
      currentInvestmentTmp = (Number(this.state.bitcoinSpend)+Number(this.state.bitcashSpend)+Number(this.state.ethereumSpend)+Number(this.state.rippleSpend)+Number(this.state.litecoinSpend)+Number(mnyInvested))
      this.setState({ pesosQty:coinQty, pesos:valueCoin.toFixed(2), currentBalance:currentBalanceTmp.toFixed(2),pesosProceed:proceedPerCoin.toFixed(2), pesosSpend:mnyInvested, currentInvestment:currentInvestmentTmp});
      break;
    default:
  }

}

saveDataInCookie = () => {
  let dataJson = {
    bitcoinQty: this.state.bitcoinQty,
    bitcashQty: this.state.bitcashQty,
    ethereumQty: this.state.ethereumQty,
    rippleQty: this.state.rippleQty,
    litecoinQty: this.state.litecoinQty,
    pesosQty: this.state.pesosQty,
    bitcoinSpend: this.state.bitcoinSpend,
    bitcashSpend: this.state.bitcashSpend,
    ethereumSpend: this.state.ethereumSpend,
    rippleSpend: this.state.rippleSpend,
    litecoinSpend: this.state.litecoinSpend,
    pesosSpend: this.state.pesosSpend,
  }
  this.props.setCookie(dataJson);
}

componentDidMount() {
  this.intervalId = setInterval(this.getDataProceedToChart.bind(this), 20000);//300000);
}

componentWillReceiveProps(nextProps){
  this.refreshTable();
  if((nextProps.cookieInfo !== undefined) && (this.state.cookieToState === false)){
    this.setState({
      cookieToState: true,
      bitcoinQty: nextProps.cookieInfo.bitcoinQty,
      bitcashQty: nextProps.cookieInfo.bitcashQty,
      ethereumQty: nextProps.cookieInfo.ethereumQty,
      rippleQty: nextProps.cookieInfo.rippleQty,
      litecoinQty: nextProps.cookieInfo.litecoinQty,
      pesosQty: nextProps.cookieInfo.pesosQty,
      bitcoinSpend: nextProps.cookieInfo.bitcoinSpend,
      bitcashSpend: nextProps.cookieInfo.bitcashSpend,
      ethereumSpend: nextProps.cookieInfo.ethereumSpend,
      rippleSpend: nextProps.cookieInfo.rippleSpend,
      litecoinSpend: nextProps.cookieInfo.litecoinSpend,
      pesosSpend: nextProps.cookieInfo.pesosSpend,
    })
  }
}

  render(){

    let title = (<h3>Balance</h3>);
    let subtitleStyle = ((Number(this.state.currentBalance)-Number(this.state.currentInvestment)) > 0)? proceedGood:proceedBad ;
    let subTitle = (<h3 style={subtitleStyle}>{`$${this.state.currentBalance} - $${this.state.currentInvestment} = $${(Number(this.state.currentBalance)-Number(this.state.currentInvestment)).toFixed(2)}`}</h3>);
    return(
      <div>
      <div>
      {this.props.titlePage(`($${((Number(this.state.currentBalance)-Number(this.state.currentInvestment)).toFixed(2))}/MXN) - Coin Tracker`)}
      <Card style={styleBalance} >
        <CardHeader
          title={title}
          subtitle={subTitle}
          actAsExpander={true}
        />
        <CardText expandable={false}>
          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
                                >
             <TableRow>
               <TableHeaderColumn><h5>Coin</h5></TableHeaderColumn>
               <TableHeaderColumn><h5>Quantity</h5></TableHeaderColumn>
               <TableHeaderColumn><h5>Price</h5></TableHeaderColumn>
               <TableHeaderColumn><h5>Total</h5></TableHeaderColumn>
               <TableHeaderColumn><h5>Investment</h5></TableHeaderColumn>
               <TableHeaderColumn><h5>Proceeds</h5></TableHeaderColumn>
             </TableRow>
           </TableHeader>
           <TableBody displayRowCheckbox={false} >
             <TableRow>
               <TableRowColumn><h5>Bitcoin</h5></TableRowColumn>
               <TableRowColumn><TextField hintText="Quantity" value={this.state.bitcoinQty} onChange={(e) => this.multiplyCoins(e.target.value,this.state.bitcoinSpend,"btc")} style={style}/></TableRowColumn>
               <TableRowColumn>${this.props.bitcoinBitso.price}</TableRowColumn>
               <TableRowColumn>${this.state.bitcoin}</TableRowColumn>
               <TableRowColumn><TextField hintText="Money spended" value={this.state.bitcoinSpend} onChange={(e) => this.multiplyCoins(this.state.bitcoinQty,e.target.value,"btc")} style={style}/></TableRowColumn>
               <TableRowColumn>{(this.state.bitcoinProceed < 0)? <div style={proceedBad}>${this.state.bitcoinProceed}</div>:<div style={proceedGood}>${this.state.bitcoinProceed}</div> }</TableRowColumn>
             </TableRow>
             <TableRow>
               <TableRowColumn><h5>Bitcash</h5></TableRowColumn>
               <TableRowColumn><TextField hintText="Quantity" value={this.state.bitcashQty} onChange={(e) => this.multiplyCoins(e.target.value,this.state.bitcashSpend,"bch")} style={style}/></TableRowColumn>
               <TableRowColumn>${Number(this.props.bitcashBitso.price).toFixed(2)}</TableRowColumn>
               <TableRowColumn>${this.state.bitcash}</TableRowColumn>
               <TableRowColumn><TextField hintText="Money spended" value={this.state.bitcashSpend} onChange={(e) => this.multiplyCoins(this.state.bitcashQty,e.target.value,"bch")} style={style}/></TableRowColumn>
               <TableRowColumn>{(this.state.bitcashProceed < 0)? <div style={proceedBad}>${this.state.bitcashProceed}</div>:<div style={proceedGood}>${this.state.bitcashProceed}</div> }</TableRowColumn>
             </TableRow>
             <TableRow>
               <TableRowColumn><h5>Ethereum</h5></TableRowColumn>
               <TableRowColumn><TextField hintText="Quantity" value={this.state.ethereumQty} onChange={(e) => this.multiplyCoins(e.target.value,this.state.ethereumSpend,"eth")} style={style}/></TableRowColumn>
               <TableRowColumn>${this.props.ethereumBitso.price}</TableRowColumn>
               <TableRowColumn>${this.state.ethereum}</TableRowColumn>
               <TableRowColumn><TextField hintText="Money spended" value={this.state.ethereumSpend} onChange={(e) => this.multiplyCoins(this.state.ethereumQty,e.target.value,"eth")} style={style}/></TableRowColumn>
               <TableRowColumn>{(this.state.ethereumProceed < 0)? <div style={proceedBad}>${this.state.ethereumProceed}</div>:<div style={proceedGood}>${this.state.ethereumProceed}</div> }</TableRowColumn>
             </TableRow>
             <TableRow>
               <TableRowColumn><h5>Ripple</h5></TableRowColumn>
               <TableRowColumn><TextField hintText="Quantity" value={this.state.rippleQty} onChange={(e) => this.multiplyCoins(e.target.value,this.state.rippleSpend,"rip")} style={style}/></TableRowColumn>
               <TableRowColumn>${this.props.rippleBitso.price}</TableRowColumn>
               <TableRowColumn>${this.state.ripple}</TableRowColumn>
               <TableRowColumn><TextField hintText="Money spended" value={this.state.rippleSpend} onChange={(e) => this.multiplyCoins(this.state.rippleQty,e.target.value,"rip")} style={style}/></TableRowColumn>
               <TableRowColumn>{(this.state.rippleProceed < 0)? <div style={proceedBad}>${this.state.rippleProceed}</div>:<div style={proceedGood}>${this.state.rippleProceed}</div> }</TableRowColumn>
             </TableRow>
             <TableRow>
               <TableRowColumn><h5>Litecoin</h5></TableRowColumn>
               <TableRowColumn><TextField hintText="Quantity" value={this.state.litecoinQty} onChange={(e) => this.multiplyCoins(e.target.value,this.state.litecoinSpend,"lic")} style={style}/></TableRowColumn>
               <TableRowColumn>${this.props.litecoinBitso.price}</TableRowColumn>
               <TableRowColumn>${this.state.litecoin}</TableRowColumn>
               <TableRowColumn><TextField hintText="Money spended" value={this.state.litecoinSpend} onChange={(e) => this.multiplyCoins(this.state.litecoinQty,e.target.value,"lic")} style={style}/></TableRowColumn>
               <TableRowColumn>{(this.state.litecoinProceed < 0)? <div style={proceedBad}>${this.state.litecoinProceed}</div>:<div style={proceedGood}>${this.state.litecoinProceed}</div> }</TableRowColumn>
             </TableRow>
             <TableRow>
               <TableRowColumn><h5>Pesos</h5></TableRowColumn>
               <TableRowColumn><TextField hintText="Quantity" value={this.state.pesosQty} onChange={(e) => this.multiplyCoins(e.target.value,this.state.pesosSpend,"pes")} style={style}/></TableRowColumn>
               <TableRowColumn>$1</TableRowColumn>
               <TableRowColumn>${this.state.pesos}</TableRowColumn>
               <TableRowColumn><TextField hintText="Money spended" value={this.state.pesosSpend} onChange={(e) => this.multiplyCoins(this.state.pesosQty,e.target.value,"pes")} style={style}/></TableRowColumn>
               <TableRowColumn>{(this.state.pesosProceed < 0)? <div style={proceedBad}>${this.state.pesosProceed}</div>:<div style={proceedGood}>${this.state.pesosProceed}</div> }</TableRowColumn>
             </TableRow>
           </TableBody>
         </Table>
         <RaisedButton onClick={this.saveDataInCookie} label="Save in cookie" backgroundColor="#1b9ef3" labelColor="#FFF" style={styleButton} />
        </CardText>
      </Card>
    </div>

    <div>
      <ChartProceedHistoryComponent
        style={styleBalance}
        dataForChart={this.state.proceedCache}
        title={"Proceeds History"}
        subTitle={"Updated each day"}
        />
    </div>
    </div>


    );
  }

}
