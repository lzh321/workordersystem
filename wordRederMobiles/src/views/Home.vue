<template>
  <div class="home">
    
    <!-- <wordOrder></wordOrder> -->
    <router-view></router-view>

  </div>
</template>

<script>
// import NavBar from '@/components/NavBar'
import wordOrder from '@/components/wordOrderPage/wordOrder'
import Tabbar from '@/components/TabBar'
  export default {
    data() {
      return {
        title: "工单管理",
      }
    },
    components:{
      wordOrder,
      // NavBar
    },
  }
</script>

<style scoped>
.home{
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
  flex: 1;
}

</style>