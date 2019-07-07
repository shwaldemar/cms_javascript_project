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
      console.log('inside dot then')
      StocksService.getHistData()
        .then(data => this.priceData = data)
    })
    console.log('outside dot then')
  }
}
</script>

<style lang="css" scoped>
</style>
