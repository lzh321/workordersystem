<template>
  <div class="create">
    <form action id="createData">
      <div class="info">
        <h2>客户信息</h2>
        <i>为必填项</i>
      </div>
      <router-link to="/selectBank" tag="div">
        <label for>
          <span>银行名称</span>：
        </label>
        <input name="customerName" :value="bankList.customerId" type="hidden" />
        <input type="text" :value="bankList.customerName" />
        <span>可选</span>
      </router-link>
      <router-link to="/network" tag="div">
        <label for>
          <span>网点名称</span>：
        </label>
        <input name="networkId" :value="networkList.id" type="hidden" />
        <input type="text" :value="networkList.networName" />
        <span>可选</span>
      </router-link>
      <div>
        <label for>
          <span>网点地址</span>：
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
      <div>
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
        <input type="checkbox" name="orderUrgency" value="1" />紧急
        <input type="checkbox" name="orderUrgency" value="0" />一般
      </div>
      <div>
        <label for>
          <span>保障时间</span>：
        </label>
        <input type="text" id="reportTime" name="reportTime" />
        <span>可选</span>
      </div>
      <router-link to="/modelType" tag="div">
        <label for>
          <span>设备型号</span>：
        </label>
        <input type="text" :value="modelType.modelType" />
        <input name="modelId" :value="modelType.modelId" type="hidden" />
        <span>可选</span>
      </router-link>
      <div class="deviceNumber">
        <label for>
          <span>存货编码</span>：
        </label>
        <input type="text" name="deviceNumber" />
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
      </div>
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
    <div class="actionBtn">
      <ul>
        <li @click="bill">
          <img src="../../../assets/Images/operation_receipt.png" alt />
          <span>发单</span>
        </li>
        <li @click="cancel">
          <img src="../../../assets/Images/operation_cancel.png" alt />
          <span>取消</span>
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
export default {
  name: "create",
  data() {
    return {
      fileList: [],
      orderInfoId: sessionStorage.getItem("orderInfoId"),
      bankList: {},
      networkList: {},
      orderSource: {},
      orderType: {},
      modelType: {},
      userList: {}
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
    },
    showPopup() {
      this.show = true;
    },
    getOrderInfo(){
      var data = {
        userId: this.$store.state.userId,
        orderInfoId: this.orderInfoId
      }
      this.axios.post("/api/getOrderInfo",data).then(res=>{
        console.log(res)
        if(res.data.retCode == '000000'){
          this.orderInfo = res.data.body
        }
      })
      
    },
    send() {
      var bankList = sessionStorage.getItem("bankList");
      var networkList = sessionStorage.getItem("networkdata");
      var orderSource = sessionStorage.getItem("orderSource");
      var orderType = sessionStorage.getItem("orderType");
      var modelType = sessionStorage.getItem("modelType");
      var userList = sessionStorage.getItem("userList");
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
    },
    bill() {
      // 发单
      var createData = this.$("#createData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.orderInfoId = this.orderInfoId;
      createData.isClose = 0;
      console.log(createData);
      this.axios.post("/api/alterOrderInfo",createData).then(res=>{
        console.log(res)
        if(res.data.retCode == '000000'){
          layer.msg(res.data.retMsg, {icon: 1})
          sessionStorage.clear();
          setTimeout(()=>{
            this.$router.push('/wordOrder')
          },3000)
        }else{
          layer.msg(res.data.retMsg, {icon: 2})
        }
      })
    },
    cancel() {
      //取消
      this.$router.push("/wordOrder");
      sessionStorage.clear();
    },
    kuantan(){
      // 关单
      var createData = this.$("#createData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.orderInfoId = this.orderInfoId;
      createData.isClose = 1;
      console.log(createData);
      this.axios.post("/api/alterOrderInfo",createData).then(res=>{
        console.log(res)
        if(res.data.retCode == '000000'){
          layer.msg(res.data.retMsg, {icon: 1})
          sessionStorage.clear();
          setTimeout(()=>{
            this.$router.push('/wordOrder')
          },3000)
        }else{
          layer.msg(res.data.retMsg, {icon: 2})
        }
      })
    }
  },
  created() {
    this.send();
    this.getOrderInfo()
  },
  activated() {
    this.send();
  }
};
</script>

<style scoped>
.create {
}
form {
  padding: 0px 15px;
}
.create div {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}
h2 {
  font-size: 14px;
  font-weight: 600;
}
.create div > span {
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.create div > span::after {
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
  padding-left: 5px;
}
input[type="checkbox"] {
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
.create .problem {
  align-items: baseline;
  flex-direction: column;
}
textarea {
  width: 100%;
  margin-top: 10px;
  color: #666666;
  border: 1px solid #f3f3f3;
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
</style>