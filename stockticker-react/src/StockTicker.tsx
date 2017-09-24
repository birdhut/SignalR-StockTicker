import * as React from 'react';
import { Panel, Table, Glyphicon } from 'react-bootstrap';
import * as $ from 'jquery';

/*
const stockArray = [
    { stock: 'GOOG', price: 570.32, dayOpen: 570.3, change: 0.02, percent: 0.00, directionUp: true },
    { stock: 'MSFT', price: 30.91, dayOpen: 30.31, change: 0.6, percent: 1.94, directionUp: true },
    { stock: 'APPL', price: 577.47, dayOpen: 578.18, change: -0.71, percent: -0.12, directionUp: false },
];
*/

// Renders a Direction Icon
const DirectionIcon = (props) => {
    return (
        props.directionUp ?
            <Glyphicon glyph="circle-arrow-up" /> : 
            <Glyphicon glyph="circle-arrow-down" />
    );
}
const NoData = (props) => {
    return (<tr><td colSpan={6}>No Data</td></tr>);
}
const TickerRow = (props) => {
    return (
        <tr>
            <td>{props.symbol}</td>
            <td>{props.price}</td>
            <td>{props.dayOpen}</td>
            <td>{props.change}</td>
            <td><DirectionIcon directionUp={props.directionUp} /></td>
            <td>{props.percent}</td>
        </tr>
    );
}

class StockTicker extends React.Component {

    state = {
        stockItems : [], 
    };
    
    ticker : any;

    renderRow(s) {
        return <TickerRow key={s.symbol}  
            stock={s.symbol}
            price={s.price} 
            dayOpen={s.dayOpen} 
            change={s.change}
            percent={s.percent}
            directionUp={s.directionUp}></TickerRow>
    };

    render() {
        const rowItems = this.state.stockItems.length > 0 ? 
            this.state.stockItems.map((stock) => this.renderRow(stock)) :
            <NoData />;
            

        return (
            <Panel>
                <h2>Live Stock Table</h2>
                <Table responsive striped hover>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Price</th>
                            <th>Open</th>
                            <th>Change</th>
                            <th><DirectionIcon directionUp={true} /><DirectionIcon directionUp={false} /></th>
                            <th>%</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {rowItems}
                        
                    </tbody>
                </Table>
            </Panel>
        );
    }

    updateStockHandler(stocks) {
        this.setState({stockItems : stocks});
    }

    init() {
        this.ticker.server.getAllStocks().done(function (stocks) {
            this.updateStockHandler(stocks);
        });
    }

    componentDidMount() {
        this.ticker = $.connection.stockTickerMini // the generated client-side hub proxy
            // Add a client-side hub method that the server will call
        this.ticker.client.updateStockPrice = function (stock) {
            this.updateStockHandler(stock);
        }

        // Turn on logging
        $.connection.hub.logging = true;

        // Start the connection
        $.connection.hub.start().done(this.init);
    }
}


export default StockTicker

