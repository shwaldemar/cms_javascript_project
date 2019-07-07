<template lang="html">
  <p>Hello from your valuation app Chae & Mike</p>
</template>

<script>
import StocksService from '@/services/StocksService';

export default {
  name: 'app',
  data: function(){
    return {
      holdings: []
    }
  },

  mounted(){
    StocksService.getHoldings()
    .then(holdings => this.holdings = holdings)
  }

}
</script>

<style lang="css" scoped>
</style>
