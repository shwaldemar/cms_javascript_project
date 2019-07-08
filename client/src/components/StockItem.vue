<template>
  <div>
    <!-- <table>
      <tr>
      <th>Name:</th>
      <th>Ticker:</th> 
      <th>Quantity:</th>
      <th>Price:</th> 
      <th>Value:</th>
    </tr>
    <tr> -->
      <!-- <td>{{ stock.name }}</td>
      <td>{{ stock.ticker }}</td> 
      <td>{{ stock.quantity }}</td>
      <td>{{ stock.price }}</td>
      <td>{{ stock.totalvalue }}</td> -->
    <!-- </tr>
  </table> -->

  <li v-on:click="handleClick">{{ stock.name }} | {{ stock.ticker }} | {{ stock.quantity }} | {{ stock.price }} | {{ stock.totalvalue }} |</li>
</div>
</template>

<script>
import { eventBus } from '../main.js'

export default {
  name: 'stock-item',
  props: ['stock'],
  methods: {
    handleClick() {
      eventBus.$emit('stock-selected', this.stock)
    }
  }
}
</script>

<style>
table {
  border-spacing: 1px;
}
table, th, td {
  border: 1px solid black;
  border-spacing: 1px;

}
th, td {
  padding: 2px;
  text-align: justify;
}
</style>
