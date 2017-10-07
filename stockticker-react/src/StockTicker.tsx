import * as React from 'react';
import { Panel, Table, Glyphicon } from 'react-bootstrap';

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
            <td>{props.stock}</td>
            <td>{props.price}</td>
            <td>{props.dayOpen}</td>
            <td>{props.change}</td>
            <td><DirectionIcon directionUp={props.directionUp} /></td>
        </tr>
    );
}

export default class StockTicker extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            stockItems: [],
        };
    }
    
    
    
    ticker : any;

    renderRow(s) {
        return <TickerRow key={s.Symbol}  
            stock={s.Symbol}
            price={s.Price} 
            dayOpen={s.DayOpen} 
            change={s.Change}
            percent={s.Percent}
            directionUp={s.directionUp}></TickerRow>
    };

    render() {
        //console.info(this.state.stockItems);
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
                        </tr>
                    </thead>
                    <tbody>
                            {rowItems}
                    </tbody>
                </Table>
            </Panel>
        );
    }

    updateAllStocksHandler = (stocks) => {
        this.setState({stockItems: stocks});
    }

    updateStockHandler = (stock) =>  {
        
        // copy stock to new variable to avoid mutation
        var key = stock.Symbol;
        var items = this.state.stockItems.slice();
        var item = items.filter(function( s ) {
            return s.Symbol === key;
          })[0];

        // Update the values and set if it exists
        if (item) {
            var up = item.Price < stock.Price;
            item.Price = stock.Price;
            item.Change = stock.Change;
            item.PercentChange = stock.PercentChange;
            item.directionUp = up;
            this.setState(items);
        }
    }

    componentDidMount() {
        var handler = this.updateStockHandler;
        var allHandler = this.updateAllStocksHandler;
        this.ticker = $.connection.stockTickerMini // the generated client-side hub proxy
        $.connection.hub.url = 'http://localhost:53654/signalr';
        
        // Add a client-side hub method that the server will call
        this.ticker.client.updateStockPrice = function (stock) {
            handler(stock);
        }

        // Turn on logging
        $.connection.hub.logging = true;

        // Start the connection
        var server = this.ticker.server;
        $.connection.hub.start().done(function() {
            server.getAllStocks().done(function (stocks) {
                allHandler(stocks);
            });
        });
    }
}


