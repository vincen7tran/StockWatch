import { combineReducers } from 'redux';
import dailyReducer from './dailyReducer';
import intradayReducer from './intradayReducer';
import stockReducer from './stockReducer';
import xMinReducer from './xMinReducer';
import xMaxReducer from './xMaxReducer';
import yMinReducer from './yMinReducer';
import yMaxReducer from './yMaxReducer';
import startDateReducer from './startDateReducer';
import dataReducer from './dataReducer';
import hoverReducer from './hoverReducer';
import endDateReducer from './endDateReducer';
import setUserReducer from './setUserReducer';
import durationReducer from './durationReducer';

export default combineReducers({
  intraday: intradayReducer,
  daily: dailyReducer,
  selectedStock: stockReducer,
  xMin: xMinReducer,
  xMax: xMaxReducer,
  yMin: yMinReducer,
  yMax: yMaxReducer,
  startDate: startDateReducer,
  data: dataReducer,
  hoverPoint: hoverReducer,
  endDate: endDateReducer,
  user: setUserReducer,
  duration: durationReducer
});
