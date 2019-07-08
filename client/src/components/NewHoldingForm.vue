<template lang="html">
  <form v-on:submit="handleSubmit">

    <label for="stock_select">Select Stock:</label>
    <select name="stock_select" v-model="newStock" required>
      <option disabled value="">Select a stock</option>
      <option v-for="newStock in newStockOptions" :value="newStock">{{newStock.name}} ({{newStock.ticker}})</option>

    </select>

    <label for="quantity">Quantity:</label>
    <input type="number" name="quantity"
    v-model.number="quantity" required min="1">

    <input type="submit" name="submit" value="Save">

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
          "ticker": "HPQ",
          "name": "HP Inc."
        },
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
</style>
