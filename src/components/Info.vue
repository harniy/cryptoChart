<template>
  <div class="app__info">
    <div class="info__block-gradient">
      <div class="info__block-info">
        Experience the best cryptocurrency (and bitcoin) market data API
        available today.
        <button class="info__block-button" @click="activeInput = !activeInput">
          Coin detail
        </button>
      </div>
    </div>

    <div class="info__input-container">
      <div
        class="info__input-block"
        :class="{ 'info__input-active': activeInput }"
      >
        <input
          type="text"
          placeholder="coin..."
          class="info__input-input"
          v-model="cryptoCoin"
        />

        <button
          class="info__input-button"
          style="opacity: 0.3; background: none; border: 1px solid #00de8d"
          v-if="!cryptoCoin.length"
        >
          ok
        </button>

        <button class="info__input-button" @click="getCoinDetail" v-else>
          ok
        </button>
      </div>

      <div class="info__livesearch" v-if="cryptoCoin.length">
        <ul class="info__livesearch-list">
          <li
            class="info__livesearch-item"
            v-for="coin in searchHelper"
            :key="coin.name"
            @click="() => addCoinDataToSearch(coin.name)"
          >
            {{ coin.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "info",
  setup() {
    let activeInput = ref<boolean>(false);
    let cryptoCoin = ref<string>("");
    let searchHelper = ref<any>([]);

    const store = useStore();
    const router = useRouter();

    const getCoinDetail = () => {
      router.push({ path: 'details', query: { coin: cryptoCoin.value }  });
    };

    const getCoinList = (crypto: string) => {
      searchHelper.value = store.getters.getCoinsName.filter((el) =>
        el.name.includes(crypto)
      );
    };

    const addCoinDataToSearch = (name: string) => {
      cryptoCoin.value = name;
    };

    watch(
      () => activeInput.value,
      (first, second) => {
        if (!first) {
          cryptoCoin.value = "";
        }
      }
    );

    watch(
      () => cryptoCoin.value,
      (first, second) => {
        getCoinList(first);
      }
    );

    return {
      activeInput,
      cryptoCoin,
      searchHelper,
      getCoinDetail,
      addCoinDataToSearch,
    };
  },
});
</script>


<style>
.app__info {
  padding: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info__block-gradient {
  width: 500px;
  margin: 0 auto;
  color: aliceblue;
  position: relative;
  z-index: 2;
}
.info__block-gradient::before {
  content: "";
  display: block;
  background: linear-gradient(
    106.39deg,
    rgba(170, 0, 255, 0.7) 0%,
    rgba(0, 140, 255, 0.7) 51.56%,
    rgba(0, 222, 141, 0.7) 100%
  );
  position: absolute;
  top: 0;
  bottom: 0;
  cursor: 0;
  left: 0;
  right: 0;
  z-index: -1;
  transform: translate(-4px, -3px);
  filter: blur(8px);
}

.info__block-gradient::after {
  content: "";
  display: block;
  background: linear-gradient(
    106.39deg,
    rgba(170, 0, 255, 0.7) 0%,
    rgba(0, 140, 255, 0.7) 51.56%,
    rgba(0, 222, 141, 0.7) 100%
  );
  position: absolute;
  top: 0;
  bottom: 0;
  cursor: 0;
  left: 0;
  right: 0;
  z-index: -1;
  transform: translate(4px, 5px);
  filter: blur(8px);
}

.info__block-info {
  height: 100%;
  padding: 50px;
  background: rgb(0, 0, 0);
  font-size: 1.4rem;
  color: #ffffff;
  line-height: 1.4;
  font-family: "Poppins";
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info__block-button {
  margin: o auto;
  margin-top: 40px;
  border: none;
  background-image: linear-gradient(
    90deg,
    #aa00ff 0%,
    #008cff 50%,
    #00de8d 100%
  );
  padding: 10px 15px;
  color: #fff;
  font-weight: 700;
  font-family: "Poppins";
  letter-spacing: 1px;
  font-size: 1.1rem;
  border-radius: 2px;
  cursor: pointer;
}

.info__input-block {
  position: absolute;
  bottom: 85px;
  transition: 0.5s;
  height: 35px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  opacity: 0;
}

.info__input-input {
  height: 90%;
  width: 70%;
  padding: 0 10px;
  font-size: larger;
  color: #45515c;
  outline: none;
}

.info__input-button {
  background-image: linear-gradient(
    90deg,
    #647eb7 0%,
    #41a5f7 50%,
    #57e7b2 100%
  );
  border: none;
  color: #fff;
  height: 100%;
  width: 20%;
  font-size: 1.3rem;
  cursor: pointer;
}
.info__input-active {
  bottom: 25px;
  opacity: 1;
}

.info__input-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.info__livesearch {
  position: absolute;
  top: 95%;
  background: rgba(240, 248, 255, 0.836);
  width: 300px;
  text-align: left;
  max-height: 300px;
  overflow: auto;
}

.info__livesearch-list {
  list-style: none;
  padding: 0;
}
.info__livesearch-item {
  padding: 5px 15px;
}
.info__livesearch-item:hover {
  background: #00de8d;
  cursor: pointer;
  transition: 0.4s;
}
</style>