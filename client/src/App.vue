<template lang="html">
  <div>
    <p>Working on data structure setup</p>
    <p>Stock value: {{total_stock_value.toFixed(2)}}</p>
    <p>All shares summary: {{all_shares_summary}}</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      total_stock_value: 0,
      all_shares_summary: [],
      all_shares_aggregate_historic: [],
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
        },
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
        }
      ]
      // Hard coded seed data for unit testing - end
    }
  },
  methods: {
    build_stock_summary_total_value() {
      // 1. Total value of shareholding
      // for each share in stockarray
        // determine index for relevant entry in historical data array
        // locate last entry in historical data object entry for that stock and use the close price * share quantity to get total value of share.
        // add them all together to get total value
      // end
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

        this.total_stock_value += (current_price * this.stock_array[i].quantity);

        // Build summary list
        // Start building summary data to then push onto all_shares_summary
        temp_summ_data = this.stock_array[i];
        temp_summ_data["curr_share_price"] = current_price;
        temp_summ_data["total_value"] = (current_price * this.stock_array[i].quantity).toFixed(2);
        this.all_shares_summary.push(temp_summ_data);
        // re-initialize for next round
        temp_summ_data = [];
      }
    }
  },
  mounted() {
    this.build_stock_summary_total_value();
  }
}
</script>

<style lang="css" scoped>
</style>
