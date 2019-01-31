import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { CurrencyComponent } from './components/Currency';
import { NavbarComponent } from './components/NavBar';
import { Error404Component } from './components/Error404';
import { BalancesComponent } from './components/Balances';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { getCurrencyBitcoin } from './actions/currencyActions';
import { getCurrencyBitcoin_Cash } from './actions/currencyActions';
import { getCurrencyRipple } from './actions/currencyActions';
import { getCurrencyEthereum } from './actions/currencyActions';
import { getCurrencyBitcoin_Bitso } from './actions/currencyActions';
import { getCurrencyBitcoin_Cash_Bitso } from './actions/currencyActions';
import { getCurrencyRipple_Bitso } from './actions/currencyActions';
import { getCurrencyEthereum_Bitso } from './actions/currencyActions';
import { getCurrencyLitecoin_Bitso } from './actions/currencyActions';
import { getCurrencyLitecoin } from './actions/currencyActions';
import { setOldCurrencies } from './actions/currencyActions';
import { setCookie } from './actions/currencyActions';
import { getCookie } from './actions/currencyActions';
import { setCookieConfig } from './actions/currencyActions';
import { getCookieConfig } from './actions/currencyActions';
import { setUpdateToFalse } from './actions/currencyActions';

import './Assets/css/styles.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

const styleCurrencyCard = {
  width: 500,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      bitcoin: true,
      bitcash: true,
      ethereum: true,
      ripple: true,
      litecoin: true
    }
    this.props.getCurrencyBitcoin();
    this.props.getCurrencyBitcoin_Bitso();
    this.props.getCurrencyRipple();
    this.props.getCurrencyRipple_Bitso();
    this.props.getCurrencyEthereum();
    this.props.getCurrencyEthereum_Bitso();
    this.props.getCurrencyLitecoin();
    this.props.getCurrencyLitecoin_Bitso();
    this.props.getCookie();
    this.props.getCookieConfig();
  }

  getCurrencies = () => {
    this.props.setOldCurrencies(this.props.currency.currencies);
    this.props.getCurrencyBitcoin();
    this.props.getCurrencyBitcoin_Bitso();
    this.props.getCurrencyLitecoin();
    this.props.getCurrencyLitecoin_Bitso();
    this.props.getCurrencyRipple();
    this.props.getCurrencyRipple_Bitso();
    this.props.getCurrencyEthereum();
    this.props.getCurrencyEthereum_Bitso();
  }

  titlePage = (title) => {
    return(
      <title>
        {title}
      </title>
    );
  }

  visibiliyCurrency = (state,coin) => {
    let stateTmp = {
      bitcoin: this.state.bitcoin,
      bitcash: this.state.bitcash,
      ethereum: this.state.ethereum,
      ripple: this.state.ripple,
      litecoin: this.state.litecoin
    };
    switch (coin) {
      case "btc":
          stateTmp.bitcoin = !state;
          this.setState({bitcoin: !state});
        break;
      case "bth":
          stateTmp.bitcash = !state;
          this.setState({bitcash: !state});
        break;
      case "eth":
          stateTmp.ethereum = !state;
          this.setState({ethereum: !state});
        break;
      case "rip":
          stateTmp.ripple = !state;
          this.setState({ripple: !state});
        break;
      case "lic":
          stateTmp.litecoin = !state;
          this.setState({litecoin: !state});
        break;
      default:
        break;
    }
    this.props.setCookieConfig(stateTmp);
  }

  componentDidMount() {
    this.intervalId = setInterval(this.getCurrencies.bind(this), 20000);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.currency.cookieConfig !== this.props.currency.cookieConfig){
      this.setState({
        bitcoin: nextProps.currency.cookieConfig.bitcoin,
        bitcash: nextProps.currency.cookieConfig.bitcash,
        ethereum: nextProps.currency.cookieConfig.ethereum,
        ripple: nextProps.currency.cookieConfig.ripple,
        litecoin: nextProps.currency.cookieConfig.litecoin
      })
    }
  }

  render(){
    let trackingPage = (<div>
            {this.titlePage("Coin Tracker")}
            <MuiThemeProvider>
              {
                (this.props.currency.currencies.bitcoin.length !== 0 && this.state.bitcoin)?
                (<CurrencyComponent
                    style={styleCurrencyCard}
                    currency={this.props.currency.currencies.bitcoin}
                    currencyBitso={this.props.currency.currencies.bitcoinBitso}
                    oldCurrency={this.props.currency.oldCurrencies.bitcoin}
                    oldCurrencyBitso={this.props.currency.oldCurrencies.bitcoinBitso}
                    currencyHistory={this.props.currency.currenciesHistory.bitcoin}
                    refreshChart={this.props.currency.refreshChart.bitcoin}
                    setUpdateToFalse={this.props.setUpdateToFalse}
                    />):("")
              }
            </MuiThemeProvider>
            <MuiThemeProvider>
              {
                (this.props.currency.currencies.bitcoin_cash.length !== 0 && this.state.bitcash)?
                (<CurrencyComponent
                  style={styleCurrencyCard}
                  currency={this.props.currency.currencies.bitcoin_cash}
                  currencyBitso={this.props.currency.currencies.bitcoin_cashBitso}
                  oldCurrency={this.props.currency.oldCurrencies.bitcoin_cash}
                  oldCurrencyBitso={this.props.currency.oldCurrencies.bitcoin_cashBitso}
                  currencyHistory={this.props.currency.currenciesHistory.bitcoin_cash}
                  refreshChart={this.props.currency.refreshChart.bitcoin_cash}
                  setUpdateToFalse={this.props.setUpdateToFalse}
                  />):("")
              }
            </MuiThemeProvider>
            <MuiThemeProvider>
              {
                (this.props.currency.currencies.ethereum.length !== 0 && this.state.ethereum)?
                (<CurrencyComponent
                  style={styleCurrencyCard}
                  currency={this.props.currency.currencies.ethereum}
                  currencyBitso={this.props.currency.currencies.ethereumBitso}
                  oldCurrency={this.props.currency.oldCurrencies.ethereum}
                  oldCurrencyBitso={this.props.currency.oldCurrencies.ethereumBitso}
                  currencyHistory={this.props.currency.currenciesHistory.ethereum}
                  refreshChart={this.props.currency.refreshChart.ethereum}
                  setUpdateToFalse={this.props.setUpdateToFalse}
                  />):("")
              }
            </MuiThemeProvider>
            <MuiThemeProvider>
              {
                (this.props.currency.currencies.ripple.length !== 0 && this.state.ripple)?
                (<CurrencyComponent
                  style={styleCurrencyCard}
                  currency={this.props.currency.currencies.ripple}
                  currencyBitso={this.props.currency.currencies.rippleBitso}
                  oldCurrency={this.props.currency.oldCurrencies.ripple}
                  oldCurrencyBitso={this.props.currency.oldCurrencies.rippleBitso}
                  currencyHistory={this.props.currency.currenciesHistory.ripple}
                  refreshChart={this.props.currency.refreshChart.ripple}
                  setUpdateToFalse={this.props.setUpdateToFalse}
                  />):("")
              }
            </MuiThemeProvider>
            <MuiThemeProvider>
              {
                (this.props.currency.currencies.litecoin.length !== 0 && this.state.litecoin)?
                (<CurrencyComponent
                  style={styleCurrencyCard}
                  currency={this.props.currency.currencies.litecoin}
                  currencyBitso={this.props.currency.currencies.litecoinBitso}
                  oldCurrency={this.props.currency.oldCurrencies.litecoin}
                  oldCurrencyBitso={this.props.currency.oldCurrencies.litecoinBitso}
                  currencyHistory={this.props.currency.currenciesHistory.litecoin}
                  refreshChart={this.props.currency.refreshChart.litecoin}
                  setUpdateToFalse={this.props.setUpdateToFalse}
                  />):("")
              }
            </MuiThemeProvider>
          </div>);

      let navBar = (<MuiThemeProvider>
        <NavbarComponent
          bitcoin={this.state.bitcoin}
          bitcash={this.state.bitcash}
          ethereum={this.state.ethereum}
          ripple={this.state.ripple}
          litecoin={this.state.litecoin}
          visibiliyCurrency={this.visibiliyCurrency}
        />
      </MuiThemeProvider>);

      let myBalances = (
        <MuiThemeProvider>
        <BalancesComponent
          bitcoinBitso={this.props.currency.currencies.bitcoinBitso}
          bitcashBitso={this.props.currency.currencies.bitcoin_cashBitso}
          ethereumBitso={this.props.currency.currencies.ethereumBitso}
          rippleBitso={this.props.currency.currencies.rippleBitso}
          litecoinBitso={this.props.currency.currencies.litecoinBitso}
          setCookie={this.props.setCookie}
          cookieInfo={this.props.currency.cookieData}
          titlePage={this.titlePage}
          />
      </MuiThemeProvider>);
    return (
      <Router>
        <div>
        {navBar}
            <Switch>
              <Route exact path='/' render={function () {
                  return trackingPage;
                }}/>
              <Route exact path='/balances' render={function () {
                  return myBalances;
                }}/>
              <Route render={function () {
                  return <Error404Component/>
                }}/>
              </Switch>
        </div>
        </Router>
    )
  }
}

function mapStateToProps(state){
  const { currency } = state;
  return {
    currency
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(
    {
      getCurrencyBitcoin,
      getCurrencyBitcoin_Cash,
      getCurrencyRipple,
      getCurrencyEthereum,
      getCurrencyBitcoin_Bitso,
      getCurrencyBitcoin_Cash_Bitso,
      getCurrencyRipple_Bitso,
      getCurrencyEthereum_Bitso,
      getCurrencyLitecoin_Bitso,
      getCurrencyLitecoin,
      setOldCurrencies,
      setCookie,
      getCookie,
      setCookieConfig,
      getCookieConfig,
      setUpdateToFalse
    },dispatch
  );
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
