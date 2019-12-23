<template>
<!-- 回访记录 -->
  <div class="returnVisit">
    <orderInfo></orderInfo>
    <form action="">
      <div class="info">
        <h2>回访记录</h2>
      </div>
      <div>
        <label for=""><span class="problem">问题是否已解决</span>：</label>
        <input type="checkbox">已解决
        <input type="checkbox">未解决
      </div>
      <div>
        <label for=""><span>满意度情况</span>：</label>
        <input type="checkbox">满意
        <input type="checkbox">基本满意
        <input type="checkbox">不满意
      </div>
      <div>
        <label for=""><span>意见/建议</span>：</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div>
        <label for=""><span>备注</span>：</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
    </form>
    <orderLog></orderLog>
     <div class="actionBtn">
      <ul>
        <router-link tag="li" to="/wordOrder?type=wordOrder">
          <img src="../../../assets/Images/operation_rejected.png" alt />
          <span>驳回</span>
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
import orderInfo from './orderInfo'
import orderLog from './orderLog'
export default {
  name: 'returnVisit',
  data() {
    return {
      
    }
  },
  components:{
    orderInfo,
    orderLog
  }
}
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
form div:nth-child(2){
display: flex;
}
form>div:nth-child(3){
  display: flex;
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
label .problem{
  width: 100px;
}
form  label span {
  width: 100px;
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
  color: #F8A32C;
  font-size:14px; 
}

.actionBtn ul li:nth-child(2) {
  color: #999999;
  font-size:14px; 
}
</style>