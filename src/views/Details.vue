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
      <BarChart :coinTickers="coinTickers" />
    </div>
    <div class="detail__info">
      <h2>Info</h2>
      <div class="detail__info-block">
        <ul class="detail__info-list">
          <li class="detail__info-item">
            <div class="detail__info-left">
              <span>Name</span>
              <span>:</span>
            </div>
            <div class="detail__info-right">{{ coinInfo.name }}</div>
          </li>
          <li class="detail__info-item">
            <div class="detail__info-left">
              <span>Symbol</span>
              <span>:</span>
            </div>
            <div class="detail__info-right">{{ coinInfo.symbol }}</div>
          </li>
          <li class="detail__info-item">
            <div class="detail__info-left">
              <span>Categories</span>
              <span>:</span>
            </div>
            <div class="detail__info-right cat">
              <div v-for="category in coinInfo.categories" :key="category">
                -{{ category }}
              </div>
            </div>
          </li>
          <li class="detail__info-item">
            <div class="detail__info-left">
              <span>Icon</span>
              <span>:</span>
            </div>
            <div class="detail__info-right">
              <img :src="coinInfo?.image?.thumb" />
            </div>
          </li>
          <li class="detail__info-item">
            <div class="detail__info-left">
              <span>Current</span>
              <span>:</span>
            </div>
            <div class="detail__info-right">
              {{ coinInfo?.market_data?.current_price?.usd }} $
            </div>
          </li>
          <li class="detail__info-item">
            <div class="detail__info-left">
              <span>Low 24h</span>
              <span>:</span>
            </div>
            <div class="detail__info-right">
              {{ coinInfo?.market_data?.low_24h?.usd }} $
            </div>
          </li>
          <li class="detail__info-item">
            <div class="detail__info-left">
              <span>High 24h</span>
              <span>:</span>
            </div>
            <div class="detail__info-right">
              {{ coinInfo?.market_data?.high_24h?.usd }} $
            </div>
          </li>
        </ul>
      </div>
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
    let coinTickers = ref<any>([]);

    const route = useRoute();

    const getCoinInfo = (coinName: string) => {
      fetch(`https://api.coingecko.com/api/v3/coins/${coinName}`)
        .then((res) => res.json())
        .then((data) => {
          coinInfo.value = data;
          coinTickers.value = data.tickers;
          console.log(data);
        })
        .catch((err) => console.log(err));
    };

    onMounted(() => {
      const coinName = String(route.query.coin);

      getCoinInfo(coinName);
    });

    return { coinInfo, showDetails, coinTickers };
  },
});
</script>

<style>
.detail__page {
  min-height: 100vh;
}
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
.detail__info {
  margin-bottom: 100px;
}
.detail__info-block {
  margin: 50px auto;
  max-width: 400px;
  padding: 20px 0;
  box-shadow: 0 0 3px 0 #ffffff59;
}
.detail__info-list {
  padding: 0;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0;
}

.detail__info-item {
  display: flex;
  align-items: center;
  width: 90%;
  margin: 5px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.329);
}
.detail__info-left {
  width: 30%;
  padding: 5px 10px;
  font-family: "Poppins";
  color: #5e6f7f;
  display: flex;
  justify-content: space-between;
}
.detail__info-right {
  width: 70%;
  padding: 5px 20px;
  color: #818f9c;
  font-weight: 700;
  font-family: "Poppins";
}
.detail__info-right img {
  height: 17px;
}
.cat {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}
</style>
