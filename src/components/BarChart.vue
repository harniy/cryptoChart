<template>
  <div class="chart__container">
    <BarChart
      :chart-data="data"
      :oprions="options"
      :css-classes="chart-container"
    />

    {{currentCoinPrice}}
  </div>
</template>


<script lang="ts">
import { computed, defineComponent, ref, shallowRef, watch } from "@vue/runtime-core";
import { BarChart } from "vue-chart-3";

import {Chart, BarController, CategoryScale, LinearScale, BarElement} from 'chart.js'

Chart.register(BarController, CategoryScale, LinearScale, BarElement)

export default defineComponent({
  components: {
    BarChart,
  },
  props:[
      "currentCoinPrice"
  ],
  setup(props) {
    let dataValues = shallowRef<any>([1,1,1]);


    watch(props, (first, second) => {
        setTimeout(() => {
            dataValues.value = first.currentCoinPrice
            console.log(first.currentCoinPrice)
        }, 2000)
        console.log(first.currentCoinPrice)
    } )

    const data = computed(() => ({
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "foo",
          data: dataValues.value,
          backgroundColor: "tomato",
        },
      ]
    }));

    const options = ref<any>({
      plugins: {
        title: {
          text: "Bar",
        },
      },
    });

    

    return { data, options };
  },
});
</script>



<style>
</style>