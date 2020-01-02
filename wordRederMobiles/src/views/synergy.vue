<template>
  <div class="synergy">
    <!-- <NavBar></NavBar> -->
    <!-- <synergyManagement></synergyManagement> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import NavBar from '@/components/NavBar'
// import synergyManagement from '@/components/synergyPage/synergyManagement'
export default {

  data() {
    return {
      title: "协同管理",
    }
  },
  components:{
    // NavBar
    // synergyManagement
  }
}
</script>

<style scoped>
.synergy{
  background: #f3f3f3;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>