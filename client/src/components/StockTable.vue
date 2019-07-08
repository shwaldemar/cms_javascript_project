<template>
  <div>
    <tr>
      <th scope="col">Stock Name</th>
      <th scope="col">Ticker</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
      <th scope="col">Holding Value</th>
    </tr>
    <tr v-for="stock in stocks" >
      <td>{{ stock.name }}</td>
      <td>{{ stock.ticker }}</td>
      <td>{{ stock.quantity }}</td>
      <td>{{ stock.price }}</td>
      <td>{{ stock.totalvalue }}</td>
      <td <button v-on:click="handleClick(stock)">View Chart</button></td>
    </tr>

  </div>
</template>

<script>
import { eventBus } from '../main.js'
export default {
  name: 'stock-table',
  props: ['stocks'],
  methods: {
    handleClick(stock) {
      eventBus.$emit('stock-selected', stock)
    }
  }
}
</script>


<style>
</style>
