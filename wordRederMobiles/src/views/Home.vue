<template>
  <div class="home">
    <NavBar :titleNaem="title"></NavBar>
    <!-- <wordOrder></wordOrder> -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import wordOrder from '@/components/wordOrderPage/wordOrder'
  export default {
    data() {
      return {
        title: "工单管理"
      }
    },
    components:{
      NavBar,
      wordOrder
    }
  }
</script>

<style scoped>
.home{
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>