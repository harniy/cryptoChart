<template>
  <div class="daily__coin" v-for="coin in coinsData" :key="coin.symbol">
    <div class="daily__coin-name crypto-width">{{ coin.symbol }}</div>
    <div class="daily__coin-image crypto-width">
      <img :src="coin.image" alt="" class="daily__coin-icon" />
    </div>
    <div class="daily__coin-current crypto-width">{{ coin.current_price }}</div>
    <div class="daily__coin-low crypto-width">
      {{ coin.low_24h }}
    </div>
    <div class="daily__coin-high crypto-width">
      {{ coin.high_24h }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { onMounted, ref } from "@vue/runtime-core";
import { useStore } from 'vuex'

export default defineComponent({
  name: "Coins",
  setup() {
    let coinsData = ref([]);

    const store = useStore()

    onMounted(() => {
      fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
      )
        .then((response) => response.json())
        .then((data) => {
          coinsData.value = data

          const cryptoName = data.map((el:any, idx:any) => {
            return {id: idx, name: el.id}
          })
          
          store.dispatch('addCoins', cryptoName)

        })
        .catch((err) => {
          console.error(err);
        });
    });

    

    return { coinsData };
  },
});
</script>



<style>
.icon-low {
  color: #fd5757;
  transform: rotate(90deg);
}
.icon-high {
  color: #54bf58;
  transform: rotate(-90deg);
}
</style>