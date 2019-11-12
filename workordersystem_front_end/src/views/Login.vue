<template>
  <div class="login">
    <div class="login_bg">
      <div class="login_content">
        <div class="name">
          <img src="" alt="">
          <h2>工单管理系统</h2>
        </div>
        <div class="account_password">
          <input class="userId" type="text" placeholder="请输入账号">
          <input class="password" type="password">
        </div>
        <div class="btn">
          <button class="btn_login">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style  scoped>
  .login{
    height: 100%;
    padding: 245px 0 0;
  }
  .login_bg{
    background: blue;
    height: 250px;
  }
  .login_content{
    background: #fff;
    width: 350px;
    position: absolute;
    left: 40%;
    top: -35%;
    height: 420px;
    box-shadow: 4px 5px 10px -6px #000;
  }
  .login_content::before{
    content: '';
    display: block;
    width: 100%;
    height: 10px;
    background: blue;
  }
  .login_content .name{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0 20px;
  }
  .login_content .name img{
    display: inline-block;
    width: 50px;
    height: 50px;
    border:1px solid red;
    margin-bottom: 20px;
  }
  .login_content .name h2{
    font-weight: 600;
    color: #0079fe;
  }
  .login_content .account_password{
    padding: 0 15px;
  }
  .login_content .account_password input{
    width: 100%;
        height: 45px;
    margin-bottom: 20px;
  }
  .userId{

  }
  .password{

  }
  .btn{
    padding: 40px 15px;
  }
  .btn_login{
    width: 100%;
    height: 50px;
    border: none;
    background: #0079fe;
    border-radius: 5px;
    color: #fff;
    font-size: 20px;
  }
</style>