import * as React from 'react';
import { Panel, Table, Glyphicon } from 'react-bootstrap';


const stockArray = [
    { stock: 'GOOG', price: 570.32, dayOpen: 570.3, change: 0.02, percent: 0.00, directionUp: true },
    { stock: 'MSFT', price: 30.91, dayOpen: 30.31, change: 0.6, percent: 1.94, directionUp: true },
    { stock: 'APPL', price: 577.47, dayOpen: 578.18, change: -0.71, percent: -0.12, directionUp: false },
    ];

// Renders a Direction Icon
const DirectionIcon = (props) => {
    return (
        props.directionUp ?
            <Glyphicon glyph="circle-arrow-up" /> : 
            <Glyphicon glyph="circle-arrow-down" />
    );
}

const TickerRow = (props) => {
    return (
        <tr>
            <td>{props.stock}</td>
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
        stockItems: stockArray,
    };

    renderRow(s) {
        return <TickerRow key={s.stock}  
            stock={s.stock}
            price={s.price} 
            dayOpen={s.dayOpen} 
            change={s.change}
            percent={s.percent}
            directionUp={s.directionUp}></TickerRow>
    };

    render() {
        const rowItems = this.state.stockItems.map((stock) => this.renderRow(stock));
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
}


export default StockTicker
