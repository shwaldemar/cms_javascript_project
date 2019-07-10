<template>
  <div>
<table class="data-table">
    <tr>
      <th class="table-header" scope="col">Stock Name</th>
      <th class="table-header" scope="col">Ticker</th>
      <th class="table-header" scope="col">Quantity</th>
      <th class="table-header" scope="col">Price</th>
      <th class="table-header" scope="col">Holding Value</th>
    </tr>
    <tr v-for="stock in stocks" >
      <td>{{ stock.name }}</td>
      <td>{{ stock.ticker }}</td>

      <td v-if="editable !== stock._id">{{ stock.quantity }}</td>
      <td v-if="editable === stock._id"> <input type="number" name="quantity"
      v-model.number="stock.quantity" required min="1"> </td>

      <td>{{ stock.price.toLocaleString("en-GB", {style: "currency", currency: "GBP", minimumFractionDigits: 2}) }}</td>
      <td>{{ stock.totalvalue.toLocaleString("en-GB", {style: "currency", currency: "GBP", minimumFractionDigits: 2}) }}</td>

      <td> <button v-on:click="handleClick(stock)">View</button></td>

      <td> <button v-on:click="setEdit(stock)">Edit</button>  </td>


      <td> <button v-on:click="handleDelHoldingClick(stock)">Delete</button></td>

      <td> <button v-show="editable === stock._id" v-on:click="handleStockEdit(stock)">Confirm</button>  </td>

    </tr>
    <tr>
      <td class="table-summary">ALL STOCKS</td>
      <td class="table-summary"></td>
      <td class="table-summary"></td>
      <td class="table-summary"></td>
      <td class="table-summary">{{ total_stock_value.toLocaleString("en-GB", {style: "currency", currency: "GBP", minimumFractionDigits: 2}) }}</td>
      <td></td>
      <!-- <td></td> -->
      <td> <button v-on:click="handleAllStocksClick">View Aggregate Chart</button></td>
    </tr>
</table>
    <hr>
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
.data-table {
  border: 1px solid lightblue;
  border-radius: 5px;
}

form, td, th, tr, h2 {
  font-family: arial;
}

td {
  padding: 5px 20px 3px 5px;
}

h2 {
  padding: 10px;
  margin: 5px;
  margin-bottom: 15px;
  color: darkblue;
  background-color: lightblue;
  border-radius: 5px
}

.table-header, .table-summary {
  padding: 3px;
  color: darkblue;
  background-color: lightblue;
  border-radius: 5px
}

.table-header {
  padding-bottom: 15px;
}

.table-summary {
  font-weight: bold;
  padding-top: 10px;
}

button,
.btn,
.btn-db-danger,
.btn-db-update {
  border-radius: 5px;
  color: darkblue;
  background-color: lightblue;
  font-family: arial;
  border-outline: none;
}

/* .btn:hover {
  color: lightblue;
  background-color: darkblue;
}

.btn-db-danger:hover {
  color: lightblue;
  background-color: red;
}

.btn-db-update:hover {
  color: lightblue;
  background-color: green;
}

.btn:active,
.btn-db-danger:active,
.btn-db-update:active {
  position: relative;
  top: 4px;
  bottom: 4px;
} */
</style>
