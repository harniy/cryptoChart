<template>
 <nav>
   <router-link to="/">Crypto</router-link>
 </nav>
  <router-view />

  <footer>Cryptocurrency(c)</footer>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400&display=swap");

html {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(
    151deg,
    rgb(35 17 42) 0%,
    rgb(4 4 30) 56%,
    rgb(10 39 60) 100%
  );
}

nav {
    padding: 20px 30px;
    display: flex;
    justify-content: flex-start;
}

nav a {
    font-weight: bold;
    color: #cccccc;
    text-decoration: none;
    font-size: 1.3rem;
    cursor: pointer;
    z-index: 1000;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

footer {
    padding: 25px;
    background: #0f111b;
    color: #f0f8ff63;
}
</style>
