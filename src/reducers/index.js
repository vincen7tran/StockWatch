import { combineReducers } from 'redux';
import dailyReducer from './dailyReducer';
import intradayReducer from './intradayReducer';
import stockReducer from './stockReducer';

export default combineReducers({
  intraday: intradayReducer,
  daily: dailyReducer,
  selectedStock: stockReducer,
});
