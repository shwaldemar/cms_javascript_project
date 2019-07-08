<template>
  <div v-if='selectedStock'>
    <!-- <h3>{{ selectedStock.ticker}}</h3> -->

  </div>

</template>

<script>
import { eventBus } from '../main.js'

export default {
  name: 'stock-detail',
  data() {
    return {
      selectedStock: null
    }
  },
  mounted(){
    eventBus.$on('stock-selected',
    (stock) => {
      this.selectedStock = stock
    })
  }
}
</script>

<style>
</style>
