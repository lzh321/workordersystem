<template>
  <div>
    <div class="fault">
      <label for>
        <span>上门时间</span>：
      </label>
      <span>{{orderInfo.appoinmentTime}}</span>
    </div>
    <div class="fault">
      <label for>
        <span>工程师</span>：
      </label>
      <span>{{orderInfo.userName}}</span>
    </div>
    <div class="fault">
      <label for>
        <span>联系电话</span>：
      </label>
      <span>{{orderInfo.userPhone}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'appointment',
  props:["orderInfo"]
};
</script>

<style scoped>
.fault{
  display: flex;
  align-items: center;
}
.fault span{
  color: #666666;
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
</style>