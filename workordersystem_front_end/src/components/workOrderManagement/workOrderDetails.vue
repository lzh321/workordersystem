<template>
  <div class="workOrderDetails">
    <progressBar></progressBar>
    <workOrderCommon></workOrderCommon>
    <workOrderLog></workOrderLog>
  </div>
</template>
<script>
import workOrderCommon from './workOrderCommon/workOrderCommon'
import workOrderLog from './workOrderDetails/workOrderLog'
import progressBar from '../progressBar'
export default {
  name: "workOrderDetails",
  data() {
    return {
    }
  },
  components:{
    workOrderCommon,
    progressBar,
    workOrderLog
  },
  beforeDestroy(){
    // console.log('组件销毁')
    // localStorage.removeItem("orderState")
    // localStorage.removeItem("orderInfoId")
  }
}
</script>

<style scoped>
.workOrderDetails{
  padding: 15px 15px 0;
}
</style>