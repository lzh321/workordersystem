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
        <input
          name="customerName"
          :value="bankList.customerId ? bankList.customerId : orderInfo.customerId"
          type="hidden"
        />
        <input
          type="text"
          :value="bankList.customerName ? bankList.customerName : orderInfo.customerName"
        />
        <span>可选</span>
      </div>
      <div @click="selectNetwork(bankList.customerId)">
        <label for>
          <span>设备投放点</span>：
        </label>
        <input
          name="networkId"
          :value="networkList.id ? networkList.id : orderInfo.networkId"
          type="hidden"
        />
        <input
          type="text"
          :value="networkList.networName ? networkList.networName : orderInfo.networName"
        />
        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>投放点地址</span>：
        </label>
        <input type="text" :value="orderInfo.networAddress" />
      </div>
      <div>
        <label for>
          <span>联系人</span>：
        </label>
        <input type="text" :value="orderInfo.contactName" name="contactName" />
      </div>
      <div>
        <label for>
          <span>联系电话</span>：
        </label>
        <input type="text" :value="orderInfo.contactPhone" name="contactPhone" />
      </div>
      <div>
        <label for>
          <span>合同</span>：
        </label>
        <input type="text" :value="orderInfo.agreenmentId" name="agreenmentId" />
      </div>
      <div>
        <h2>故障信息</h2>
      </div>
      <router-link to="/orderSource" tag="div">
        <label for>
          <span>工单来源</span>：
        </label>
        <input
          type="text"
          :value="orderInfo.orderSource == 0 ? '电话' : orderInfo.orderSource == 1 ? '微信' : orderInfo.orderSource == 2 ? '其他' : ''"
        />
        <input name="orderSource" :value="orderInfo.orderSource" type="hidden" />
        <span>可选</span>
      </router-link>
      <router-link tag="div" to="/orderType">
        <label for>
          <span>工单类型</span>：
        </label>
        <input
          type="text"
          :value="orderInfo.orderType == 0 ? '电话' : orderInfo.orderType == 1 ? '微信' : orderInfo.orderType == 2 ? '其他' : ''"
        />
        <input name="orderType" :value="orderInfo.orderType" type="hidden" />
        <span>可选</span>
      </router-link>
      <div>
        <label for>
          <span>紧急程度</span>：
        </label>
        <input
          type="radio"
          name="orderUrgency"
          value="1"
          :checked="orderInfo.orderUrgency == 1 ? true : false"
        />紧急
        <input
          type="radio"
          name="orderUrgency"
          value="0"
          :checked="orderInfo.orderUrgency == 0 ? true : false"
        />一般
      </div>
      <div>
        <label for>
          <span>保障时间</span>：
        </label>
        <input type="text" :value="orderInfo.reportTime" id="reportTime" name="reportTime" />
        <span>可选</span>
      </div>
      <router-link to="/modelType" tag="div">
        <label for>
          <span>设备型号</span>：
        </label>
        <input type="text" :value="orderInfo.modelType" />
        <input name="modelId" :value="orderInfo.modelId" type="hidden" />
        <span>可选</span>
      </router-link>
      <div @click="selectDeviceNumber(networkList.id)">
        <label for>
          <span>存货编码</span>：
        </label>
        <input
          type="text"
          :value="DeviceNumber.deviceNumber ? DeviceNumber.deviceNumber : orderInfo.deviceNumber"
        />
        <input
          name="deviceNumber"
          :value="DeviceNumber.deviceNumber ? DeviceNumber.deviceNumber : orderInfo.deviceNumber"
          type="hidden"
        />
      </div>
      <div class="problem">
        <label for>
          <span>问题描述</span>：
        </label>
        <textarea
          name="problemDescription"
          :value="orderInfo.problemDescription"
          id
          cols="30"
          rows="10"
        ></textarea>
      </div>
      <!-- <div class="affix">
        <label for>
          <span>附件</span>：
        </label>
        <div>
          <van-uploader :after-read="afterRead" v-model="fileList" multiple></van-uploader>
        </div>
        <van-button icon="photo" type="primary" @click="uploadImg">上传图片</van-button>
      </div>-->

      <div class="affix">
        <div>
          <label for>
            <span>附件</span>：
          </label>
          <button type="button" class="layui-btn" id="uploadImage">上传图片</button>
        </div>
        <div class="uploadImg">
          <div class="layui-upload">
            <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">
              预览
              <div class="layui-upload-list" id="imgBox"></div>
              <input type="hidden" name="orderImg" value />
            </blockquote>
          </div>
        </div>
      </div>

      <router-link to="/userList" tag="div">
        <label for>
          <span>指派给</span>：
        </label>
        <!-- <div class="seleUser" v-if="orderInfo.userId ? true : false">
          <input type="hidden" name="acceptUserId" :value="orderInfo.userId" />
          <input type="text" :value="orderInfo.singlePerson" />
        </div>-->
        <div class="seleUser">
          <input
            type="hidden"
            name="acceptUserId"
            :value="userList.userId ? userList.userId : orderInfo.singlePersonId"
          />
          <input
            type="text"
            :value="userList.userName ? userList.userName : orderInfo.singlePerson"
          />
        </div>

        <span>可选</span>
      </router-link>
      <div class="remakeInfo">
        <label for>
          <span>备注</span>：
        </label>
        <textarea name="remark" id cols="30" rows="10"></textarea>
      </div>
      <div class="Log">
        <orderLog></orderLog>
      </div>
    </form>
    <div class="perch"></div>
    <div class="actionBtn">
      <ul>
        <li>
          <button :disabled="isDisabled" @click="bill">
            <img src="../../../assets/Images/operation_receipt.png" alt />
            <span>发单</span>
          </button>
        </li>
        <li>
          <button :disabled="isDisabled" @click="cancel">
            <img src="../../../assets/Images/operation_cancel.png" alt />
            <span>取消</span>
          </button>
        </li>
        <li>
          <button :disabled="isDisabled" @click="kuantan">
            <img src="../../../assets/Images/operation_kuantan.png" alt />
            <span>关单</span>
          </button>
        </li>
      </ul>
    </div>
    
  </div>
</template>

<script>
import orderLog from "../orderComponents/orderLog";
export default {
  name: "bill",
  data() {
    return {
      fileList: [],
      orderInfoId: sessionStorage.getItem("orderInfoId"),
      orderInfo: {},
      bankList: {},
      networkList: {},
      orderSource: {},
      orderType: {},
      modelType: {},
      userList: {},
      DeviceNumber: {},
      isDisabled: false
    };
  },
  components: {
    orderLog
  },
  mounted() {
    layui.use(["laydate", "upload"], function() {
      var laydate = layui.laydate;
      var upload = layui.upload
      //执行一个laydate实例
      laydate.render({
        elem: "#reportTime", //指定元素
        type: "datetime",
        closeStop: "#reportTime",
        trigger: "click"
      });

      //上传图片
      upload.render({
        elem: "#uploadImage",
        url: "/api/uploadImagesInfo",
        // bindAction: "#uploadImage",
        method: "post",
        multiple: false, //是否多文件上传
        accept: "images", // 规定上传文件类型 ，images/file/video/audio
        auto: true, // 是否自动上传
        field: "file", // 设定文件域字段
        choose: function(obj) {
          obj.preview(function(index, file, result) {
            console.log(index, file);
            _this
              .$("#imgBox")
              .html(
                '<img class="layui-upload-img" style="width:100px;height:100px" src="' +
                  result +
                  '" alt />'
              );
            // obj.resetFile(index, file, _this.orderInfoId + '-' + index); //重命名文件名
          });
          this.data = { orderInfoId: _this.orderInfoId, soreId: 1 };
        },
        before: function(obj) {
          //预读本地文件示例，不支持ie8
        },
        // allDone:function(obj){
        //   console.log(obj.total); //得到总文件数
        //   console.log(obj.successful); //请求成功的文件数
        //   console.log(obj.aborted); //请求失败的文件数
        // },
        done: function(res) {
          //上传完毕
          console.log(res);
          if (res.retCode == 0) {
            layer.msg(res.retMsg, { icon: 1 });
          } else {
            layer.msg(res.retMsg, { icon: 2 });
          }
          _this.$("input[name='orderImg']").val(res.body.url);
        }
      });
    });
  },
  methods: {
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
    getImg() {
      if (this.orderInfo.recordPhoto) {
        this.$("#imgBox").html(
          '<img style="width:100px;height:100px" src=" http://192.168.1.245/' +
            this.orderInfo.recordPhoto.split(",")[0] +
            '" alt />'
        );
      }
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
        }
      });
    },
    bill() {
      // 发单
      var createData = this.$("#createData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.orderInfoId = this.orderInfoId;
      createData.isClose = 0;
      console.log(createData);
      this.isDisabled = true;
      this.axios.post("/api/alterOrderInfo", createData).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          layer.msg(res.data.retMsg, { icon: 1 });
          sessionStorage.clear();
          setTimeout(() => {
            this.$router.push("/wordOrder");
          }, 3000);
        } else {
          setTimeout(() => {
            this.isDisabled = false;
          }, 2000);
          layer.msg(res.data.retMsg, { icon: 2 });
        }
      });
    },
    cancel() {
      //取消
      this.$router.push("/wordOrder");
      sessionStorage.clear();
    },
    kuantan() {
      // 关单
      var createData = this.$("#createData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.orderInfoId = this.orderInfoId;
      createData.isClose = 1;
      console.log(createData);
      this.isDisabled = true;
      this.axios.post("/api/alterOrderInfo", createData).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          layer.msg(res.data.retMsg, { icon: 1 });
          sessionStorage.clear();
          setTimeout(() => {
            this.$router.push("/wordOrder");
          }, 3000);
        } else {
          setTimeout(() => {
            this.isDisabled = false;
          }, 2000);
          layer.msg(res.data.retMsg, { icon: 2 });
        }
      });
    }
  },
  created() {
    this.getOrderInfo();
    this.send();
  },
  updated() {
    this.getImg();
  },
  activated() {
    this.getOrderInfo();
    this.send();
  }
};
</script>

<style scoped>
.create {
}
form {
  padding: 0px ;
}
form > div {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 15px;
}
h2 {
  font-size: 16px;
  font-weight: 600;
}
.create div > span {
  display: flex;
  align-items: center;
  margin-left: 5px;
  font-size: 13px;
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
  width: 80px;
  font-size: 16px;
  color: #666666;
  text-align-last: justify;
}
input[type="text"] {
  flex: 1;
  border:none;
  height: 35px;
  padding-left: 4px;
  font-size: 16px;
  color: #666666;
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
  font-size: 15px;
  padding: 5px;
}

.actionBtn {
  padding: 0;

  position: fixed;
  width: 100%;
  bottom: 0;
}
.perch {
  padding: 10px 0;
  margin-top: 20px;
  height: 50px;
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
  color: #7ca6f7;
  font-size: 14px;
}
.actionBtn ul li:nth-child(2) button {
  color: #f8a32c;
  font-size: 14px;
}
.actionBtn ul li:nth-child(3) button {
  color: #999999;
  font-size: 14px;
}
.deviceNumber label::before {
  content: "";
}
.affix label::before {
  content: "";
}
.remakeInfo label::before {
  content: "";
}
.seleUser {
  flex: 1;
}
.seleUser input {
  width: 100%;

}

.affix div{
  display: flex;
}
.uploadImg{
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 100%;
  padding: 0;
}
.layui-upload {
  width: 100%;
  padding: 0
}
.layui-elem-quote{
  width: 100%;
}
.layui-btn{
  height: 35px;
  line-height: 35px;
}
</style>