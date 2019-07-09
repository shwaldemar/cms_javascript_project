<template>

<GChart
v-if="chartData"
type="BarChart"
:data="chartData"
:options="chartOptions"
/>

</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  name: "value-chart",
  data() {
    return {
      chartOptions: {
        width: 800,
        height: 240,
        title: "Stock Values"
      }
    }
  },
  props: ['valueData'],
  components: {
    GChart
  },
  computed: {
    chartData: function() {
      if(this.valueData) {
        const chartData = this.valueData.map(value => Object.values(value))
        chartData.splice(0, 0, 'Filler');
        chartData[0] = Object.keys(this.valueData[0])
        return chartData
      }
      return null
    }
  }
}
</script>

<style lang="css" scoped>
</style>
