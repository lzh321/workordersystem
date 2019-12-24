<template>
  <div class="sendOrder">
    <form action id="sendOrderData">
      <router-link to="/userList" tag="div">
        <label for>
          <span>指派给</span>：
        </label>
        <input type="hidden" name="acceptUserId" :value="userList.userId" />
        <input type="text" :value="userList.userName" />
        <span>可选</span>
      </router-link>
      <div class="remakeInfo">
        <label for>
          <span>备注</span>：
        </label>
        <textarea name="remark" id cols="30" rows="10"></textarea>
      </div>
    </form>
    <orderLog></orderLog>
    <div class="actionBtn">
      <ul>
        <li @click="sendOrder">
          <img src="../../../assets/Images/operation_send-orders.png" alt />
          <span>派单</span>
        </li>
        <li @click="reject">
          <img src="../../../assets/Images/operation_rejected.png" alt />
          <span>驳回</span>
        </li>
        <li @click="kuantan">
          <img src="../../../assets/Images/operation_kuantan.png" alt />
          <span>关单</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import orderLog from "./orderLog";
export default {
  name: "sendOrder",
  props: ["orderStatus"],
  data() {
    return {
      userList: {},
      orderInfoId: sessionStorage.getItem("orderInfoId")
    };
  },
  components: {
    orderLog
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
      var createData = this.$("#sendOrderData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.orderInfoId = this.orderInfoId;
      createData.handleState = handleState;
      console.log(createData);
      this.axios.post("/api/handleOrderInfo", createData).then(res => {
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
    sendOrder() {
      this.resData(1);
    },
    reject() {
      this.$router.push('/kuantanState?handleState=9')
    },
    kuantan() {
      // this.resData(8);
      this.$router.push('/kuantanState?handleState=8')
    }
  },
  created() {},
  activated() {
    this.send();
  }
};
</script>

<style scoped>
form {
  padding: 0 15px;
}
form div {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}
form div > span {
  display: flex;
  align-items: center;
  margin-left: 5px;
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
}
textarea {
  width: 100%;
  margin-top: 10px;
  background: #ffffff;
}
.info {
  justify-content: space-between;
}
.info h2::before {
  content: "|";
  font-size: 14px;
  color: #333333;
  margin-right: 2px;
}
h2 {
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.remakeInfo {
  align-items: baseline;
  flex-direction: column;
}
.remakeInfo label::before{
  content: ''
}
</style>