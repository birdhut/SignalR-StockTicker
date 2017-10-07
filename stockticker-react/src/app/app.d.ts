interface JQueryStatic {
    connection: any;
  }

interface Connection {
    stockTickerMini : StockTickerMini
}

interface StockTickerMini {
    client: Client
}

interface Client {
    updateStockPrice(stock): void
}