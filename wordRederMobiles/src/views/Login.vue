<template>
  <div class="Login">
    <h1 class="logo">logo</h1>
    <p class="welcome">欢迎来到工单管理系统</p>
    <span class="hint">赶紧登录办公吧！</span>
    <div class="loginID">
      <label for>账号</label>
      <input type="text" v-model="userId" placeholder="请输入登录账号" />
    </div>
    <div class="loginPassword">
      <label for>密码</label>
      <input type="password" v-model="userPassWord" placeholder="请输入登录密码" />
    </div>
    <div class="loginBtn">
      <van-button type="info" @click="login" size="large">登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      userId: "",
      userPassWord: ""
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    login() {
      if (this.userId == "") {
        this.$dialog.alert({
          title: "登录失败",
          message: "账号不能为空"
        });
      } else if (this.userPassWord == "") {
        this.$dialog.alert({
          title: "登录失败",
          message: "密码不能为空"
        });
      } else {
        let data = {
          userId: this.userId,
          userPassword: this.userPassWord
        };
        this.axios.post("/api/getUserCheckInfo", data).then(res => {
          console.log(res);
          // 将用户token保存到vuex中
          if (res.data.retCode == "000000") {
            this.userId = res.data.body.userId;
            // 将用户token保存到vuex中
            this.changeLogin({ userId: this.userId });
            this.$router.push("/wordOrder?type=wordOrder");
          } else {
            this.$dialog.alert({
              title: "登录失败",
              message: res.data.retMsg
            });
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.Login {
  padding: 77px 28px 0;
  overflow: hidden;
  flex: 1;
  background: #FFFFFF;
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
.hint {
  font-size: 15px;
  color: #999999;
}
.loginID {
  display: flex;
  flex-direction: column;
}
.loginPassword {
  display: flex;
  flex-direction: column;
}
label {
  font-size: 16px;
  color: #333333;
  margin-top: 35px;
}
input {
  height: 40px;
  border: none;
  font-size: 16px;
  border-bottom: 1px solid #f7f7f7;
  padding: 8px 0 0 5px;
  color: #333333;
  margin-top:5px; 
  }
input::placeholder {
  color: #dddddd;
  font-size: 16px;
}
.loginBtn {
  margin-top: 77px;
  
}
.loginBtn span{
  font-size: 17px;
}
</style>