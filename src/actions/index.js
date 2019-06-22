// import axios from 'axios';
// import API_KEY from './API_KEY';
import daily from '../Sample Data/daily';
import intraday from '../Sample Data/intraday';

// const baseURL = 'https://www.alphavantage.co/query?';

export const selectStock = ticker => {
  return {
    type: 'STOCK_SELECTED',
    payload: ticker
  };
};

export const setData = data => {
  return {
    type: 'SET_DATA',
    payload: data
  };
};

export const setHover = point => {
  return {
    type: 'HOVER_POINT',
    payload: point
  };
};

export const setStartDate = date => {
  return {
    type: 'SET_STARTDATE',
    payload: date
  };
};

export const setMinX = x => {
  return {
    type: 'SET_XMIN',
    payload: x
  };
};

export const setMaxX = x => dispatch => {
  dispatch({
    type: 'SET_XMAX',
    payload: x
  });
  return Promise.resolve()
};

export const setMinY = y => {
  return {
    type: 'SET_YMIN',
    payload: y
  };
};

export const setMaxY = y => {
  return {
    type: 'SET_YMAX',
    payload: y
  };
};

export const getIntraday = () => {
  return {
    type: 'FETCH_INTRADAY',
    payload: intraday
  }
};

export const getDaily = () => {
  return {
    type: 'FETCH_DAILY',
    payload: daily,
  }
};

// export const getIntraday = ticker => async dispatch => {
  // const response = await axios.get(`${baseURL}function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${API_KEY}`);
  // const { data } = response;

  // dispatch({type: 'FETCH_INTRADAY', payload: data});
// };

// export const getDaily = ticker => async dispatch => {
  // const response = await axios.get(`${baseURL}function=TIME_SERIES_DAILY&symbol=${ticker}&interval=5min&apikey=${API_KEY}`);
  // const { data } = response;

  // dispatch({type: 'FETCH_DAILY', payload: data});
// };

