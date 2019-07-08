<template lang="html">
  <div>
    <p>Working on data structure setup</p>
    <p>Stock value: {{total_stock_value.toFixed(2)}}</p>
    <p>All shares summary: {{all_shares_summary}}</p>
    <p>All shares aggregate historic: {{all_shares_aggr_hist}}</p>

    <p>start date: {{historicalStockList[0]["historical"][0].date}}</p>
    <p>first price: {{historicalStockList[0]["historical"][0].close}}</p>
    <p>Number of days to loop through: {{historicalStockList[0]["historical"].length}}</p>
    <p>Number of stocks to loop through: {{historicalStockList.length}}</p>
    <p>ticker: {{historicalStockList[1].symbol}}</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      total_stock_value: 0,
      all_shares_summary: [],
      all_shares_aggr_hist: [],
      // Hard coded seed data for unit testing - start
      stock_array: [
        {
          "ticker": "AAPL",
          "name":  "Apple Inc",
          "quantity": 20
        },
        {
          "ticker": "GOOG",
          "name": "Google Inc",
          "quantity": 50
        }
      ],
      historicalStockList: [
        {
          "symbol": "GOOG",
          "historical": [
            {
              "date": "2014-06-13",
              "close": 551.76
            },
            {
              "date": "2014-06-16",
              "close": 544.28
            },
            {
              "date": "2019-07-04",
              "close": 1125.20
            },
            {
              "date": "2019-07-05",
              "close": 1131.16
            }
          ]
        },

        {
          "symbol": "AAPL",
          "historical": [
            {
              "date": "2014-06-13",
              "close": 83.6603
            },
            {
              "date": "2014-06-16",
              "close": 84.5035
            },
            {
              "date": "2019-07-04",
              "close": 204.37
            },
            {
              "date": "2019-07-05",
              "close": 204.55
            }
          ]
        }
      ]
      // Hard coded seed data for unit testing - end
    }
  },
  methods: {
    build_stock_summary_total_value() {
      // 1. Total value of shareholding
      // for each share in stock_array
        // Determine index for relevant entry in historical data array
        // Locate last entry in historical data object entry for that stock
        // Use the close price * share quantity to get total value of shares
        // add to running total to get total stock value
      // end
      // 2. Augment database info
      // Add current price and individual stock value onto info retrieved from database and make new array set available for the list function
      let i;
      let ticker = "";
      let index = 0;
      let num_entries = 0;
      let current_price = 0;
      let stock_value = 0;
      let temp_summ_data = [];

      // loop round all stocks in the array
      for (i = 0; i < this.stock_array.length; i++) {
        // extract the ticker
        ticker = this.stock_array[i].ticker;
        // identify the historical data for this ticker
        index =
          this.historicalStockList.findIndex(
            stock => stock.symbol === ticker)
        // get length of historical data stock_array
        num_entries = this.historicalStockList[index]["historical"].length
        // pull out the latest value - can replace with a fetch to api
        current_price = this.historicalStockList[index]["historical"][num_entries - 1].close
        stock_value = current_price * this.stock_array[i].quantity;
        this.total_stock_value += stock_value;

        // Build summary list
        // Start building summary data to then push onto all_shares_summary
        temp_summ_data = this.stock_array[i];
        temp_summ_data["price"] = current_price.toFixed(2);
        temp_summ_data["totalvalue"] = stock_value.toFixed(2);
        this.all_shares_summary.push(temp_summ_data);
        // re-initialize for next round
        temp_summ_data = [];
      }
    },
    build_aggregated_historical_object() {
    // This function loops through all the historical data objects and aggregates the close * qty data for each date to allow a composite graph of all shares to be displayed.

      let i;
      let i2;
      let curr_date;
      let daily_total = 0;
      let temp_aggr_data = null;
      let ticker;
      let qty;
      let index;
      let close_price;

      // Use first historical element as driver for number of iterations (days of data) - all should be same as that's what's returned from api
      let num_hist_days = this.historicalStockList[0]["historical"].length;
      // number of stocks to loop through
      let num_stocks = this.historicalStockList.length;

      for (i = 0; i < num_hist_days; i++) {

        for (i2 = 0; i2 < num_stocks; i2++) {
          // Capture date
          curr_date = this.historicalStockList[i2]["historical"][i].date;
          // Capture ticker
          ticker = this.historicalStockList[i2].symbol;
          // Capture no of shares for this ticker
          index =
            this.stock_array.findIndex(
              stock => stock.ticker === ticker)
          qty = this.stock_array[index].quantity;
          // Capture close current_price
          close_price =  this.historicalStockList[i2]["historical"][i].close;
          // Add into running total for this date
          daily_total += (close_price * qty);
        }
        // Move daily total into temp daily aggr arra
        temp_aggr_data = { "date": curr_date, "value": daily_total };
        this.all_shares_aggr_hist.push(temp_aggr_data);
        daily_total = 0;
        temp_aggr_data = [];
      }
    }
  },
  mounted() {
    this.build_stock_summary_total_value();
    this.build_aggregated_historical_object();
  }
}
</script>

<style lang="css" scoped>
</style>
