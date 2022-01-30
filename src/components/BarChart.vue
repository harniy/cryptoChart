<template>
  <div class="chart__container">
    <LineChart
      :chart-data="data"
      :oprions="options"
    />

  </div>
</template>


<script lang="ts">

import { computed, defineComponent,  watch,  ref } from "@vue/runtime-core";
import { LineChart } from "vue-chart-3";

import {Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default defineComponent({
  components: {
    LineChart,
  },
  props:[
      "coinTickers"
  ],
  setup(props) {
    let dataValues = ref<any>([])
    let renderKey = ref<number>(0)
    
    const data = computed(() => ({
      labels: [...Array(dataValues.value.length).keys()],
      datasets: [
        {
          label: "Day Values",
          data: dataValues.value,
          backgroundColor: "tomato",
          borderColor: "#ff5722"
        },
      ]
    }));

    const options = ref({
      plugins: {
        title: {
          text: "Bar",
        },
      },
    });


    watch(props, (f, s) => {
      const coinForDollars = f.coinTickers.filter(el => el.target === 'USD')

      dataValues.value = coinForDollars.map(el => el.last)
    } )

    return { data, options, renderKey };
  },
});

 </script>


<style>
</style>