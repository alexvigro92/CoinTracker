import {
  GET_CURRENCY_BITCOIN,
  GET_CURRENCY_BITCOIN_CASH,
  GET_CURRENCY_RIPPLE,
  GET_CURRENCY_ETHEREUM,
  GET_CURRENCY_BITCOIN_BITSO,
  GET_CURRENCY_BITCOIN_CASH_BITSO,
  GET_CURRENCY_RIPPLE_BITSO,
  GET_CURRENCY_ETHEREUM_BITSO,
  SET_OLD_CURRENCIES,
  GET_CURRENCY_LITECOIN_BITSO,
  GET_CURRENCY_LITECOIN,
  SETTING_COOKIE,
  GETTING_COOKIE,
  SETTING_CONFIG_COOKIE,
  GETTING_CONFIG_COOKIE,
  SET_UPDATE_FALSE
 } from '../constants';
import axios from 'axios';

const defaultStorageCookie = {
    bitcoinQty: 0,
    bitcashQty: 0,
    ethereumQty: 0,
    rippleQty: 0,
    litecoinQty: 0,
    pesosQty: 0,
    bitcoinSpend: 0,
    bitcashSpend: 0,
    ethereumSpend: 0,
    rippleSpend: 0,
    litecoinSpend: 0,
    pesosSpend: 0,
  };

const defaultStorageCookieCharts = {
    bitcoin: true,
    bitcash: true,
    ethereum: true,
    ripple: true,
    litecoin: true
  };

export const setCookie = (cookieValue) => {
  //console.log("getting cookie");
  localStorage.setItem("infoCrypto",JSON.stringify(cookieValue));
  return {
    type: SETTING_COOKIE,
    payload: "ok"
  };
}

export const getCookie = () => {
  //console.log("setting cookie");
  let cookie = localStorage.getItem("infoCrypto");
  if(cookie){
    cookie = JSON.parse(cookie);
  }else{
    localStorage.setItem("infoCrypto",JSON.stringify(defaultStorageCookie));
    cookie = defaultStorageCookie;
  }
  return {
    type: GETTING_COOKIE,
    payload: cookie
  };
}

export const setCookieConfig = (cookieValue) => {
  //console.log("getting cookieConfig");
  localStorage.setItem("configCrypto",JSON.stringify(cookieValue));

  return {
    type: SETTING_CONFIG_COOKIE,
    payload: "ok"
  };
}

export const getCookieConfig = () => {
  //console.log("setting cookieConfig");
  let cookie = localStorage.getItem("configCrypto");
  if(cookie){
    cookie = JSON.parse(cookie);
  }else{
    localStorage.setItem("configCrypto",JSON.stringify(defaultStorageCookieCharts));
    cookie = defaultStorageCookieCharts;
  }
  return {
    type: GETTING_CONFIG_COOKIE,
    payload: cookie
  };
}

export const getCurrencyBitcoin = () => {
  //console.log("getting currency bitcoin");
  return dispatch => {
    axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=MXN')
    .then((response) => {
      dispatch({
            type: GET_CURRENCY_BITCOIN,
            payload: response.data
      });
      dispatch(getCurrencyBitcoin_Cash());
    })
    .catch(function (error) {
      //console.log(error);
    });
  }
}

export const getCurrencyBitcoin_Cash = () => {
  //console.log("getting currency bitcoin cash");
  return dispatch => {
    axios.get('https://api.coinmarketcap.com/v1/ticker/bitcoin-cash/?convert=MXN')
    .then((response) => {
      dispatch({
            type: GET_CURRENCY_BITCOIN_CASH,
            payload: response.data
      });
    })
    .catch(function (error) {
      //console.log(error);
    });
  }
}

export const getCurrencyRipple = () => {
  //console.log("getting currency ripple");
  return dispatch => {
    axios.get('https://api.coinmarketcap.com/v1/ticker/ripple/?convert=MXN')
    .then((response) => {
      dispatch({
            type: GET_CURRENCY_RIPPLE,
            payload: response.data
      });
    })
    .catch(function (error) {
      //console.log(error);
    });
  }
}

export const getCurrencyEthereum = () => {
  //console.log("getting currency ethereum");
  return dispatch => {
    axios.get('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=MXN')
    .then((response) => {
      dispatch({
            type: GET_CURRENCY_ETHEREUM,
            payload: response.data
      });
    })
    .catch(function (error) {
      //console.log(error);
    });
  }
}

export const getCurrencyLitecoin = () => {
  //console.log("getting currency litecoin");
  return dispatch => {
    axios.get('https://api.coinmarketcap.com/v1/ticker/litecoin/?convert=MXN')
    .then((response) => {
      dispatch({
            type: GET_CURRENCY_LITECOIN,
            payload: response.data
      });
    })
    .catch(function (error) {
      //console.log(error);
    });
  }
}

export const getCurrencyBitcoin_Bitso = () => {
  //console.log("getting currency bitcoin from Bitso");
  return dispatch => {
    axios.get('https://api.bitso.com/v3/trades/?book=btc_mxn&limit=1')
    .then((response) => {
      dispatch({
            type: GET_CURRENCY_BITCOIN_BITSO,
            payload: response.data.payload[0]
      });
      dispatch(getCurrencyBitcoin_Cash_Bitso());
    })
    .catch(function (error) {
      //console.log(error);
    });
  }
}

export const getCurrencyBitcoin_Cash_Bitso = () => {
  //console.log("getting currency bitcoin cash from Bitso");
  return dispatch => {
    axios.get('https://api.bitso.com/v3/trades/?book=bch_btc&limit=1')
    .then((response) => {
      dispatch({
            type: GET_CURRENCY_BITCOIN_CASH_BITSO,
            payload: response.data.payload[0]
      });
    })
    .catch(function (error) {
      //console.log(error);
    });
  }
}

export const getCurrencyRipple_Bitso = () => {
  //console.log("getting currency ripple from Bitso");
  return dispatch => {
    axios.get('https://api.bitso.com/v3/trades/?book=xrp_mxn&limit=1')
    .then((response) => {
      dispatch({
            type: GET_CURRENCY_RIPPLE_BITSO,
            payload: response.data.payload[0]
      });
    })
    .catch(function (error) {
      //console.log(error);
    });
  }
}

export const getCurrencyEthereum_Bitso = () => {
  //console.log("getting currency ethereum from Bitso");
  return dispatch => {
    axios.get('https://api.bitso.com/v3/trades/?book=eth_mxn&limit=1')
    .then((response) => {
      dispatch({
            type: GET_CURRENCY_ETHEREUM_BITSO,
            payload: response.data.payload[0]
      });
    })
    .catch(function (error) {
      //console.log(error);
    });
  }
}

export const getCurrencyLitecoin_Bitso = () => {
  //console.log("getting currency litecoin from Bitso");
  return dispatch => {
    axios.get('https://api.bitso.com/v3/trades/?book=ltc_mxn&limit=1')
    .then((response) => {
      dispatch({
            type: GET_CURRENCY_LITECOIN_BITSO,
            payload: response.data.payload[0]
      });
    })
    .catch(function (error) {
      //console.log(error);
    });
  }
}

export const setOldCurrencies = (oldCurrencies) => {
  //console.log("setting old currencies");
  return {
    type: SET_OLD_CURRENCIES,
    payload: oldCurrencies
  }
}

export const setUpdateToFalse = (coin) => {
  //console.log("setting old currencies");
  return {
    type: SET_UPDATE_FALSE,
    payload: coin
  }
}
