<template>
  <div class="sendOrder">
    <form action="">
      <div class="">
        <label for=""><span>指派给</span>：</label>
        <input type="text">
        <span>选</span>
      </div>
      <div class="remakeInfo">
        <label for=""><span>备注</span>：</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
    </form>
    <orderLog></orderLog>
    <div class="actionBtn">
      <ul>
        <li>
          <img src="../../../assets/Images/operation_send-orders.png" alt />
          <span>发单</span>
        </li>
        <router-link tag="li" to="/wordOrder?type=wordOrder">
          <img src="../../../assets/Images/operation_rejected.png" alt />
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
  name: 'sendOrder',
  props: ["orderStatus"],
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
form div{
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F0F0F0; 
}
form div > span {
  display: flex;
  align-items: center;
  margin-left: 5px;
}

label {
  font-size: 14px;
  display: flex;
  align-items: center;
}

label span {
  width: 60px;
  font-size: 14px;
  color: #666666;
  text-align-last: justify;
}
input[type="text"] {
  flex: 1;
  border: 1px solid #f3f3f3;
  height: 35px;
}
textarea {
  width: 100%;
  margin-top: 10px;
  background: #FFFFFF;
}
.info {
  justify-content: space-between;
}
.info h2::before{
  content: "|";
  font-size: 14px;
  color: #333333;
  margin-right: 2px;
}
h2{
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.remakeInfo{
  align-items: baseline;
  flex-direction: column;
}
</style>