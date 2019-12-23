<template>
  <div class="dispose">
    <form action>
      <div class="info">
        <h2>故障处理记录</h2>
      </div>
      <div class="fault">
        <label for>
          <span>故障类型</span>：
        </label>
        <input type="text" />
        <span>可选</span>
      </div>
      <div class="fault">
        <label for>
          <span>故障模块</span>：
        </label>
        <input type="text" />
        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>问题记录</span>：
        </label>
        <textarea name id cols="30" rows="10"></textarea>
      </div>
      <div>
        <label for>
          <span>解决办法</span>：
        </label>
        <textarea name id cols="30" rows="10"></textarea>
      </div>
      <synergy></synergy>
      <div>
        <label for>
          <span>备注</span>：
        </label>
        <textarea name id cols="30" rows="10"></textarea>
      </div>
    </form>
     <orderLog></orderLog>
    <div class="actionBtn">
      <ul>
        <li>
          <img src="../../../assets/Images/operation_complete.png" alt />
          <span>完成</span>
        </li>
        <li>
          <img src="../../../assets/Images/operation_order.png" alt />
          <span>预约</span>
        </li>
        <router-link tag="li" to="/wordOrder?type=wordOrder">
          <img src="../../../assets/Images/operation_synergy.png" alt />
          <span>协同</span>
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
import synergy from './synergy'
export default {
  name: "dispose",
  data() {
    return {
      
    }
  },
  components:{
    orderLog,
    synergy
  }
};
</script>

<style scoped>
form{
  padding: 0 15px;
}
.fault{
  display: flex;
  align-items: center;
}
form div{
  padding: 10px 0;
  border-bottom: 1px solid #F0F0F0; 
}
form div > span {
  display: flex;
  align-items: center;
  margin-left: 8px;
  font-size: 13px;
}
form div>span::after{
  content: '';
  display: inline-block;
  width: 7px;
  height: 13px;
  background: url('../../../assets/Images/choose.png') no-repeat;
  background-size: 100%;
  margin-left: 5px;
}

label {
  font-size: 14px;
  display: flex;
  align-items: center;
}
label::before{
  content: '*';
  color: red;
  display: inline-block;
  margin-right: 3px;
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
.actionBtn ul li:nth-child(1) {
  color:  #3FD188;
  font-size:14px; 
}
.actionBtn ul li:nth-child(2) {
  color: #F8A32C;
  font-size:14px; 
}
.actionBtn ul li:nth-child(3) {
  color: #7CA6F7;
  font-size:14px; 
}
.actionBtn ul li:nth-child(4) {
  color: #999999;
  font-size:14px; 
}
</style>