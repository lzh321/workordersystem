<template>
<!-- 故障处理记录详情 -->
  <div class="dispose">
    <form action>
      <div class="info">
        <h2>故障处理记录</h2>
      </div>
      <div class="fault">
        <label for>
          <span>上门时间</span>：
        </label>
        <span>可选</span>
      </div>
      <div class="fault">
        <label for>
          <span>工程师</span>：
        </label>
        <span>可选</span>
      </div>
      <div class="fault">
        <label for>
          <span>联系电话</span>：
        </label>
        <span>可选</span>
      </div>
      <div class="fault">
        <label for>
          <span>故障类型</span>：
        </label>
        <span>可选</span>
      </div>
      <div class="fault">
        <label for>
          <span>故障模块</span>：
        </label>
        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>问题记录</span>：
        </label>
        <textarea name id cols="30" rows="10" disabled></textarea>
      </div>
      <div>
        <label for>
          <span>解决办法</span>：
        </label>
        <textarea name id cols="30" rows="10" disabled></textarea>
      </div>
      <synergy></synergy>
    </form>
  </div>
</template>

<script>
import synergy from './synergy'
export default {
  name: "dispose",
  data() {
    return {
      
    }
  },
  components:{
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
  color: #999999;
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