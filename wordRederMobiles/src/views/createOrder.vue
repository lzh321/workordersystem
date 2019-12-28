<template>
  <div class="createOrder">
    <router-link to="/create" tag="span" class="layui-btn">创建</router-link>
     <!-- <create></create> -->
  </div>
</template>

<script>
import create from '@/components/createorderPage/create'
export default {
  name: 'createOrder',
  data() {
    return {
      
    }
  },
  components:{
    create
  },
  created(){
    
  },

}
</script>

<style scoped>
.createOrder{
  background: #FFFFFF;
}
</style>