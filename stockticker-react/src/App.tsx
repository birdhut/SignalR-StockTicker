import * as React from 'react';
import './App.css';
import { PageHeader } from 'react-bootstrap';
import StockTicker from './StockTicker'


class App extends React.Component {
  render() {
    return (
        <div className="App">
            <PageHeader>StockTicker | <small>react ui</small></PageHeader>
            <StockTicker />
        </div>
    );
  }
}

export default App;
