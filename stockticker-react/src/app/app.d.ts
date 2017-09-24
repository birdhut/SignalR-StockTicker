interface JQueryStatic {
    connection: Connection;
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