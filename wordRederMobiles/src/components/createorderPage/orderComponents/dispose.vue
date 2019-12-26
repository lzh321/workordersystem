<template>
  <div class="dispose">
    <form action id="formData">
      <div class="info">
        <h2>故障处理记录</h2>
      </div>
      <appointment v-if="orderInfo.appoinmentTime" :orderInfo="orderInfo"></appointment>
      <div v-if="orderStatus == 3 || orderStatus == 10">
        <router-link to="/recordType" tag="div" class="fault">
          <label for>
            <span>故障类型</span>：
          </label>
          <input type="hidden" name="recordType" :value="recordType.recordName ? recordType.recordName : orderInfo.recordType" />
          <input type="text" :value="recordType.recordName ? recordType.recordName : orderInfo.recordType" />
          <span>可选</span>
        </router-link>
        <div @click="gorecordModel(recordType.recordType)" class="fault">
          <label for>
            <span>故障模块</span>：
          </label>
          <input type="hidden" name="recordModel" :value="recordModel.recordModel ? recordModel.recordModel : orderInfo.modelName" />
          <input type="text" :value="recordModel.recordModelName ? recordModel.recordModelName : orderInfo.modelName" />
          <span>可选</span>
        </div>
        <div>
          <label for>
            <span>问题记录</span>：
          </label>
          <textarea name="recordContent" :value="orderInfo.recordContent" id cols="30" rows="10"></textarea>
        </div>
        <div>
          <label for>
            <span>解决办法</span>：
          </label>
          <textarea name="recordSettle" :value="orderInfo.recordSettle" id cols="30" rows="10"></textarea>
        </div>
        <div v-if="orderInfo.appoinmentTime" class="affix">
          <label for>
            <span>附件</span>：
          </label>
          <van-uploader :after-read="afterRead" v-model="fileList" multiple />
          <button type="button" class="layui-btn" @click="uploadImg">上传图片</button>
        </div>
      </div>
      <synergyInfo></synergyInfo>
      <div class="remakeInfo">
        <label for>
          <span>备注</span>：
        </label>
        <textarea class="remark" name="remark" id cols="30" rows="10"></textarea>
      </div>
      <div class="seleTime">
        <van-popup v-model="show" position="bottom" :style="{ height: '52%' }">
          <van-datetime-picker
            v-model="currentDate"
            type="datetime"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="confirm"
            @cancel="cancel"
          />
        </van-popup>
      </div>
    </form>
    <orderLog></orderLog>
    <div class="actionBtn">
      <ul>
        <li @click="finish" v-if="orderStatus == 3 || orderStatus == 10">
          <img src="../../../assets/Images/operation_complete.png" alt />
          <span>完成</span>
        </li>
        <li @click="showPopup" v-if="orderStatus == 3">
          <img src="../../../assets/Images/operation_order.png" alt />
          <span>预约</span>
        </li>
        <li @click="start" v-if="orderStatus == 4">
          <img src="../../../assets/Images/operation_order.png" alt />
          <span>出发</span>
        </li>
        <li @click="showPopup" v-if="orderStatus == 4 ">
          <img src="../../../assets/Images/operation_order.png" alt />
          <span>更改预约</span>
        </li>
        <li @click="reach" v-if="orderStatus == 5">
          <img src="../../../assets/Images/operation_order.png" alt />
          <span>到达</span>
        </li>
        <li @click="begin" v-if="orderStatus == 9">
          <img src="../../../assets/Images/operation_order.png" alt />
          <span>开始</span>
        </li>
        <li
          @click="synergy"
          v-if="orderStatus == 3 || orderStatus == 4 || orderStatus == 5 || orderStatus == 9 || orderStatus == 10"
        >
          <img src="../../../assets/Images/operation_synergy.png" alt />
          <span>协同</span>
        </li>
        <li
          @click="kuantan"
          v-if="orderStatus == 3 || orderStatus == 4 || orderStatus == 5 || orderStatus == 9 || orderStatus == 10"
        >
          <img src="../../../assets/Images/operation_kuantan.png" alt />
          <span>关单</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import orderLog from "./orderLog";
import synergyInfo from "./synergyInfo";
import appointment from "./appointment";
export default {
  name: "dispose",
  props: ["orderStatus", "orderInfo"],
  data() {
    return {
      fileList:[],
      show: false,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(2016, 1, 1),
      maxDate: new Date(2030, 12, 31),
      currentDate: new Date(),
      recordType: {},
      recordModel: {},
      orderInfoId: sessionStorage.getItem("orderInfoId")
    };
  },
  components: {
    orderLog,
    synergyInfo,
    appointment
  },
  methods: {
    afterRead(file){

    },
    uploadImg(){

    },
    send() {
      var recordType = sessionStorage.getItem("recordType");
      if (recordType) {
        //用户列表
        this.recordType = JSON.parse(recordType);
      }
      var recordModel = sessionStorage.getItem("recordModel");
      if (recordModel) {
        //用户列表
        this.recordModel = JSON.parse(recordModel);
      }
    },
    gorecordModel(recordType) {
      console.log(recordType);
      this.$router.push("/recordModel?recordType=" + recordType);
    },
    showPopup() {
      this.show = true;
    },
    resData(handleState) {
      var createData = this.$("#formData").serializeObject();
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

    synergy() {
      //协同
      this.$router.push("/goSynergy");
    },
    reject() {
      //驳回
      this.$router.push("/kuantanState?handleState=9");
    },
    kuantan() {
      //关单
      // this.resData(8);
      this.$router.push("/kuantanState?handleState=8");
    },
    finish() {
      //完成
      var createData = this.$("#formData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.orderInfoId = this.orderInfoId;
      console.log(createData);
      this.axios.post("/api/finishOrderInfo", createData).then(res => {
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
    start() {
      //出发
      this.resData(4);
    },
    reach() {
      //到达
      this.resData(5);
    },
    begin() {
      //开始
      this.resData(6);
    },

    confirm(val) {
      //预约
      var date = val;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var sec = date.getMinutes();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      if (h < 10) h = "0" + h;
      if (sec < 10) sec = "0" + sec;
      var timer =
        date.getFullYear() +
        "-" +
        m +
        "-" +
        d +
        " " +
        h +
        ":" +
        sec +
        ":" +
        "00";
      console.log(timer);
      // this.$refs[this.datePicker].innerHTML = timer;
      this.show = false;
      if(this.orderStatus == 4){
        var handleState = 12
      }else{
        var handleState = 3
      }
      var data = {
        userId: this.$store.state.userId,
        orderInfoId: this.orderInfoId,
        handleState: handleState,
        appoinmentTime: timer,
        remark: this.$(".remark").val()
      };
      console.log(data);
      this.axios.post("/api/handleOrderInfo", data).then(res => {
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
    cancel() {
      this.show = false;
    }
  },
  created(){
    this.send();
  },
  activated() {
    // this.send();
  }
};
</script>

<style scoped>
form {
  padding: 0 15px;
}
.seleTime div {
  padding: 0;
}
.fault {
  display: flex;
  align-items: center;
}
.fault i {
  color: #666666;
}
form div {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}
form div > span {
  display: flex;
  align-items: center;
  margin-left: 8px;
  font-size: 13px;
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
  border: 1px solid #f3f3f3;
  color: #666666;
  font-size: 13px;
  padding: 5px;
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
.actionBtn ul li:nth-child(1) {
  color: #3fd188;
  font-size: 14px;
}
.actionBtn ul li:nth-child(2) {
  color: #f8a32c;
  font-size: 14px;
}
.actionBtn ul li:nth-child(3) {
  color: #7ca6f7;
  font-size: 14px;
}
.actionBtn ul li:nth-child(4) {
  color: #999999;
  font-size: 14px;
}
.remakeInfo label::before{
  content: ''
}
</style>