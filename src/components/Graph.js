import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getIntraday, getDaily, setMinX, setMaxX, setMinY, setMaxY, setStartDate, setEndDate, setData, setHover } from '../actions';

const container = {
  display: 'block',
  paddingLeft: '6px',
  paddingRight: '6px',
  flex: '0 0 66.66667%'
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
  overflow: 'visible',
};

const pathStyle = {
  stroke: '#21ce99',
  strokeWidth: '2.5',
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

  componentDidUpdate(prevProps) {
    const prevXMax = prevProps.xMax;
    const prevDaily = prevProps.daily;
    const { daily, xMax, startDate, endDate } = this.props;

    if (xMax !== prevXMax) this.getMinAndMaxY(startDate, endDate);
    if (daily !== prevDaily) this.getMinAndMaxX();
  }

  handleMouseMove = (e) => {
    const { data, setHover } = this.props;
    const el = document.getElementById('graphPath');
    const rect = el.getBoundingClientRect();
    const coord = e.clientX - rect.x;
    const x = coord < 0 ? 0 : Math.round(this.getX(coord));

    if (data[x]) setHover(data[x]);
  }

  clearHover = () => {
    const { setHover } = this.props;

    setHover(null);
  }

  getMinAndMaxX = () => {
    const { daily, setMinX, setMaxX, setStartDate, setEndDate } = this.props;
    const timeSeries = daily['Time Series (Daily)'];
    const today = moment(new Date()).format('YYYY-MM-DD');
    const oneMonthAgo = moment(today, 'YYYY-MM-DD').subtract(1, 'month').format('YYYY-MM-DD');
    let max = 0;
    let current = oneMonthAgo;

    while (current < today) {
      if (timeSeries[current]) max++;
      current = moment(current, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
    }

    const endDate = moment(current, 'YYYY-MM-DD').subtract(1, 'day').format('YYYY-MM-DD');
    
    setMinX(0);
    setStartDate(oneMonthAgo);
    setEndDate(endDate);
    setMaxX(max - 1);
    
  }

  getMinAndMaxY = (startDate, endDate) => {
    const { daily, setMinY, setMaxY, setData }  = this.props;
    const timeSeries = daily['Time Series (Daily)'];
    const start = startDate;
    const end = endDate;
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
          coords: this.getSvgX(x),
          date: current 
        });
        x++;
      }
      current = moment(current, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
    }

    setData(data);
    setMinY(parseFloat(minY));
    setMaxY(parseFloat(maxY) * 1.0025);

    return {
      min: minY,
      max: maxY
    }
  }

  getX = svg => {
    const { xMax } = this.props;
    const width = 676;

    return (svg * xMax / width);
  }

  getSvgX = x => {
    const { xMax } = this.props;
    const width = 676;

    return (x / xMax * width);
  }

  getSvgY = y => {
    const { yMin, yMax } = this.props;
    const height = 196;
    const heightAdjusted = height / (1 - yMin / yMax);

    return heightAdjusted - (y / yMax) * heightAdjusted;
  }

  makePath = () => {
    const { data } = this.props;

    let pathD = `M ${this.getSvgX(data[0].x)} ${this.getSvgY(data[0].y)}`;

    pathD += data.map(point => {
      const x = this.getSvgX(point.x);
      const y = this.getSvgY(point.y);
      
      return `L ${x} ${y}`;
    });

    return (
      <path id="graphPath" d={pathD} style={pathStyle} width="676px" height="196px" />
    );
  }

  makeAxis = () => {
    const { xMin, xMax, yMin, yMax, hoverPoint } = this.props;
    const color = { stroke: '#8c8c8e' };

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
        {
          hoverPoint
          &&
          <line style={color}
            x1={hoverPoint.coords}
            y1={this.getSvgY(yMin)}
            x2={hoverPoint.coords}
            y2={this.getSvgY(yMax)}
          />
        }
        {
          hoverPoint 
          &&
          <circle cx={hoverPoint.coords} cy={this.getSvgY(hoverPoint.y)} r="4" stroke="black" strokeWidth="2" fill="#21ce99" />
        }
      </g>
    );
  }

  makeHoverDate = () => {
    const { hoverPoint } = this.props;
    const date = moment(hoverPoint.date).format('MMM DD, YYYY');

    const hoverDate = {
      position: 'absolute',
      bottom: '100%',
      left: `${hoverPoint.coords}px`
    };

    const center = {
      position: 'relative',
      left: '-50%'
    };

    const text = {
      opacity: '1',
      color: '#8c8c8e',
      marginBottom: '6px',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      fontSize: '13px',
      fontWeight: '400',
      lineHeight: '19px',
      letterSpacing: '0.25px'
    };

    return (
      <div style={hoverDate}>
        <div style={center}>
          <span style={text}>
            {date}
          </span>
        </div>
      </div>
    );
  }

  getPrice = () => {
    const { daily, hoverPoint, endDate } = this.props;
    const timeSeries = daily['Time Series (Daily)'];
    
    const price =
      hoverPoint ?
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(hoverPoint.y) :
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(timeSeries[endDate]['4. close']);

    return price;
  }

  render() {
    const { data, hoverPoint, endDate } = this.props;

    return (
      <div style={container}>
        <header>
          <h1 style={stockTitle}>MSFT</h1>
        </header>
        <div>
          <section style={graphSection}>
            <header style={priceHeader}>
              <h1 style={priceH1}>
                {endDate && this.getPrice()} 
              </h1>
            </header>
            <div style={graphDiv}>
              {hoverPoint && this.makeHoverDate()}
              {
                data.length
                &&
                <svg 
                  id="graph"
                  style={svgStyle}
                  onMouseLeave={this.clearHover}
                  onMouseMove={e => this.handleMouseMove(e)}
                  viewBox={`0 0 676 196`}
                >
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

const mapStateToProps = (state) => {
  const { daily, intraday, xMin, xMax, yMin, yMax, startDate, endDate, data, hoverPoint } = state;

  return {
    daily,
    intraday,
    xMin,
    xMax,
    yMin,
    yMax,
    startDate,
    endDate,
    data,
    hoverPoint,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    ...bindActionCreators({ 
      getIntraday,
      getDaily,
      setMinX,
      setMaxX,
      setMinY,
      setMaxY,
      setStartDate,
      setEndDate,
      setData,
      setHover,
    }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Graph);