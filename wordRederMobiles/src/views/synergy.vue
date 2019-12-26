<template>
  <div class="synergy">
    <!-- <synergyManagement></synergyManagement> -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
// import synergyManagement from '@/components/synergyPage/synergyManagement'
export default {
  name: "synergy",
  data() {
    return {
      title: "协同管理",
    }
  },
  components:{
    NavBar,
    // synergyManagement
  }
}
</script>

<style scoped>
.synergy{
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
</style>