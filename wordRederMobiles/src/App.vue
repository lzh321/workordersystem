<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Tabbar v-if="$route.meta.showTab"></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/TabBar'
export default {
  name: 'App',
  data() {
    return {
      
    }
  },
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
  background: #FFFFFF;
}

</style>
