<template>
  <div class="home">
    <h1 class="app__title">Welcome to CRYPTOCURRENCY</h1>
    
      <Info />

    <div class="daily__container">
      <h3>Daily crypto data</h3>
      <div class="daily__container-coins">
        <div class="daily__coin">
          <div class="daily__coin-name crypto-width">Crypto</div>
          <div class="daily__coin-image crypto-width">
            Logo
          </div>
          <div class="daily__coin-current crypto-width">Current</div>
          <div class="daily__coin-low crypto-width">Low
            <span class="material-icons icon-low"> arrow_right_alt </span>
          </div>
          <div class="daily__coin-high crypto-width">High
            <span class="material-icons icon-high"> arrow_right_alt </span>
          </div>
        </div>

          <Coins />
      </div>
    </div>
  </div>
</template>

<script>
import Coins from '../components/Coins.vue'
import Info from '../components/Info.vue'
// @ is an alias to /src


export default {
  name: "Home",
  components: {
    Coins,
    Info
  },
  
};
</script>


<style>

.app__title {
  margin: 0;
  color: #f9f1cb;
  font-family: "Poppins", sans-serif;
}
.home {
  height: 100%;
  padding: 50px;
}
.daily__container {
    color: #f7f7f7d9;
    max-width: 1000px;
    margin: 0 auto;
}
.daily__container-coins {
  width: 100%;
  border: 1px solid;
}

.daily__coin {
  display: flex;
  align-items: center;
  height: 50px;
}

.crypto-width {
  width: 20%;
  border: 1px solid;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.daily__coin-icon {
  height: 55%;
}
</style>