<template lang="html">
  <form v-on:submit="handleSubmit">

    <label for="stock_select">Add Stock&nbsp&nbsp</label>
    <select name="stock_select" v-model="newStock" required>
      <option disabled value="">Select a stock</option>
      <option v-for="newStock in newStockOptions" :value="newStock">{{newStock.name}} ({{newStock.ticker}})</option>

    </select>
    &nbsp&nbsp&nbsp&nbsp
    <label for="quantity">Quantity</label>
    &nbsp&nbsp
    <input type="number" name="quantity"
    v-model.number="quantity" required min="1">
    &nbsp&nbsp&nbsp&nbsp
    <input class="btn-update" type="submit" name="submit" value="Save">

  </form>
</template>

<script>
import {eventBus} from '../main'
import StocksService from '../services/StocksService'

export default {
  name: "new-holding-form",
  data: function(){
    return {
      name: "",
      newStock: "",
      quantity: "",
      newStockOptions: [
        {
          "ticker": "F",
          "name": "Ford Motor Company"
        },
        {
          "ticker": "AMD",
          "name": "Advanced Micro Devices Inc."
        },
        {
          "ticker": "ORCL",
          "name": "Oracle Corporation"
        },
        {
          "ticker": "NKE",
          "name": "Nike Inc."
        },
        {
          "ticker": "PFE",
          "name": "Pfizer Inc."
        },
        {
          "ticker": "XOM",
          "name": "Exxon Mobil Corporation",
        },
        {
          "ticker": "CSCO",
          "name": "Cisco Systems Inc.",
        }
      ]
    }
  },
  methods:{
    handleSubmit(evt){
      evt.preventDefault();
      const payload = {
        "ticker": this.newStock.ticker,
        "name": this.newStock.name,
        "quantity": this.quantity
      }
      // console.log(payload)
      this.name = this.newStock = this.quantity = ""
      StocksService.postHolding(payload)
      .then(holding => eventBus.$emit('holding-added', holding)
    )}
  }
}
</script>

<style lang="css" scoped>
form {
  border: 1px solid lightblue;
  border-radius: 5px;
  padding: 10px;
  max-width: 850px;
}
</style>
