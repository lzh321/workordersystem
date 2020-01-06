<template>
  <!-- 回访记录 -->
  <div class="returnVisit">
    <orderInfo :orderInfo="orderInfo"></orderInfo>
    <form action id="formData">
      <div class="info">
        <h2>回访记录</h2>
      </div>
      <div>
        <label for>
          <span class="problem">问题是否已解决</span>：
        </label>
        <input type="radio" name="isFinish" value="0" />已解决
        <input type="radio" name="isFinish" value="1" />未解决
      </div>
      <div>
        <label for>
          <span>满意度情况</span>：
        </label>
        <input type="radio" name="satisfiedState" value="0" />满意
        <input type="radio" name="satisfiedState" value="1" />基本满意
        <input type="radio" name="satisfiedState" value="2" />不满意
      </div>
      <div>
        <label for>
          <span>意见/建议</span>：
        </label>
        <textarea name="adviseContent" cols="30" rows="10"></textarea>
      </div>
      <div class="remakeInfo">
        <label for>
          <span>备注</span>：
        </label>
        <textarea name="remark" cols="30" rows="10"></textarea>
      </div>
    </form>
    <orderLog></orderLog>
    <div class="perch"></div>
    <div class="actionBtn">
      <ul>
        <li>
          <button @click="rejeck" :disabled="isDisabled">
            <img src="../../../assets/Images/operation_rejected.png" alt />
            <span>驳回</span>
          </button>
        </li>
        <li>
          <button @click="kuantan" :disabled="isDisabled">
            <img src="../../../assets/Images/operation_kuantan.png" alt />
            <span>关单</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import orderInfo from "./orderInfo";
import orderLog from "./orderLog";
export default {
  name: "returnVisit",
  props: ["orderInfo"],
  data() {
    return {
      orderInfoId: sessionStorage.getItem("orderInfoId"),
      isDisabled: false
    };
  },
  methods: {
    kuantan() {
      var createData = this.$("#formData").serializeObject();
      this.orderInfo.userId = this.$store.state.userId;
      this.orderInfo.isFinish = createData.isFinish;
      this.orderInfo.adviseContent = createData.adviseContent;
      this.orderInfo.remark = createData.remark;
      this.orderInfo.satisfiedState = createData.satisfiedState;
      this.orderInfo.orderInfoId = this.orderInfoId;
      console.log(this.orderInfo);
      // this.isDisabled = true;

      var _this = this;
      layer.confirm(
        "是否确认关闭当前工单？",
        { icon: 3, title: "提示" },
        function(index) {
          //向服务端发送关单指令
          _this.axios.post("/api/closeOrderInfo", _this.orderInfo).then(res => {
            console.log(res);
            if (res.data.retCode == "000000") {
              layer.msg(res.data.retMsg, { icon: 1 });
              sessionStorage.clear();
              setTimeout(() => {
                _this.$router.push("/wordOrder?type=wordOrder");
              }, 3000);
            } else {
              setTimeout(() => {
                _this.isDisabled = false;
              }, 2000);
              layer.msg(res.data.retMsg, { icon: 2 });
            }
          });
        }
      );
    },
    rejeck() {
      this.$router.push("/kuantanState?handleState=13");
    }
  },
  components: {
    orderInfo,
    orderLog
  }
};
</script>

<style scoped>
form {
  padding: 0 15px;
}
.fault {
  display: flex;
  align-items: center;
}
form div {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 15px;
}
form div:nth-child(2) {
  display: flex;
  align-items: center;
}
form > div:nth-child(3) {
  display: flex;
  align-items: center;
}

form div > span {
  display: flex;
  align-items: center;
  margin-left: 8px;
  font-size: 16px;
}
form div > span::after {
  content: "";
  display: inline-block;
  width: 7px;
  height: 13px;
  background: url("../../../assets/Images/choose.png") no-repeat;
  background-size: 100%;
  margin-left: 5px;
}

label {
  font-size: 16px;
  display: flex;
  align-items: center;
}
label::before {
  content: "*";
  color: red;
  display: inline-block;
  margin-right: 3px;
}
label .problem {
  width: 115px;
}
form label span {
  width: 100px;
  font-size: 16px;
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
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.remakeInfo {
  align-items: baseline;
  flex-direction: column;
}
.actionBtn {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.actionBtn ul li:nth-child(1) button {
  color: #f8a32c;
  font-size: 14px;
}

.actionBtn ul li:nth-child(2) button {
  color: #999999;
  font-size: 14px;
}
.remakeInfo label::before {
  content: "";
}
input[type="radio"] {
  margin: 2px 2px 0 8px;
}
.perch {
  height: 50px;
}
</style>