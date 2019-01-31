import {
  GET_CURRENCY_BITCOIN,
  GET_CURRENCY_BITCOIN_CASH,
  GET_CURRENCY_RIPPLE,
  GET_CURRENCY_ETHEREUM,
  GET_CURRENCY_LITECOIN,
  GET_CURRENCY_BITCOIN_BITSO,
  GET_CURRENCY_BITCOIN_CASH_BITSO,
  GET_CURRENCY_RIPPLE_BITSO,
  GET_CURRENCY_ETHEREUM_BITSO,
  GET_CURRENCY_LITECOIN_BITSO,
  SET_OLD_CURRENCIES,
  SETTING_COOKIE,
  GETTING_COOKIE,
  SETTING_CONFIG_COOKIE,
  GETTING_CONFIG_COOKIE,
  SET_UPDATE_FALSE
} from '../constants';

const currency = (state = {
  refreshChart: {
    bitcoin: '',
    bitcoin_cash: '',
    ethereum: '',
    ripple: '',
    litecoin: ''
  },
  currencies: {
    bitcoin: [],
    bitcoinBitso: [],
    bitcoin_cash: [],
    bitcoin_cashBitso: [],
    ethereum: [],
    ethereumBitso: [],
    ripple: [],
    rippleBitso: [],
    litecoin: [],
    litecoinBitso: []
  },
  oldCurrencies: {
    bitcoin: [],
    bitcoinBitso: [],
    bitcoin_cash: [],
    bitcoin_cashBitso: [],
    ethereum: [],
    ethereumBitso: [],
    ripple: [],
    rippleBitso: [],
    litecoin: [],
    litecoinBitso: []
  },
  currenciesHistory: {
    bitcoin: {
      time: [],
      data: [],
      dataBitso: []
    },
    bitcoin_cash: {
      time: [],
      data: [],
      dataBitso: []
    },
    ethereum: {
      time: [],
      data: [],
      dataBitso: []
    },
    ripple: {
      time: [],
      data: [],
      dataBitso: []
    },
    litecoin: {
      time: [],
      data: [],
      dataBitso: []
    }
  },
  cookieData: {},
  cookieConfig: undefined
}, action) => {
  switch (action.type) {
    case GET_CURRENCY_BITCOIN:
      let bitcoinHistory = state.currenciesHistory.bitcoin;
      bitcoinHistory.data.push(action.payload[0].price_mxn);
      if(bitcoinHistory.data.length === 100){
        bitcoinHistory.data.splice(0, 1)
      }
      state = {
        ...state,
        refreshChart: {
          ...state.refreshChart,
          bitcoin: true
        },
        currencies: {
          ...state.currencies,
          bitcoin: action.payload
        },
        currenciesHistory: {
          ...state.currenciesHistory,
          bitcoin: bitcoinHistory
        }
      };
      break;
    case GET_CURRENCY_BITCOIN_CASH:
      let bitcoin_cashHistory = state.currenciesHistory.bitcoin_cash;
      bitcoin_cashHistory.data.push(action.payload[0].price_mxn);
      if(bitcoin_cashHistory.data.length === 100){
        bitcoin_cashHistory.data.splice(0, 1)
      }
      state = {
        ...state,
        refreshChart: {
          ...state.refreshChart,
          bitcoin_cash: true
        },
        currencies: {
          ...state.currencies,
          bitcoin_cash: action.payload
        },
        currenciesHistory: {
          ...state.currenciesHistory,
          bitcoin_cash: bitcoin_cashHistory
        }
      };
      break;
    case GET_CURRENCY_RIPPLE:
      let rippleHistory = state.currenciesHistory.ripple;
      rippleHistory.data.push(action.payload[0].price_mxn);
      if(rippleHistory.data.length === 100){
        rippleHistory.data.splice(0, 1)
      }
      state = {
        ...state,
        refreshChart: {
          ...state.refreshChart,
          ripple: true
        },
        currencies: {
          ...state.currencies,
          ripple: action.payload
        },
        currenciesHistory: {
          ...state.currenciesHistory,
          ripple: rippleHistory
        }
      };
      break;
    case GET_CURRENCY_ETHEREUM:
      let ethereumHistory = state.currenciesHistory.ethereum;
      ethereumHistory.data.push(action.payload[0].price_mxn);
      if(ethereumHistory.data.length === 100){
        ethereumHistory.data.splice(0, 1)
      }
      state = {
        ...state,
        refreshChart: {
          ...state.refreshChart,
          ethereum: true
        },
        currencies: {
          ...state.currencies,
          ethereum: action.payload
        },
        currenciesHistory: {
          ...state.currenciesHistory,
          ethereum: ethereumHistory
        }
      };
      break;
    case GET_CURRENCY_LITECOIN:
      let litecoinHistory = state.currenciesHistory.litecoin;
      litecoinHistory.data.push(action.payload[0].price_mxn);
      if(litecoinHistory.data.length === 100){
        litecoinHistory.data.splice(0, 1)
      }
      state = {
        ...state,
        refreshChart: {
          ...state.refreshChart,
          litecoin: true
        },
        currencies: {
          ...state.currencies,
          litecoin: action.payload
        },
        currenciesHistory: {
          ...state.currenciesHistory,
          litecoin: litecoinHistory
        }
      };
      break;

    /////////////////////////////////////////////////////////////////////////////

    case GET_CURRENCY_BITCOIN_BITSO:
      let bitcoinHistoryBitso = state.currenciesHistory.bitcoin;
      let bitcoinDate = new Date(action.payload.created_at);
      let hoursBitcoin = bitcoinDate.getHours();
      let minutesBitcoin = bitcoinDate.getMinutes();
      let secondsBitcoin = bitcoinDate.getSeconds();
      bitcoinHistoryBitso.dataBitso.push(action.payload.price);
      bitcoinHistoryBitso.time.push(`${hoursBitcoin}:${minutesBitcoin}:${secondsBitcoin}`);
      if(bitcoinHistoryBitso.dataBitso.length === 100){
        bitcoinHistoryBitso.dataBitso.splice(0, 1)
        bitcoinHistoryBitso.time.splice(0, 1)
      }
      state = {
        ...state,
        refreshChart: {
          ...state.refreshChart,
          bitcoin: true
        },
        currencies: {
          ...state.currencies,
          bitcoinBitso: {
            price: action.payload.price,
            maker_side: action.payload.maker_side
          }
        },
        currenciesHistory: {
          ...state.currenciesHistory,
          bitcoin: {
            ...state.currenciesHistory.bitcoin,
            time: bitcoinHistoryBitso.time,
            dataBitso: bitcoinHistoryBitso.dataBitso
          }
        }
      };
      break;

    case GET_CURRENCY_BITCOIN_CASH_BITSO:
      let bitcoinCashPrice = Number(action.payload.price);
      bitcoinCashPrice = String((bitcoinCashPrice)*(Number(state.currencies.bitcoinBitso.price)));
      let bitcoin_cashHistoryBitso = state.currenciesHistory.bitcoin_cash;
      let bitcoinCashDate = new Date(action.payload.created_at);
      let hoursBitcoinCash = bitcoinCashDate.getHours();
      let minutesBitcoinCash = bitcoinCashDate.getMinutes();
      let secondsBitcoinCash = bitcoinCashDate.getSeconds();
      bitcoin_cashHistoryBitso.dataBitso.push(bitcoinCashPrice);
      bitcoin_cashHistoryBitso.time.push(`${hoursBitcoinCash}:${minutesBitcoinCash}:${secondsBitcoinCash}`);
      if(bitcoin_cashHistoryBitso.dataBitso.length === 100){
        bitcoin_cashHistoryBitso.dataBitso.splice(0, 1)
        bitcoin_cashHistoryBitso.time.splice(0, 1)
      }
      state = {
        ...state,
        refreshChart: {
          ...state.refreshChart,
          bitcoin_cash: true
        },
        currencies: {
          ...state.currencies,
          bitcoin_cashBitso: {
            price: bitcoinCashPrice,
            maker_side: action.payload.maker_side
          }
        },
        currenciesHistory: {
          ...state.currenciesHistory,
          bitcoin_cash: {
            ...state.currenciesHistory.bitcoin_cash,
            time: bitcoin_cashHistoryBitso.time,
            dataBitso: bitcoin_cashHistoryBitso.dataBitso
          }
        }
      };
      break;

    case GET_CURRENCY_RIPPLE_BITSO:
      let rippleHistoryBitso = state.currenciesHistory.ripple;
      let rippleDate = new Date(action.payload.created_at);
      let hoursRipple = rippleDate.getHours();
      let minutesRipple = rippleDate.getMinutes();
      let secondsRipple = rippleDate.getSeconds();
      rippleHistoryBitso.dataBitso.push(action.payload.price);
      rippleHistoryBitso.time.push(`${hoursRipple}:${minutesRipple}:${secondsRipple}`);
      if(rippleHistoryBitso.dataBitso.length === 100){
        rippleHistoryBitso.dataBitso.splice(0, 1)
        rippleHistoryBitso.time.splice(0, 1)
      }
      state = {
        ...state,
        refreshChart: {
          ...state.refreshChart,
          ripple: true
        },
        currencies: {
          ...state.currencies,
          rippleBitso: {
            price: action.payload.price,
            maker_side: action.payload.maker_side
          }
        },
        currenciesHistory: {
          ...state.currenciesHistory,
          ripple: {
            ...state.currenciesHistory.ripple,
            time: rippleHistoryBitso.time,
            dataBitso: rippleHistoryBitso.dataBitso
          }
        }
      };
      break;

    case GET_CURRENCY_ETHEREUM_BITSO:
      let ethereumHistoryBitso = state.currenciesHistory.ethereum;
      let ethereumDate = new Date(action.payload.created_at);
      let hoursEthereum = ethereumDate.getHours();
      let minutesEthereum = ethereumDate.getMinutes();
      let secondsEthereum = ethereumDate.getSeconds();
      ethereumHistoryBitso.dataBitso.push(action.payload.price);
      ethereumHistoryBitso.time.push(`${hoursEthereum}:${minutesEthereum}:${secondsEthereum}`);
      if(ethereumHistoryBitso.dataBitso.length === 100){
        ethereumHistoryBitso.dataBitso.splice(0, 1)
        ethereumHistoryBitso.time.splice(0, 1)
      }
      state = {
        ...state,
        refreshChart: {
          ...state.refreshChart,
          ethereum: true
        },
        currencies: {
          ...state.currencies,
          ethereumBitso: {
            price: action.payload.price,
            maker_side: action.payload.maker_side
          }
        },
        currenciesHistory: {
          ...state.currenciesHistory,
          ethereum: {
            ...state.currenciesHistory.ethereum,
            time: ethereumHistoryBitso.time,
            dataBitso: ethereumHistoryBitso.dataBitso
          }
        }
      };
      break;

    case GET_CURRENCY_LITECOIN_BITSO:
      let litecoinHistoryBitso = state.currenciesHistory.litecoin;
      let litecoinDate = new Date(action.payload.created_at);
      let hoursLitecoin = litecoinDate.getHours();
      let minutesLitecoin = litecoinDate.getMinutes();
      let secondsLitecoin = litecoinDate.getSeconds();
      litecoinHistoryBitso.dataBitso.push(action.payload.price);
      litecoinHistoryBitso.time.push(`${hoursLitecoin}:${minutesLitecoin}:${secondsLitecoin}`);
      if(litecoinHistoryBitso.dataBitso.length === 100){
        litecoinHistoryBitso.dataBitso.splice(0, 1)
        litecoinHistoryBitso.time.splice(0, 1)
      }
      state = {
        ...state,
        refreshChart: {
          ...state.refreshChart,
          litecoin: true
        },
        currencies: {
          ...state.currencies,
          litecoinBitso: {
            price: action.payload.price,
            maker_side: action.payload.maker_side
          }
        },
        currenciesHistory: {
          ...state.currenciesHistory,
          litecoin: {
            ...state.currenciesHistory.litecoin,
            time: litecoinHistoryBitso.time,
            dataBitso: litecoinHistoryBitso.dataBitso
          }
        }
      };
      break;

      /////////////////////////////////////////////////////////////////////////////

    case SET_OLD_CURRENCIES:
      state = {
        ...state,
        oldCurrencies: action.payload
      };
      break;

    case SET_UPDATE_FALSE:
      switch (action.payload) {
        case 'Bitcoin':
        state = {
          ...state,
          refreshChart: {
            ...state.refreshChart,
            bitcoin: false
          }
        };
          break;
        case 'Bitcoin Cash':
        state = {
          ...state,
          refreshChart: {
            ...state.refreshChart,
            bitcoin_cash: false
          }
        };
          break;
        case 'Ethereum':
        state = {
          ...state,
          refreshChart: {
            ...state.refreshChart,
            ethereum: false
          }
        };
          break;
        case 'Ripple':
        state = {
          ...state,
          refreshChart: {
            ...state.refreshChart,
            ripple: false
          }
        };
          break;
        case 'Litecoin':
        state = {
          ...state,
          refreshChart: {
            ...state.refreshChart,
            litecoin: false
          }
        };
          break;
        default:
          break;
      }
      break;

    case SETTING_COOKIE:
      state = {
        ...state,
      };
      break;

    case GETTING_COOKIE:
      state = {
        ...state,
        cookieData:action.payload
      };
      break;

    case SETTING_CONFIG_COOKIE:
      state = {
        ...state,
      };
      break;

    case GETTING_CONFIG_COOKIE:
      state = {
        ...state,
        cookieConfig:action.payload
      };
      break;

    default:
      state = {
        ...state
      };
      break;
  }
  return state;
}

export default currency;
