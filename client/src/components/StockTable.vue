<template>
  <div>
    <tr>
      <th scope="col">Stock Name</th>
      <th scope="col">Ticker</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
      <th scope="col">Holding Value</th>
      <th scope="col">View Chart</th>
      <th scope="col">Delete Holding</th>
    </tr>
    <tr v-for="stock in stocks" >
      <td>{{ stock.name }}</td>
      <td>{{ stock.ticker }}</td>

      <td v-if="!editable">{{ stock.quantity }}</td>
      <td v-if="editable === stock._id"> <input type="number" name="quantity"
      v-model.number="stock.quantity" required min="1"> </td>

      <td>{{ stock.price.toLocaleString("en-GB", {style: "currency", currency: "GBP", minimumFractionDigits: 2}) }}</td>
      <td>{{ stock.totalvalue.toLocaleString("en-GB", {style: "currency", currency: "GBP", minimumFractionDigits: 2}) }}</td>

      <td> <button v-on:click="handleClick(stock)">View Chart</button></td>

      <td> <button v-on:click="setEdit(stock)">Edit</button>  </td>
      <td> <button v-show="editable === stock._id" v-on:click="handleStockEdit(stock)">Confirm</button>  </td>

      <td> <button v-on:click="handleDelHoldingClick(stock)">Delete Holding</button></td>

    </tr>
    <tr>
      <td>ALL STOCKS</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>{{total_stock_value}}</td>
      <td> <button v-on:click="handleAllStocksClick">View Chart</button></td>
    </tr>

  </div>
</template>

<script>
import { eventBus } from '../main.js'
import StocksService from '../services/StocksService'
export default {
  name: 'stock-table',
  props: ['stocks', 'total_stock_value'],
  data() {
    return {
      editable: ""
    }
  }, //comma inserted to fix error
  methods: {
    handleClick(stock) {
      eventBus.$emit('stock-selected', stock.ticker)
    },
    setEdit(stock) {
      this.editable = stock._id;
    }, // inserted comma to solve error
    handleStockEdit(stock) {
      StocksService.updateHolding(stock)
      this.editable = ""
    },
    handleAllStocksClick() {
      eventBus.$emit('all-stocks-selected', "")
    },
    handleDelHoldingClick(stock) {
      StocksService.deleteHolding(stock._id)
        .then (response => eventBus.$emit('holding-deleted', stock))
    }
  }
}
</script>


<style>
</style>
