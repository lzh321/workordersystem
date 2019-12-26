<template>
  <div class="create">
    <form action id="createData">
      <div class="info">
        <h2>客户信息</h2>
        <i>为必填项</i>
      </div>
      <div @click="selectCustomer">
        <label for>
          <span>客户名称</span>：
        </label>
        <input name="customerName" :value="bankList.customerId" type="hidden" />
        <input type="text" :value="bankList.customerName" />
        <span>可选</span>
      </div>
      <div @click="selectNetwork(bankList.customerId)">
        <label for>
          <span>设备投放点</span>：
        </label>
        <input name="networkId" :value="networkList.id" type="hidden" />
        <input type="text" :value="networkList.networName" />
        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>投放点地址</span>：
        </label>
        <input type="text" :value="networkList.networAddress" />
      </div>
      <div>
        <label for>
          <span>联系人</span>：
        </label>
        <input type="text" name="contactName" />
      </div>
      <div>
        <label for>
          <span>联系电话</span>：
        </label>
        <input type="text" name="contactPhone" />
      </div>
      <div class="agreenmentId">
        <label for>
          <span>合同</span>：
        </label>
        <input type="text" name="agreenmentId" />
      </div>
      <div>
        <h2>故障信息</h2>
      </div>
      <router-link to="/orderSource" tag="div">
        <label for>
          <span>工单来源</span>：
        </label>
        <input type="text" :value="orderSource.name" />
        <input name="orderSource" :value="orderSource.id" type="hidden" />
        <span>可选</span>
      </router-link>
      <router-link tag="div" to="/orderType">
        <label for>
          <span>工单类型</span>：
        </label>
        <input type="text" :value="orderType.name" />
        <input name="orderType" :value="orderType.id" type="hidden" />
        <span>可选</span>
      </router-link>
      <div>
        <label for>
          <span>紧急程度</span>：
        </label>
        <input type="radio" name="orderUrgency" value="1" />紧急
        <input type="radio" name="orderUrgency" value="0" />一般
      </div>
      <div>
        <label for="reportTime">
          <span>保障时间</span>：
        </label>
        <input type="text" id="reportTime" name="reportTime" />
      </div>
      <router-link to="/modelType" tag="div">
        <label for>
          <span>设备型号</span>：
        </label>
        <input type="text" :value="modelType.modelType" />
        <input name="modelId" :value="modelType.modelId" type="hidden" />
        <span>可选</span>
      </router-link>
      <div @click="selectDeviceNumber(networkList.id)">
        <label for>
          <span>存货编码</span>：
        </label>
        <input type="text" :value="DeviceNumber.deviceNumber" />
        <input name="deviceNumber" :value="DeviceNumber.deviceNumber" type="hidden" />
      </div>
      <div class="problem">
        <label for>
          <span>问题描述</span>：
        </label>
        <textarea name="problemDescription" id cols="30" rows="10"></textarea>
      </div>
      <div class="affix">
        <label for>
          <span>附件</span>：
        </label>
        <van-uploader :after-read="afterRead" v-model="fileList" multiple />
        <button type="button" class="layui-btn  layui-btn-normal" @click="uploadImg">上传图片</button>
      </div>
      <router-link to="/userList" tag="div">
        <label for>
          <span>指派给</span>：
        </label>
        <input type="hidden" name="acceptUserId" :value="userList.userId" />
        <input type="text" :value="userList.userName" />
        <span class="seleUser"></span>
      </router-link>
      <div class="remakeInfo">
        <label for>
          <span>备注</span>：
        </label>
        <textarea name="remark" id cols="30" rows="10"></textarea>
      </div>
    </form>
    <div class="actionBtn">
      <ul>
        <li @click="bill">
          <img src="../../assets/Images/operation_receipt.png" alt />
          <span>发单</span>
        </li>
        <li @click="cancel">
          <img src="../../assets/Images/operation_cancel.png" alt />
          <span>取消</span>
        </li>
        <li @click="kuantan">
          <img src="../../assets/Images/operation_kuantan.png" alt />
          <span>关单</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "create",
  data() {
    return {
      fileList: [],
      orderInfoId: "",
      bankList: {},
      networkList: {},
      orderSource: {},
      orderType: {},
      modelType: {},
      userList: {},
      DeviceNumber: {},
      isFirstEnter: false
    };
  },
  mounted() {
    layui.use("laydate", function() {
      var laydate = layui.laydate;

      //执行一个laydate实例
      laydate.render({
        elem: "#reportTime", //指定元素
        type: "datetime",
        closeStop: "#reportTime",
        trigger: "click"
      });
    });
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      let content = file.file;
      //创建一个新的FormData
      let formData = new FormData();
      // upload这个名字是后台给的
      formData.append("file", content);
      //获取formdata表单所有的数据
      var data = formData.getAll("file")
      const config = {
        headers: { "Content-Type": "multipart/form-data" }
      };

      data.userId = this.$store.state.userId
      data.soreId = 1
      data.orderInfoId = this.orderInfoId
      console.log(data);
      // this.axios.post("/api/uploadImagesInfo",data,config).then(res=>{
      //   console.log(res)
      // })
    },
    showPopup() {
      this.show = true;
    },
    uploadImg() {
      console.log("上传");

    },
    selectCustomer() {
      this.$router.push("/selectBank");
      this.networkList = {};
      this.DeviceNumber = {};
    },
    selectNetwork(customerId) {
      this.$router.push("/network?customerId=" + customerId);
    },
    selectDeviceNumber(networkId) {
      this.$router.push("/DeviceNumber?networkId=" + networkId);
    },
    getOrderInfoId() {
      var date = new Date();
      var m = date.getMonth();
      var d = date.getDate();
      var h = date.getHours();
      var sec = date.getMinutes();
      var s = date.getSeconds();
      var num = parseInt(Math.random() * 1000);
      console.log(num);
      if (m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      if (h < 10) h = "0" + h;
      if (sec < 10) sec = "0" + sec;
      this.orderInfoId =
        "PL" + date.getFullYear() + (m + 1) + d + h + sec + s + num;
    },
    send() {
      var bankList = sessionStorage.getItem("bankList");
      var networkList = sessionStorage.getItem("networkdata");
      var orderSource = sessionStorage.getItem("orderSource");
      var orderType = sessionStorage.getItem("orderType");
      var modelType = sessionStorage.getItem("modelType");
      var userList = sessionStorage.getItem("userList");
      var DeviceNumber = sessionStorage.getItem("DeviceNumber");
      console.log(bankList);
      if (bankList) {
        //客户名称
        this.bankList = JSON.parse(bankList);
      }
      if (networkList) {
        //投放点
        this.networkList = JSON.parse(networkList);
      }
      if (orderSource) {
        //工单来源
        this.orderSource = JSON.parse(orderSource);
      }
      if (orderType) {
        //工单类型
        this.orderType = JSON.parse(orderType);
      }
      if (modelType) {
        //设备类型
        this.modelType = JSON.parse(modelType);
      }
      if (userList) {
        //用户列表
        this.userList = JSON.parse(userList);
      }
      if (DeviceNumber) {
        //存货编号列表
        this.DeviceNumber = JSON.parse(DeviceNumber);
      }
    },
    bill() {
      // 发单
      // this.getOrderInfoId();
      var createData = this.$("#createData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.orderInfoId = this.orderInfoId;
      createData.isClose = 0;
      console.log(createData);
      this.axios.post("/api/addOrderInfo", createData).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          layer.msg(res.data.retMsg, { icon: 1 });
          sessionStorage.clear();
          setTimeout(() => {
            this.$router.push("/wordOrder");
            this.$("input[type='text']").val("")
            this.$destroy('create')
          }, 3000);
        } else {
          layer.msg(res.data.retMsg, { icon: 2 });
        }
      });
    },
    cancel() {
      //取消
      this.$router.push("/wordOrder");
      this.$("input[type='text']").val("")
      this.$destroy('create')
      sessionStorage.clear();
    },
    kuantan() {
      // 关单
      // this.getOrderInfoId();
      var createData = this.$("#createData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.orderInfoId = this.orderInfoId;
      createData.isClose = 1;
      console.log(createData);
      this.axios.post("/api/addOrderInfo", createData).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          layer.msg(res.data.retMsg, { icon: 1 });
          sessionStorage.clear();
          setTimeout(() => {
            this.$router.push("/wordOrder");
            this.$("input[type='text']").val("")
            this.$destroy('create')
          }, 3000);
        } else {
          layer.msg(res.data.retMsg, { icon: 2 });
        }
      });
    }
  },
  created() {
    this.send();
    this.isFirstEnter = true;
    this.getOrderInfoId()
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == 'create') {
      // 这个name是下一级页面的路由name
      console.log('00000')
      to.meta.isBack = true; // 设置为true说明你是返回到这个页面，而不是通过跳转从其他页面进入到这个页面
    }
    next();
  },
  activated() {
    
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      // 把数据清空，可以稍微避免让用户看到之前缓存的数据
      this.bankList = {};
      this.networkList = {};
      this.orderSource = {};
      this.orderType = {};
      this.modelType = {};
      this.userList = {};
      this.DeviceNumber = {};
      // this.$destroy('create')
      this.send();
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
    this.isFirstEnter = false
    // this.send();
    
  },
  beforeDestroy(){
    thsi.$destroy("create")
  }
  
};
</script>

<style scoped>
.create {
  background: #ffffff;
}
form {
  padding: 0px 15px;
}
form div {
  display: flex;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}
h2 {
  font-size: 14px;
  font-weight: 600;
}
form div > span {
  display: flex;
  align-items: center;
  margin-left: 5px;
}
form div > span::after {
  content: "";
  display: inline-block;
  width: 7px;
  height: 13px;
  background: url("../../assets/Images/choose.png") no-repeat;
  background-size: 100%;
  margin-left: 5px;
}
form div > .seleUser::after {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url("../../assets/Images/assigned.png") no-repeat;
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
  width: 79px;
  font-size: 15px;
  color: #666666;
  text-align: justify;
  text-align-last: justify;
  /* align-items: center; */
  /* display: flex; */
}
/* label span::after{
  content: '';
  display: inline-block;
  width: 1px;
} */
input[type="text"] {
  flex: 1;
  border: none;
  border: 1px solid #f3f3f3;
  height: 35px;
  padding-left: 5px;
}
input[type="radio"] {
  margin: 0 5px;
}

.info {
  justify-content: space-between;
}
.info i {
  display: flex;
  align-items: center;
  font-size: 11px;
  color: #999999;
}
.info i::before {
  content: "*";
  color: red;
  display: inline-block;
}

.create .affix {
  align-items: baseline;
  flex-direction: column;
}
.create .affix div {
  border: none;
}
.create .remakeInfo {
  align-items: baseline;
  flex-direction: column;
}
.remakeInfo label::before {
  content: "";
}
.create .problem {
  align-items: baseline;
  flex-direction: column;
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

.create .actionBtn {
  padding: 0;
  margin-top: 20px;
}
.actionBtn ul {
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #f0f0f0;
}
.actionBtn ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.actionBtn ul li img {
  width: 21px;
  height: 21px;
}
.actionBtn ul li:nth-child(1) {
  color: #7ca6f7;
  font-size: 14px;
}
.actionBtn ul li:nth-child(2) {
  color: #f8a32c;
  font-size: 14px;
}
.actionBtn ul li:nth-child(3) {
  color: #999999;
  font-size: 14px;
}
.deviceNumber label::before {
  content: "";
}
.affix label::before {
  content: "";
}
.agreenmentId label::before {
  content: "";
}
</style>