<template>
<!-- 故障处理记录详情 -->
  <div class="dispose">
    <form action>
      <div class="info">
        <h2>故障处理记录</h2>
      </div>
      <appointment :orderInfo="orderInfo"></appointment>
      <div class="fault">
        <label for>
          <span>故障类型</span>：
        </label>
        <span>{{orderInfo.recordType == 0 ? '硬件' : orderInfo.recordType == 1 ? '软件' : orderInfo.recordType == 2 ? '辅助' : orderInfo.recordType == 3 ? '其他' : ''}}</span>
      </div>
      <div class="fault">
        <label for>
          <span>故障模块</span>：
        </label>
        <span>{{orderInfo.recordModel == 0 ? '显示屏' : orderInfo.recordModel == 1 ? '密码键盘' : ''}}</span>
      </div>
      <div>
        <label for>
          <span>问题记录</span>：
        </label>
        <textarea name id cols="30" rows="10" :value="orderInfo.recordContent" disabled></textarea>
      </div>
      <div>
        <label for>
          <span>解决办法</span>：
        </label>
        <textarea name id cols="30" rows="10" :value="orderInfo.recordSettle" disabled></textarea>
      </div>
      <synergyInfo></synergyInfo>
    </form>
  </div>
</template>

<script>
import synergyInfo from './synergyInfo'
import appointment from './appointment'
export default {
  name: "dispose",
  props:["orderInfo"],
  data() {
    return {
      
    }
  },
  components:{
    synergyInfo,
    appointment
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
  /* border-bottom: 1px solid #F0F0F0;  */
}
form div > span {
  display: flex;
  align-items: center;
  margin-left: 8px;
  font-size: 13px;
  color: #999999;
}

label {
  font-size: 14px;
  display: flex;
  align-items: center;
}
/* label::before{
  content: '*';
  color: red;
  display: inline-block;
  margin-right: 3px;
} */

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
  color: #666666;
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