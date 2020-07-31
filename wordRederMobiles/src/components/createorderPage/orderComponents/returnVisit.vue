<template>
  <!-- 回访记录 -->
  <div class="returnVisit">
    <bill :orderStatus="orderStatus"></bill>
    <orderInfo :orderInfo="orderInfo"></orderInfo>
    <form action id="formData">
      <div class="info">
        <h2>回访记录</h2>
      </div>
      <div>
        <label for>
          <span class="problem">问题是否已解决</span>：
        </label>
        <input
          type="radio"
          name="isFinish"
          v-model="isFinish"
          @change="setIsFinishVal(isFinish)"
          value="0"
          :checked="isFinish == 0 ? true : false"
        />已解决
        <input
          type="radio"
          name="isFinish"
          v-model="isFinish"
          @change="setIsFinishVal(isFinish)"
          value="1"
          :checked="isFinish == 1 ? true : false"
        />未解决
      </div>
      <div>
        <label for>
          <span>满意度情况</span>：
        </label>
        <input
          type="radio"
          name="satisfiedState"
          v-model="satisfiedState"
          @change="setVal(satisfiedState)"
          value="0"
          :checked="satisfiedState == 0 ? true : false"
        />满意
        <input
          type="radio"
          name="satisfiedState"
          v-model="satisfiedState"
          @change="setVal(satisfiedState)"
          value="1"
          :checked="satisfiedState == 1 ? true : false"
        />基本满意
        <input
          type="radio"
          name="satisfiedState"
          v-model="satisfiedState"
          @change="setVal(satisfiedState)"
          value="2"
          :checked="satisfiedState == 2 ? true : false"
        />不满意
      </div>
      <div>
        <label for>
          <span>意见/建议</span>：
        </label>
        <textarea
          v-model="adviseContent"
          @keyup="setAdviseContent(adviseContent)"
          name="adviseContent"
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <div class="remakeInfo">
        <label for>
          <span>备注</span>：
        </label>
        <textarea name="remark" v-model="remark" @keyup="setRemark(remark)" cols="30" rows="10"></textarea>
      </div>
    </form>
    <orderLog></orderLog>
  </div>
</template>

<script>
import orderInfo from "./orderInfo";
import bill from "./bill";
import orderLog from "./orderLog";
export default {
  name: "returnVisit",
  data() {
    return {
      orderInfoId: sessionStorage.getItem("orderInfoId"),
      orderInfo: {},
      orderStatus: this.$route.query.orderStatus,
      isDisabled: false,
      isFinish: sessionStorage.getItem("isFinish") ? sessionStorage.getItem("isFinish") : 0,
      satisfiedState: sessionStorage.getItem("satisfiedState") ? sessionStorage.getItem("satisfiedState") : 0,
      adviseContent: sessionStorage.getItem("adviseContent") ? sessionStorage.getItem("adviseContent") : "",
      remark: sessionStorage.getItem("remark") ? sessionStorage.getItem("remark") : ""
    };
  },
  methods: {
    setIsFinishVal(isFinish) {
      sessionStorage.setItem("isFinish",isFinish)
    },
    setVal(satisfiedState) {
      sessionStorage.setItem("satisfiedState",satisfiedState)
    },
    setAdviseContent(adviseContent) {
      sessionStorage.setItem("adviseContent",adviseContent)
    },
    setRemark(remark) {
      sessionStorage.setItem("remark",remark)
    },
    getOrderInfo() {
      var data = {
        userId: this.$store.state.userId,
        orderInfoId: this.orderInfoId
      };
      this.axios.post("/api/getOrderInfo", data).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          this.orderInfo = res.data.body;
          this.imgData = res.data.body.orderPhoto;
          for (var i = 0; i < res.data.body.orderPhoto.split(",").length; i++) {
            if (res.data.body.orderPhoto.split(",")[i] !== "") {
              this.imgDataArray.push(res.data.body.orderPhoto.split(",")[i]);
            }
          }
        }
      });
    },
    kuantan() {
      var createData = this.$("#createData").serializeObject();
      var formData = this.$("#formData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.isFinish = formData.isFinish;
      createData.adviseContent = formData.adviseContent;
      createData.remark = formData.remark;
      createData.satisfiedState = formData.satisfiedState;
      createData.orderInfoId = this.orderInfoId;
      console.log(createData);
      // this.isDisabled = true;

      var _this = this;
      layer.confirm(
        "是否确认关闭当前工单？",
        { icon: 3, title: "提示" },
        function(index) {
          //向服务端发送关单指令
          _this.axios.post("/api/closeOrderInfo", createData).then(res => {
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
    reject() {
      this.$router.push("/kuantanState?handleState=13");
    }
  },
  created() {
    this.getOrderInfo();
  },
  components: {
    orderInfo,
    bill,
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
.actionBtn ul {
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #f0f0f0;
}
.actionBtn ul li button {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: #f0f0f0;
}
.actionBtn ul li button img {
  width: 21px;
  height: 21px;
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