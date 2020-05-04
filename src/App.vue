<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>

@font-face {
  font-family: bamin;
  src: url('../src/assets/font/BMHANNAPro.ttf')format('truetype');
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif, bamin;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height : 100%;
  width : 100%;
  top:0;
  left: 0;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
