import React from 'react';
import Graph from './Graph';

const bodyStyle = {
  fontFamily: '"DIN Pro", -apple-system, BlinkMacSystemFont, sans-serif',
  margin: '0 15%'
};

const App = () => {
  return (
    <div style={bodyStyle}>
      <Graph />
    </div>
  );
};

export default App;
