<template lang="html">
  <p>Hello from your valuation app Chae & Mike</p>
</template>

<script>
import StocksService from '@/services/StocksService';

export default {
  name: 'app',
  data: function(){
    return {
      holdings: [],
      priceData: []
    }
  },

  mounted(){
    StocksService.getHoldings()
    .then(holdings => {
      this.holdings = holdings
      this.holdings.forEach(holding => {
        StocksService.getHistData(holding.ticker)
          .then(data => this.priceData.push(data))
      })
    })
  }
}
</script>

<style lang="css" scoped>
</style>
