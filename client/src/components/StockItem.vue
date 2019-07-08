<template>
  <div>
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
