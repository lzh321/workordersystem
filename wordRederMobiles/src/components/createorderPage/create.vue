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
        <input type="text" :value="bankList.customerName" placeholder="请选择客户名称" />
        <span>可选</span>
      </div>
      <div @click="selectNetwork(bankList.customerId)">
        <label for>
          <span>设备投放点</span>：
        </label>
        <input name="networkId" :value="networkList.id" type="hidden" />
        <input type="text" :value="networkList.networName" placeholder="请选择设备投放点" />
        <span>可选</span>
      </div>
      <div>
        <label for>
          <span>投放点地址</span>：
        </label>
        <input type="text" :value="networkList.networAddress" disabled />
      </div>
      <div>
        <label for>
          <span>联系人</span>：
        </label>
        <input type="text" name="contactName" placeholder="请输入联系人" />
      </div>
      <div>
        <label for>
          <span>联系电话</span>：
        </label>
        <input type="text" name="contactPhone" placeholder="请输入联系电话" />
      </div>
      <div class="agreenmentId">
        <label for>
          <span>合同</span>：
        </label>
        <input type="text" name="agreenmentId" placeholder="请输入合同" />
      </div>
      <div class="info">
        <h2>故障信息</h2>
      </div>
      <router-link to="/orderSource" tag="div">
        <label for>
          <span>工单来源</span>：
        </label>
        <input type="text" :value="orderSource.name" placeholder="请选择工单来源" />
        <input name="orderSource" :value="orderSource.name" type="hidden" />
        <span>可选</span>
      </router-link>
      <router-link tag="div" to="/orderType">
        <label for>
          <span>工单类型</span>：
        </label>
        <input type="text" :value="orderType.name" placeholder="请选择工单类型" />
        <input name="orderType" :value="orderType.name" type="hidden" />
        <span>可选</span>
      </router-link>
      <div class="orderUrgency">
        <label for>
          <span>紧急程度</span>：
        </label>
        <input type="radio" name="orderUrgency" value="1" />紧急
        <input type="radio" name="orderUrgency" value="0" checked />一般
        <input type="radio" class="Urgency" name="orderUrgency" />
      </div>
      <div>
        <label for="reportTime">
          <span>报障时间</span>：
        </label>
        <input type="text" id="reportTime" placeholder="请选择报障时间" name="reportTime" />
      </div>
      <div @click="selectmodelType(networkList.id)" tag="div">
        <label for>
          <span>设备型号</span>：
        </label>
        <input type="text" :value="modelType.modelType" placeholder="请选择设备型号" />
        <input name="modelId" :value="modelType.modelId" type="hidden" />
        <span>可选</span>
      </div>
      <div class="deviceNumber" @click="selectDeviceNumber(modelType.modelType)">
        <label for>
          <span>设备序列号</span>：
        </label>
        <input type="text" :value="DeviceNumber.deviceNumber" placeholder="请选择设备序列号" />
        <input name="deviceNumber" :value="DeviceNumber.deviceNumber" type="hidden" />
        <span>可选</span>
      </div>
      <div class="problem">
        <label for>
          <span>问题描述</span>：
        </label>
        <textarea name="problemDescription" cols="30" placeholder="请输入问题描述" rows="10"></textarea>
      </div>
      <div class="affix">
        <div>
          <label for>
            <span>附件</span>：
          </label>
          <button type="button" class="layui-btn" id="uploadImage">上传图片</button>
        </div>
        <div class="uploadImg">
          <div class="layui-upload">
            <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;padding: 6px;">
              预览
              <div class="layui-upload-list" id="imgBox">
                    <img
                      v-for="(item,index) in imgDataArray"
                      :key="index"
                      class="layui-upload-img"
                      style="width:100px;height:100px;margin-right:10px;margin-bottom:10px;"
                      :src="DomainName+ item "
                      alt
                    />
                  </div>
                  <input type="hidden" name="orderImg" :value="imgData" />
            </blockquote>
          </div>
        </div>
      </div>
      <router-link to="/userList" tag="div">
        <label for>
          <span>指派给</span>：
        </label>
        <input type="hidden" name="acceptUserId" placeholder="请选择指派人" :value="userList.userId" />
        <input type="text" :value="userList.userName" />
        <span class="seleUser"></span>
      </router-link>
      <div class="remakeInfo">
        <label for>
          <span>备注</span>：
        </label>
        <textarea name="remark" cols="30" placeholder="请输入备注" rows="10"></textarea>
      </div>
    </form>
    <div class="actionBtn">
      <ul>
        <li>
          <button :disabled="isDisabled" @click="bill">
            <img src="../../assets/Images/operation_receipt.png" alt />
            <span>发单</span>
          </button>
        </li>
        <li>
          <button @click="cancel">
            <img src="../../assets/Images/operation_cancel.png" alt />
            <span>取消</span>
          </button>
        </li>
        <li>
          <button @click="kuantan">
            <img src="../../assets/Images/operation_kuantan.png" alt />
            <span>关单</span>
          </button>
        </li>
      </ul>
    </div>
    <!-- <div class="perch"></div> -->
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
      imgData: "",
      imgDataArray: [],
      DeviceNumber: {},
      isFirstEnter: false,
      isDisabled: false,
      DomainName: this.$store.state.url
    };
  },
  mounted() {
    var _this = this;
    layui.use(["laydate", "upload"], function() {
      var laydate = layui.laydate;
      var upload = layui.upload;
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
        size: 4096,
        field: "file", // 设定文件域字段
        choose: function(obj) {
          obj.preview(function(index, file, result) {
            console.log(index, file);
            // _this
            //   .$("#imgBox")
            //   .html(
            //     '<img class="addImg" style="width:100px;height:100px" src="' +
            //       result +
            //       '" alt />'
            //   );
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
          _this.imgData += res.body.url;
          _this.imgDataArray.push(res.body.url.split(",")[0]);
          console.log(_this.imgData);
          // _this.$("input[name='orderImg']").val(res.body.url);
        }
      });
    });
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    uploadImg() {
      console.log("上传");
    },
    selectCustomer() {
      this.$router.push("/selectBank");
      sessionStorage.removeItem("networkdata");
      sessionStorage.removeItem("modelType");
      sessionStorage.removeItem("DeviceNumber");
    },

    selectNetwork(customerId) {
      this.$router.push("/network?customerId=" + customerId);
      sessionStorage.removeItem("modelType");
      sessionStorage.removeItem("DeviceNumber");
    },
    selectmodelType(networkId) {
      this.$router.push("/modelType?networkId=" + networkId);
      sessionStorage.removeItem("DeviceNumber");
    },
    selectDeviceNumber(modelType) {
      this.$router.push("/DeviceNumber?modelType=" + modelType);
    },
    getOrderInfoId() {
      var date = new Date();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var sec = date.getMinutes();
      var s = date.getSeconds();
      var num = Math.floor(Math.random() * (100 - 999) + 999);
      console.log(num);
      if (m < 10){
        m = "0" + m;
      } 
      if (d < 10) d = "0" + d;
      if (h < 10) h = "0" + h;
      if (sec < 10) sec = "0" + sec;
      if (s < 10) s = "0" + s;
      this.orderInfoId =
        "PL" + date.getFullYear() + m + d + h + sec + s + num;
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
      this.getOrderInfoId();
      this.isDisabled = true;
      var createData = this.$("#createData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.orderInfoId = this.orderInfoId;
      // createData.isClose = '0';
      console.log(createData);

      this.axios.post("/api/addOrderInfo", createData).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          layer.msg(res.data.retMsg, { icon: 1 });
          sessionStorage.clear();
          setTimeout(() => {
            this.$router.push("/wordOrder");
            this.$("input[type='text']").val("");
            this.$(".Urgency").attr("checked", true);
            this.$("textarea").val("");
            this.$("input[name='orderImg']").val("");
            this.$("#imgBox")
              .children()
              .remove();
            // this.$destroy("create");
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
      this.$("input[type='text']").val("");
      this.$(".Urgency").attr("checked", true);
      this.$("textarea").val("");
      this.$("input[name='orderImg']").val("");
      this.$("#imgBox")
        .children()
        .remove();
      // this.$destroy("create");
      sessionStorage.clear();
    },
    kuantan() {
      // 关单
      this.getOrderInfoId();
      // this.isDisabled = true;
      var createData = this.$("#createData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.orderInfoId = this.orderInfoId;
      createData.isClose = "1";
      console.log(createData);
      var _this = this
      // layer.confirm(
      //   "是否确认关闭当前工单？",
      //   { icon: 3, title: "提示" },
      //   function(index) {
          //向服务端发送关单指令
          _this.axios.post("/api/addOrderInfo", createData).then(res => {
            console.log(res);
            if (res.data.retCode == "000000") {
              layer.msg(res.data.retMsg, { icon: 1 });
              sessionStorage.clear();
              setTimeout(() => {
                _this.$router.push("/wordOrder");
                _this.$("input[type='text']").val("");
                _this.$(".Urgency").attr("checked", true);
                _this.$("textarea").val("");
                _this.$("input[name='orderImg']").val("");
                _this.$("#imgBox")
                  .children()
                  .remove();
              }, 3000);
            } else {
              setTimeout(() => {
                _this.isDisabled = false;
              }, 2000);
              layer.msg(res.data.retMsg, { icon: 2 });
            }
          });
        // }
      // );
    }
  },
  created() {
    this.send();
    this.isFirstEnter = true;
    this.getOrderInfoId();
    this.$("input[type='text']").val("");
    this.$("input[name='orderImg']").val("");
    this.$(".Urgency").attr("checked", true);
    this.$("textarea").val("");
    sessionStorage.clear();
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "/create") {
      console.log("00000");
      // 这个name是下一级页面的路由name
      to.meta.isBack = true;
      // 设置为true说明你是返回到这个页面，而不是通过跳转从其他页面进入到这个页面
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
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false;
    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
    this.isFirstEnter = false;
    this.isDisabled = false;
    this.send();
    // this.getOrderInfoId();
  }
};
</script>

<style scoped>
.create {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  width: 100%;
}
form {
  /* padding: 0px 15px; */
  flex: 1;
  overflow: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
form div {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  /* margin-bottom: 10px; */
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
  height: 35px;
  padding-left: 5px;
  font-size: 15px;
  background: #ffffff;
  color: #666666;
}
input[type="text"]::placeholder {
  color: #dddddd;
  font-size: 15px;
}
input[type="radio"] {
  margin: 0 5px;
}

.info {
  justify-content: space-between;
  height: 50px;
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
.orderUrgency {
  height: 50px;
}
.actionBtn {
  padding: 0;
  /* height: 50px; */
  /* position: fixed; */
  width: 100%;
  bottom: 0;
  z-index: 9999;
}
/* .perch{
  padding: 10px 0;
  margin-top: 20px;
  height: 50px;
} */
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
.agreenmentId label::before {
  content: "";
}
.Urgency {
  display: none;
}
.uploadImg {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 100%;
  padding: 0;
}
.layui-upload {
  width: 100%;
  padding: 0;
}
.layui-elem-quote {
  width: 100%;
}
.layui-btn {
  height: 35px;
  line-height: 35px;
}
#imgBox{
  display: flex;
  flex-wrap: wrap;
  padding: 0;
}

</style>