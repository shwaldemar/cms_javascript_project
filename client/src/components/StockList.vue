<template>
  <div>
      <!-- <table style="width:100%">
        <tr>
          <th>Name:</th>
          <th>Ticker:</th> 
          <th>Quantity:</th>
          <th>Price:</th> 
          <th>Value:</th>
        </tr>
        <tr>
            <stock-item v-for="stock in stocks" :stock="stock"></stock-item>
        </tr>
    </table> -->

    <stock-item v-for="stock in stocks" :stock="stock"></stock-item>
  </div>
</template>

<script>
import StockItem from './StockItem.vue'

export default {
  name: 'stock-list',
  props: ['stocks'],
  components: {
    'stock-item': StockItem
  }
}
</script>


<style>
</style>
