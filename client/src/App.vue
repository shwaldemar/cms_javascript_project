<template>
  <div>
    <h2>Hello from your valuation app!</h2>
    <stock-list :stocks='stocks'/>
    <stock-detail/>
  </div>
</template>

<script>
import StockList from '@/components/StockList.vue';
import StockItem from '@/components/StockItem.vue'
import StockDetail from '@/components/StockDetail.vue'

import { eventBus } from './main.js';

export default {
  name: 'app',
  data() {
    return {
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
    
  },
  components: {
    'stock-list': StockList,
    'stock-item': StockItem,
    'stock-detail': StockDetail
  },
  props: ["stock-list"]
}

</script>

<style>
</style>
