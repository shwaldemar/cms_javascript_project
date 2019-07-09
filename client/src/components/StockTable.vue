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
    <tr>
      <td>ALL STOCKS</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>{{total_stock_value}}</td>
    </tr>

  </div>
</template>

<script>
import { eventBus } from '../main.js'
export default {
  name: 'stock-table',
  props: ['stocks', 'total_stock_value'],
  methods: {
    handleClick(stock) {
      eventBus.$emit('stock-selected', stock.ticker)
    }
  }
}
</script>


<style>
</style>
