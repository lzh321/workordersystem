<template>
  <div id="app">
    <router-view/>
    <Tabbar v-if="$route.meta.showTab"></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/TabBar'
export default {
  name: 'App',
  components:{
    Tabbar,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
