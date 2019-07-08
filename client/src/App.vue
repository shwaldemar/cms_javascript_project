<template lang="html">
  <div>
    <p>Hello from your valuation app Chae & Mike</p>

    <new-holding-form></new-holding-form>
  </div>
</template>

<script>
import StocksService from '@/services/StocksService';
import NewHoldingForm from '@/components/NewHoldingForm';

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
  },
  components: {
    'new-holding-form': NewHoldingForm
  }
}
</script>

<style lang="css" scoped>
</style>
