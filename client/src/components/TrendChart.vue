<template>

<GChart
v-if="chartData"
type="LineChart"
:data="chartData"
:options="chartOptions"
/>

</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  name: "trend-chart",
  data() {
    return {
      chartOptions: {
        width: 800,
        height: 240,
        title: "Stock Price History"
      }
    }
  },
  props: ['stockData'],
  components: {
    GChart
  },
  computed: {
    chartData: function() {
      if(this.stockData) {
        const chartData = this.stockData.map(stock => Object.values(stock))
        chartData.splice(0, 0, Object.keys(this.stockData[0]));
        return chartData
      }
      return null
    }
  }
}
</script>

<style lang="css" scoped>
</style>
