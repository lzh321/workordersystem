<template>
  <div class="login">
    <div class="login_bg">
      <div class="login_content">
        <div class="name">
          <img src="../assets/images/loginImg/logo@2x.png" alt />
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
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      userId: "",
      password: "",
      orgId: "",
      show: false,
      title: "账号密码错误",
      content: ""
    };
  },
  components: {
    popupModal
  },
  methods: {
    ...mapMutations(["changeLogin"]),

    login: function() {
      if (this.userId == "") {
        layui.use("layer", function() {
          var layer = layui.layer;
          layer.open({
            title: "登录失败",
            content: "账号不能为空，请重新输入"
          });
        });
      } else if (this.password == "") {
        layui.use("layer", function() {
          var layer = layui.layer;
          layer.open({
            title: "登录失败",
            content: "密码不能为空，请重新输入"
          });
        });
      } else {
        let data = {
          userId: this.userId,
          userPassword: this.password
        };
        // this.userId = "admin"
        // this.changeLogin({ userId: this.userId });
        // this.$router.push("/Home");
        this.$axios.post("/api/getUserCheckInfo", data).then(res => {
          console.log(res);
          // 将用户token保存到vuex中
          if (res.data.retCode == "000000") {
            this.userId = res.data.body.userId;
            this.orgId = res.data.body.orgId
            // 将用户token保存到vuex中
            this.changeLogin({ userId: this.userId,orgId: this.orgId });
            this.$router.push("/workTable?type=workTable");
          } else {
            layer.open({
              title: "登录失败",
              content: res.data.retMsg
            });
          }
        });
      }
      console.log(this.userId, this.password);
    }
  },
  created() {
    sessionStorage.clear();
    let _this = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        _this.login();// 登录方法名
         return false;
      }
    };
  }
};
</script>

<style  scoped>
.login {
  height: 100%;
  background: url("../assets/images/loginImg/big_bg@2x.png") 0px -70px no-repeat;
  background-size: 100%;
  position: relative;
}
.login_bg {
  background: url("../assets/images/loginImg/blue_bg@2x.png") no-repeat;
  height: 570px;
  width: 1123px;
  margin: auto;
  position: absolute;
  right: 14%;
  background-size: 100%;
  top: 15%;
}
.login_content {
  background: url("../assets/images/loginImg/white_bg@2x.png") no-repeat;
  width: 525px;
  position: absolute;
  left: 47%;
  top: 11%;
  height: 475px;
  background-size: 100%;
}
.login_content .name {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 85px 0 40px 40px;
  width: 65%;
  margin: auto;
}
.login_content .name img {
  display: inline-block;
  /* width: 50px;
  height: 50px; */
  margin-bottom: 10px;
}
.login_content .name h2 {
  font-weight: 600;
  color: #0079fe;
}
.login_content .account_password {
  padding: 0 0px 0 40px;
  width: 65%;
    margin: auto;
}
.login_content .account_password input {
  width: 100%;
  height: 45px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
      padding-left: 45px;
    font-size: 15px;
}
.login_content .account_password .userId_icon {
  display: inline-block;
  width: 20px;
  height: 22px;
  position: absolute;
  top: 12px;
  left: 13px;
  background: url("../assets/images/loginImg/account@2x.png");
  background-size: 100%
}
.login_content .account_password .pwd_icon {
  display: inline-block;
  width: 20px;
  height: 24px;
  position: absolute;
  top: 12px;
  left: 13px;
  background: url("../assets/images/loginImg/password@2x.png");
  background-size: 100%
}
.login_content .account_password input:hover {
  border: 1px solid #0079fe;
  box-shadow: 0px 0px 5px -2px #0079fe inset;
}
input:focus::-webkit-input-placeholder {
  color: transparent;
}

.btn {
  padding: 40px 0px 0 40px;
  width: 65%;
    margin: auto;
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