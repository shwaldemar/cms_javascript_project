<template>
  <div>
    <h2>Hello from your valuation app!</h2>
    <stock-list :stocks='stocks'/>
  </div>
</template>

<script>
import StockList from '@/components/StockList.vue';

import { eventBus } from './main.js';

export default {
  name: 'app',
  data() {
    return {
      selectedStock: null,
      stocks: [
        {
          "ticker": "GOOG",
          "name": "Google",
          "quantity": 100,
          "price": 544.45,
          "totalvalue": 54450
        },
        {
          "ticker": "FB",
          "name": "FaceBook",
          "quantity": 100,
          "price": 64.50,
          "totalvalue": 6450
        }
      ]
    }
  },
  mounted(){
    eventBus.$on('stock-selected',
    (stock) => {
      this.selectedStock = stock
    })

  },
  components: {
    'stock-list': StockList,
  },
}

</script>

<style>
</style>
