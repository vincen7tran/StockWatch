import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getIntraday, getDaily, setMinX, setMaxX, setMinY, setMaxY, setStartDate, setData } from '../actions';

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
  stroke: '#21ce99',
  strokeWidth: '2',
  fill: 'none',
};

const axisStyle = {
  stroke: '#1b1b1d'
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
    const { setMinY, setMaxY, setData }  = this.props;
    const timeSeries = this.props.daily['Time Series (Daily)'];
    const start = minX;
    const end = maxX;
    const data = [];
    let current = start;
    let minY = Infinity;
    let maxY = -Infinity;
    let x = 0;

    while (current < end) {
      if (timeSeries[current]) {
        const value = timeSeries[current]['4. close'];

        if (value < minY) minY = value;
        else if (value > maxY) maxY = value;
        data.push({
          x,
          y: value,
          date: current 
        });
        x++;
      }
      current = moment(current, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
    }

    setData(data);
    setMinY(parseFloat(minY));
    setMaxY(parseFloat(maxY));

    return {
      min: minY,
      max: maxY
    }
  }

  getSvgX = x => {
    const { xMax } = this.props;
    const width = 676;
    return (x / xMax * width);
  };

  getSvgY = y => {
    const { yMax } = this.props;
    const height = 196;
    return height - (y / yMax * height);
  };

  makePath = () => {
    const { data } = this.props;

    let pathD = `M ${this.getSvgX(data[0].x)} ${this.getSvgY(data[0].y)}`;

    pathD += data.map((point, i) => {
      return `L ${this.getSvgX(point.x)} ${this.getSvgY(point.y)}`;
    });

    return (
      <path d={pathD} style={svgStyle} width="676" height="196" />
    );
  };

  makeAxis = () => {
    const { xMin, xMax, yMin, yMax } = this.props;

    return (
      <g style={axisStyle}>
        <line
          x1={this.getSvgX(xMin)}
          y1={this.getSvgY(yMin)}
          x2={this.getSvgX(xMax)}
          y2={this.getSvgY(yMin)}
        />
        <line
          x1={this.getSvgX(xMin)}
          y1={this.getSvgY(yMin)}
          x2={this.getSvgX(xMin)}
          y2={this.getSvgY(yMax)}
        />
      </g>
    )
  };

  render() {
    const { daily, data } = this.props;

    if (daily && !data.length) this.getMinAndMaxX();

    return (
      <div style={container}>
        <header>
          <h1 style={stockTitle}>MSFT</h1>
        </header>
        <div>
          <section style={graphSection}>
            <header style={priceHeader}>
              <h1 style={priceH1}>
                $123.12
              </h1>
            </header>
            <div style={graphDiv}>
              {data.length
              &&
              <svg viewBox={`0 0 676 196`}>
                {this.makePath()}
                {this.makeAxis()}
              </svg>
              }
            </div>
          </section>
        </div>
      </div>
    );
  };
}

const mapStateToProps = state => {
  const { daily, intraday, xMin, xMax, yMin, yMax, startDate, data } = state;

  return {
    daily,
    intraday,
    xMin,
    xMax,
    yMin,
    yMax,
    startDate,
    data,
  };
};

export default connect(mapStateToProps, { 
  getIntraday,
  getDaily,
  setMinX,
  setMaxX,
  setMinY,
  setMaxY,
  setStartDate,
  setData,
})(Graph);