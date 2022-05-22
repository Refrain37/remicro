<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">Login</router-link> |
    <router-link to="/charts">Chart</router-link>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import * as echarts from 'echarts';

export default defineComponent({
  setup() {
    provide('echarts', echarts); // 将echarts注入到全局
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.container {
  background: #42b983;
}
</style>
