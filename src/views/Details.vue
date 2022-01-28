<template>
  <div class="detail__page">
    <div class="detail__page-title">
      <h1
        class="coin__id"
        title="show details"
        @click="showDetails = !showDetails"
      >
        {{ coinInfo.id }}
      </h1>

      <div
        class="detail__page-description"
        :class="{ 'show__details-active': showDetails }"
      >
        <p v-html="coinInfo?.description?.en"></p>
      </div>
    </div>

    <div class="detail__contaiter">
      <BarChart :currentCoinPrice="currentCoinPrice" />
    </div>
  </div>
</template>



<script lang="ts">
import BarChart from "../components/BarChart.vue";
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";


export default defineComponent({
  name: "Details",
  components: {
    BarChart,
  },
  setup() {
    let coinInfo = ref<any>({});
    let showDetails = ref<boolean>(false);
    let currentCoinPrice = ref<any>([])

    const route = useRoute();

    const getCoinInfo = (coinName: string) => {
      fetch(`https://api.coingecko.com/api/v3/coins/${coinName}`)
        .then((res) => res.json())
        .then((data) => {
          coinInfo.value = data;
          currentCoinPrice.value.push(data.market_data.current_price.usd)
        })
        .catch((err) => console.log(err));
    };

    onMounted(() => {
      const coinName = String(route.query.coin);

      getCoinInfo(coinName);

      setInterval(() => {
          getCoinInfo(coinName);
      }, 5000)
    });

    return { coinInfo, showDetails, currentCoinPrice };
  },
});
</script>



<style>
.coin__id:hover {
  text-decoration: underline;
  cursor: pointer;
}
.detail__page-title {
  padding: 40px;
  color: aliceblue;
  text-transform: uppercase;
}
.detail__page-description {
  max-width: 1100px;
  margin: 0 auto;
  text-align: left;
  background: #00000061;
  padding: 25px;
}
.detail__page-description {
  max-width: 1100px;
  margin: 0 auto;
  text-align: left;
  background: #00000061;
  padding: 25px;
  margin-top: -555px;
  transition: 0.7s;
  opacity: 0;
}
.detail__contaiter {
  margin: 50px;
}
.show__details-active {
  margin-top: 0;
  opacity: 1;
}
</style>