<template>
  <div>
    <h2>Hello from your valuation app!</h2>
    <stock-table :stocks='all_shares_summary' :total_stock_value="total_stock_value"/>
    <new-holding-form></new-holding-form>
    <trend-chart v-if="stockData" :stockData="stockData"></trend-chart>
  </div>
</template>

<script>
import StocksService from '@/services/StocksService';
import StockTable from '@/components/StockTable.vue';
import NewHoldingForm from '@/components/NewHoldingForm';
import TrendChart from '@/components/TrendChart.vue';
import { eventBus } from './main.js';

export default {
  name: 'app',
  data: function(){
    return {
      selectedStock: null,
      holdings: [],
      priceData: [],
      total_stock_value: 0,
      all_shares_summary: [],
      all_shares_aggr_hist: [],
      // all_shares_value: [],
      stockData: null
    }
  },
  methods: {
    build_stock_summary_total_value() {
      // 1. Total value of shareholding
      // for each share in holdings
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
      for (i = 0; i < this.holdings.length; i++) {
        // extract the ticker
        ticker = this.holdings[i].ticker;
        // identify the historical data for this ticker
        index =
          this.priceData.findIndex(
            stock => stock.symbol === ticker)
        // get length of historical data holdings
        num_entries = this.priceData[index]["historical"].length
        // pull out the latest value - can replace with a fetch to api
        current_price = this.priceData[index]["historical"][num_entries - 1].close
        stock_value = current_price * this.holdings[i].quantity;
        this.total_stock_value += stock_value;

        // Build summary list
        // Start building summary data to then push onto all_shares_summary
        temp_summ_data = this.holdings[i];
        temp_summ_data["price"] = current_price.toFixed(2);
        temp_summ_data["totalvalue"] = stock_value.toFixed(2);
        this.all_shares_summary.push(temp_summ_data);
        // re-initialize for next round
        temp_summ_data = [];
      }
    },
    build_aggregated_historical_object() {
    // This function loops through all the historical data objects and aggregates the close * qty data for each date for all shares to allow a composite graph of all shares to be displayed.

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
      let num_hist_days = this.priceData[0]["historical"].length;
      // number of stocks to loop through
      let num_stocks = this.priceData.length;

      for (i = 0; i < num_hist_days; i++) {

        for (i2 = 0; i2 < num_stocks; i2++) {
          // Capture date for populating new object
          curr_date = this.priceData[i2]["historical"][i].date;
          // Capture ticker
          ticker = this.priceData[i2].symbol;
          // Capture no of shares for this ticker
          index =
            this.holdings.findIndex(
              stock => stock.ticker === ticker)
          qty = this.holdings[index].quantity;
          // Capture close current_price
          close_price =  this.priceData[i2]["historical"][i].close;
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
// ,
    // build_shares_value_object() {
    //   this.all_shares_value =
    //     this.all_shares_summary.map(share => { {"ticker": this.ticker, "totalvalue": this.totalvalue } } )
    //   }
    // }
  },
  mounted() {
    StocksService.getHoldings()
    .then(holdings => {
      this.holdings = holdings
      const promises = this.holdings.map(holding => {
        return StocksService.getHistData(holding.ticker)
      })
      Promise.all(promises)
      .then(data => {
        this.priceData = data

        this.build_stock_summary_total_value()
        this.build_aggregated_historical_object()
        // Default trend view on app open
        this.stockData = this.all_shares_aggr_hist
      })
    })
    eventBus.$on('stock-selected',
    (stock) => {
      this.selectedStock = stock
      this.stockData =
        this.priceData[this.priceData.findIndex(stock => stock.symbol === this.selectedStock)].historical
    })

    eventBus.$on('holding-added', (holding) => {
      this.holdings.push(holding)
      StocksService.getHistData(holding.ticker)
        .then(data => {
          this.priceData.push(data)
          this.all_shares_summary = []
          this.all_shares_aggr_hist = []
          this.total_stock_value = 0
          this.build_stock_summary_total_value()
          this.build_aggregated_historical_object()
        })
    })

    // const consoleLogAStringToMakeSureItWorks = () => {
    //   console.log("All Stocks Selected hit");
    // }

    eventBus.$on('all-stocks-selected', () => {
      this.stockData = this.all_shares_aggr_hist})
  },
  components: {
    'stock-table': StockTable,
    'new-holding-form': NewHoldingForm,
    'trend-chart': TrendChart
  }
}

</script>

<style>
</style>
