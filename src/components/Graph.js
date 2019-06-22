import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getIntraday, getDaily, setMinX, setMaxX, setMinY, setMaxY, setStartDate } from '../actions';

const container = {
  display: 'block',
  paddingLeft: '6px',
  paddingRight: '6px',
};

const stockTitle = {
  fontSize: '36px',
  fontWeight: '500',
  letterSpacing: '-0.29px',
  lineHeight: '42px',
  margin: '0'
};

const graphSection = {
  width: '676px',
  marginBottom: '44px',
}

const priceHeader = {
  marginBottom: '12px',
};

const priceH1 = {
  marginBottom: '4px',
  fontSize: '36px',
  fontWeight: '400',
  lineSpacing: '-0.7px',
  lineHeight: '42px',
  margin: '0',
};

const graphDiv = {
  position: 'relative',
  height: '100%',
  width: '100%',
};

const svgStyle = {
  width: '676px',
  height: '196px',
}

const lineColor = {
  color: '#21ce99'
};

class Graph extends React.Component {
  componentDidMount() {
    const { getIntraday, getDaily } = this.props;

    getIntraday('MSFT');
    getDaily('MSFT');
  }

  getMinAndMaxX = () => {
    const { setMinX, setMaxX, setStartDate } = this.props;
    const today = moment(new Date()).format('YYYY-MM-DD');
    const oneMonthAgo = moment(today, 'YYYY-MM-DD').subtract(1, 'month').format('YYYY-MM-DD');
    const max = moment(today, 'YYYY-MM-DD').diff(moment(oneMonthAgo, 'YYYY-MM-DD'), 'days');

    setMinX(0);
    setMaxX(max);
    setStartDate(today);
    this.getMinAndMaxY(oneMonthAgo, today);
    
    return {
      minX: 0,
      maxX: max,
    };
  }

  getMinAndMaxY = (minX, maxX) => {
    const { setMinY, setMaxY }  = this.props;
    const timeSeries = this.props.daily['Time Series (Daily)'];
    const start = minX;
    const end = maxX;
    let current = start;
    let minY = Infinity;
    let maxY = -Infinity;

    while (current < end) {
      if (timeSeries[current]) {
        const value = timeSeries[current]['4. close'];

        if (value < minY) minY = value;
        else if (value > maxY) maxY = value;
      }
      current = moment(current, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
    }

    setMinY(parseFloat(minY));
    setMaxY(parseFloat(maxY));

    return {
      min: minY,
      max: maxY
    }
  }

  getSvgX = x => {
    const { width, xMax } = svgStyle;
    return (x / xMax * width)
  };

  getSvgY = y => {
    const { height, yMax } = svgStyle;
    return (y / yMax * height);
  };

  makePath = () => {

  };

  render() {
    if(this.props.daily) {
      this.getMinAndMaxX();
    }

    return (
      <div style={container}>
        <header>
          <h1 style={stockTitle}>MSFT</h1>
        </header>
        <div>
          <section style={graphSection}>
            <header className={priceHeader}>
              <h1 style={priceH1}>
                $123.12
              </h1>
            </header>
            <div style={graphDiv}>

            </div>
          </section>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  const { daily, intraday, xMin, xMax, yMin, yMax, startDate } = state;

  return {
    daily,
    intraday,
    xMin,
    xMax,
    yMin,
    yMax,
    startDate
  };
};

export default connect(mapStateToProps, { 
  getIntraday,
  getDaily,
  setMinX,
  setMaxX,
  setMinY,
  setMaxY,
  setStartDate
})(Graph);