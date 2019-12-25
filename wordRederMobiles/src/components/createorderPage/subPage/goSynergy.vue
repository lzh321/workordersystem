<template>
  <div class="goSynergy">
    <form action id="formData">
      <div>
        <label for>
          <span>紧急程度</span>：
        </label>
        <input type="radio" name="orderUrgency" value="1" />紧急
        <input type="radio" name="orderUrgency" value="0" />一般
      </div>
      <router-link to="/userList" tag="div">
        <label for>
          <span>指派给</span>：
        </label>
        <input type="hidden" name="responsibleId" :value="userList.userId" />
        <input type="text" :value="userList.userName" />
        <span>可选</span>
      </router-link>
      <div class="content">
        <label for>
          <span>协同内容</span>：
        </label>
        <textarea name="content" id cols="30" rows="10"></textarea>
      </div>
      <div class="btn">
        <a type="button" @click="confirm" class="confirm layui-btn">确定</a>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "goSynergy",
  data() {
    return {
      title: "",
      handleState: "",
      orderInfoId: "",
      userList:{}
    };
  },
  methods: {
    send() {
      var userList = sessionStorage.getItem("userList");
      if (userList) {
        //用户列表
        this.userList = JSON.parse(userList);
      }
    },
    resData(handleState) {
      var formData = this.$("#formData").serializeObject();
      formData.userId = this.$store.state.userId;
      formData.orderInfoId = this.orderInfoId;
      formData.createrId = this.$store.state.userId;
      console.log(formData);
      this.axios.post("/api/addCoordinateInfo", formData).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          layer.msg(res.data.retMsg, { icon: 1 });
          sessionStorage.clear();
          setTimeout(() => {
            this.$router.push("/wordOrder");
          }, 3000);
        } else {
          layer.msg(res.data.retMsg, { icon: 2 });
        }
      });
    },
    confirm() {
      this.resData(this.handleState);
    }
  },
  created() {
    if (this.handleState == 8) {
      this.title = "关单说明";
    }
    if (this.handleState == 9) {
      this.title = "驳回说明";
    }
    
  },
  activated() {
    this.handleState = this.$route.query.handleState;
    this.orderInfoId = sessionStorage.getItem("orderInfoId");
    if (this.handleState == 8) {
      this.title = "关单说明";
    }
    if (this.handleState == 9) {
      this.title = "驳回说明";
    }
    this.send()
  }
};
</script>

<style scoped>
form{
  padding: 15px 15px;
}
form div {
  display: flex;
  align-items: center;
  margin-bottom:5px; 
}
.content{
  align-items: baseline;
  flex-direction: column;
}
label {
  font-size: 14px;
  display: flex;
  align-items: center;
}
label::before {
  content: "*";
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
  padding-left: 5px;
}
input[type="radio"] {
  margin: 0 5px;
}
textarea {
  width: 100%;
  border: 1px solid #f3f3f3;
  margin-top: 10px;
  padding: 5px;
}
.btn {
  text-align: center;
  margin-top: 20px;
}
.confirm {
  /* border: none; */
  width: 100px;
  /* height: 40px; */
  border-radius: 50px;
  text-align: center;
  background: #2f6cff;
  color: #f3f3f3;
  margin: auto;
}
</style>