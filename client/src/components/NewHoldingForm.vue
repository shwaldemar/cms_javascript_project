<template lang="html">
  <form>
    <label for="name">Name:</label>
    <input type="text" name="name" id="name" v-model="name">

    <label for="quantity">Quantity:</label>
    <input type="number" name="" value="" v-model="quantity">

    <input type="submit" name="submit" value="Save">

  </form>
</template>

<script>
export default {
  "name": "new-holding-form",
  data: function(){
    return {
      name: "",
      quantity: "",
      newStockOptions: [
        {
          "symbol": "HPQ",
          "name": "HP Inc."
        },
        {
          "symbol": "F",
          "name": "Ford Motor Company"
        },
        {
          "symbol": "AMD",
          "name": "Advanced Micro Devices Inc."
        },
        {
          "symbol": "ORCL",
          "name": "Oracle Corporation"
        },
        {
          "symbol": "NKE",
          "name": "Nike Inc."
        },
        {
          "symbol": "PFE",
          "name": "Pfizer Inc."
        },
        {
          "symbol": "XOM",
          "name": "Exxon Mobil Corporation",
        },
        {
          "symbol": "CSCO",
          "name": "Cisco Systems Inc.",
        }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
