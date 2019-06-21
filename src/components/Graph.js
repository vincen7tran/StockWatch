import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getIntraday, getDaily } from '../actions';

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

class Graph extends React.Component {
  componentDidMount() {
    const { getIntraday, getDaily } = this.props;

    getIntraday('MSFT');
    getDaily('MSFT');
  }

  getMinAndMaxX = () => {
    const today = moment(new Date()).format('YYYY-MM-DD');
    const oneMonthAgo = moment(today, 'YYYY-MM-DD').subtract(1, 'month').format('YYYY-MM-DD');

    return {
      minX: oneMonthAgo,
      maxX: today,
    };
  }

  getMinAndMaxY = (minX, maxX) => {
    const timeSeries = this.props.daily['Time Series (Daily)'];
    let minY = Infinity;
    let maxY = -Infinity;
    const start = minX;
    let current = start;
    const end = maxX;

    while (current < end) {
      if (timeSeries[current]) {
        const value = timeSeries[current]['4. close'];

        if (value < minY) minY = value;
        else if (value > maxY) maxY = value;
      }
      current = moment(current, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
    }

    return {
      min: minY,
      max: maxY
    }
  }

  getSvgX = x => {
    const { width } = svgStyle;
  };

  getSvgY = y => {
    const { height } = svgStyle;
  };

  render() {
    if(this.props.daily) {
      const x = this.getMinAndMaxX();
      const y = this.getMinAndMaxY(x.minX, x.maxX);
      console.log(x, y);
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
  const { daily, intraday } = state;

  return {
    daily,
    intraday,
  };
};

export default connect(mapStateToProps, { getIntraday, getDaily })(Graph);