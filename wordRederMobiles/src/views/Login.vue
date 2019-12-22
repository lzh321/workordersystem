<template>
  <div class="Login">
    <h1 class="logo">logo</h1>
    <p class="welcome">欢迎来到工单管理系统</p>
    <span class="hint">赶紧登录办公吧！</span>
    <div class="loginID">
      <label for>账号</label>
      <input type="text" placeholder="请输入登录账号" />
    </div>
    <div class="loginPassword">
      <label for>密码</label>
      <input type="text" placeholder="请输入登录密码" />
    </div>
    <div class="loginBtn">
      <van-button type="info" size="large">登录</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Button } from 'vant';

Vue.use(Button);
export default {};
</script>

<style scoped>
.Login {
  padding: 77px 28px 0;
  overflow: hidden;
}
.logo {
  background: url("../assets/Images/logo.png") no-repeat;
  background-size: 100%;
  width: 135px;
  height: 23px;
  text-indent: 9999px;
}
.welcome {
  font-size: 20px;
  color: #2f6cff;
  font-weight: 500;
  margin: 20px 0 10px;
}
.hint{
  font-size: 13px;
  color: #999999;
}
.loginID{
  display: flex;
  flex-direction: column;
}
.loginPassword{
display: flex;
  flex-direction: column;
}
label{
  font-size: 15px;
  color: #333333;
  margin-top: 35px;
}
input{
  height: 40px;
  border: none;
  font-size: 16px;
  border-bottom: 1px solid #F7F7F7;
}
input::placeholder{
  color: #DDDDDD;
  font-size: 13px;
}
.loginBtn{
  margin-top: 77px;
}
</style>