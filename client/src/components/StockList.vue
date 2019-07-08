<template>
  <div>
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
