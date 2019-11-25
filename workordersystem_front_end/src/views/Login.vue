<template>
  <div class="login">
    <div class="login_bg">
      <div class="login_content">
        <div class="name">
          <img src alt />
          <h2>工单管理系统</h2>
        </div>
        <div class="account_password">
          <div>
            <i class="userId_icon"></i>
            <input class="userId" type="text" placeholder="请输入账号" v-model="userId" />
          </div>
          <div>
            <i class="pwd_icon"></i>
            <input class="password" type="password" placeholder="请输入登录密码" v-model="password" />
          </div>
        </div>
        <div class="btn">
          <button class="btn_login" @click="login">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import popupModal from "@/components/popupModal";
export default {
  name: "Login",
  data() {
    return {
      userId: "",
      password: "",
      show: false,
      title: "账号密码错误",
      content: ""
    };
  },
  components: {
    popupModal
  },
  methods: {
    login: function() {
      if (this.userId == "") {
        layui.use('layer', function(){
          var layer = layui.layer;
          layer.open({
            title: '登录失败'
            ,content: '账号不能为空，请重新输入'
          });
        });
      } else if (this.password == "") {
        layui.use('layer', function(){
          var layer = layui.layer;
          layer.open({
            title: '登录失败'
            ,content: '密码不能为空，请重新输入'
          });
        });
      }else{
        // let data = {
        //     "userId": "admin",
        //     "userPassword": "123456"
        //   };
        // this.Axios.post('http://192.168.110.158:8089/api/gd/gd_api/getUserCheckInfo',data).then((response) => {
        //     console.log("post:"+response.data);
        // })
        sessionStorage.setItem('isLogin', this.userId)
        this.$router.push('/Home')
      }
      console.log(this.userId, this.password);
    }
  }
};
</script>

<style  scoped>
.login {
  height: 100%;
  padding: 245px 0 0;
}
.login_bg {
  background: blue;
  height: 250px;
}
.login_content {
  background: #fff;
  width: 350px;
  position: absolute;
  left: 40%;
  top: -35%;
  height: 420px;
  box-shadow: 4px 5px 10px -6px #000;
}
.login_content::before {
  content: "";
  display: block;
  width: 100%;
  height: 10px;
  background: blue;
}
.login_content .name {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0 20px;
}
.login_content .name img {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 1px solid red;
  margin-bottom: 20px;
}
.login_content .name h2 {
  font-weight: 600;
  color: #0079fe;
}
.login_content .account_password {
  padding: 0 15px;
}
.login_content .account_password input {
  width: 100%;
  height: 45px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding-left: 36px;
}
.login_content .account_password i {
  display: inline-block;
  width: 15px;
  height: 20px;
  border: 1px solid red;
  position: absolute;
  top: 12px;
  left: 15px;
}
.login_content .account_password input:hover {
  border: 1px solid #0079fe;
  box-shadow: 0px 0px 5px -2px #0079fe inset;
}
input:focus::-webkit-input-placeholder {
  color: transparent;
}
.userId {
}
.password {
}
.btn {
  padding: 40px 15px;
}
.btn_login {
  width: 100%;
  height: 50px;
  border: none;
  background: #0079fe;
  border-radius: 5px;
  color: #fff;
  font-size: 20px;
}
</style>