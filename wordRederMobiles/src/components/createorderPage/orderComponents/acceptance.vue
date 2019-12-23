<template>
  <div class="acceptance">
    <form action="">
      <div class="remakeInfo">
        <label for=""><span>备注</span>：</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
    </form>
    <orderLog></orderLog>
    <div class="actionBtn">
      <ul>
        <li>
          <img src="../../../assets/Images/operation_To-accept-the.png" alt />
          <span>发单</span>
        </li>
        <router-link tag="li" to="/wordOrder?type=wordOrder">
          <img src="../../../assets/Images/operation_To-send.png" alt />
          <span>取消</span>
        </router-link>
        <li>
          <img src="../../../assets/Images/operation_kuantan.png" alt />
          <span>关单</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import orderLog from './orderLog'
export default {
  name: 'acceptance',
  data() {
    return {
      
    }
  },
  components:{
    orderLog
  }
}
</script>

<style scoped>
form{
  padding: 0 15px;
}
.acceptance .remakeInfo{
  display: flex;
  align-items: baseline;
  flex-direction: column;
  color: #666666;
  font-size: 14px;
}
textarea{
  width: 100%;
  margin-top: 10px;
}
</style>