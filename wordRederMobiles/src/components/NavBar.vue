<template>
  <div class="navBar">
      <div v-if="type == 'synergyManagement' || type == 'wordOrder'" class="SearchEntrance">
        <i></i>
        <span>搜索</span>
      </div>
      <div v-else class="goBack">
        <i></i>
        <span>返回</span>
      </div>
      <div class="title">{{titleNaem}}</div>
      <div v-if="type == 'synergyManagement' || type == 'wordOrder'" class="filtrate">
        <i></i>
        <span>筛选</span>
      </div>
      <div v-else class="placeholder"></div>
    </div>
</template>

<script>

export default {
  props:["titleNaem"],
  data() {
    return {
      type: ''
    }
  },
  mounted(){
    this.type = this.$route.query.type
  },
  created(){
    
  },
  watch: {
    $route: {
      handler: function(){
        this.type = this.$route.query.type
      },
      // 深度观察监听
      deep: true
    }
  },
}
</script>

<style scoped>

.navBar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background:  #2F6CFF;
  color: #ffffff;
}
.SearchEntrance {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}
.SearchEntrance::before{
  content: '';
  display: inline-block;
  width: 15px;
  height: 15px;
  background: url('../assets/Images/search.png') no-repeat;
  background-size: 100%;
}
.filtrate {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 10px;
}
.title{
  font-size: 16px;
}
.filtrate::before{
  content: '';
  display: inline-block;
  width: 16px;
  height: 17px;
  background: url('../assets/Images/screening.png') no-repeat;
  background-size: 100%;
}
.goBack{
  display: flex;
  align-items: center;
  justify-content: center
}
.goBack i{
  width: 8px;
  height: 15px;
  background: url('../assets/Images/return.png') no-repeat;
  background-size: 100%
}
.placeholder{
  width: 20px;
}
</style>