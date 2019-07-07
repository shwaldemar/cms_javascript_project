use stock_trader;
db dropDatabase();

db.holdings.insertMany([
  {
    "ticker": "INTC",
    "name": "Intel Corporation",
    "quantity": 100
  },
  {
    "ticker": "GE",
    "name": "General Electric Company",
    "quantity": 200
  },
  {
    "ticker": "MSFT",
    "name": "Microsoft Corporation",
    "quantity": 250
  },
  {
    "ticker": "CZR",
    "name": "Caesars Entertainment Corporation",
    "quantity": 170
  }
])
