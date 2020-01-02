<template>
  <div class="workOrderCreate">
    <form action class="layui-form layui-form-pane">
      <div class="info">
        <span></span>
        <span>为必填项</span>
      </div>
      <progressBar v-if="orderState === '0' ? true : false"></progressBar>
      <div class="basicInfo">
        <customerInfo v-if="orderState === '0' ? true : false"></customerInfo>
        <div v-else>
          <div class="customerInfo">
            <h2>客户信息</h2>
            <!-- <div class="customerInfo_content information"> -->
            <div class="layui-form-item">
              <label class="layui-form-label">客户名称</label>
              <div class="layui-input-block">
                <select
                  name="customerName"
                  id="customerName"
                  lay-filter="customerName"
                  lay-verify="required"
                >
                  <option value>请选择一个客户</option>
                  <option
                    v-for="(item) in customerNameList"
                    :key="item.customerId"
                    :value="item.customerId"
                  >{{item.customerName}}</option>
                </select>
              </div>
            </div>

            <div class="agreenmentId layui-form-item">
              <label class="layui-form-label">合同ID</label>
              <div class="layui-input-block">
                <input
                  type="text"
                  name="agreenmentId"
                  autocomplete="off"
                  placeholder="请输入合同ID"
                  value
                  class="layui-input"
                />
              </div>
            </div>

            <div class="layui-form-item">
              <label class="layui-form-label">设备投放点</label>
              <div class="layui-input-block">
                <select
                  name="networkId"
                  lay-filter="seleNetworkName"
                  id="networkId"
                  lay-verify="required"
                >
                  <option value>请选择一个投放点</option>
                  <option
                    v-for="(item) in networkList"
                    :key="item.id"
                    :value="item.id"
                  >{{item.networName}}</option>
                </select>
              </div>
            </div>

            <div class="layui-form-item">
              <label class="layui-form-label">投放点地址</label>
              <div class="layui-input-block">
                <input
                  type="text"
                  name="networAddress"
                  autocomplete="off"
                  class="layui-input"
                  :value="networAddress"
                  lay-verify="required"
                  disabled
                />
              </div>
            </div>

            <div class="layui-form-item">
              <label class="layui-form-label">联系人</label>
              <div class="layui-input-block">
                <input
                  type="text"
                  name="contactName"
                  autocomplete="off"
                  placeholder="请输入联系人"
                  value
                  class="layui-input"
                  lay-verify="required"
                />
              </div>
            </div>

            <div class="layui-form-item">
              <label class="layui-form-label">联系电话</label>
              <div class="layui-input-block">
                <input
                  type="text"
                  name="contactPhone"
                  autocomplete="off"
                  placeholder="请输入联系电话"
                  value
                  class="layui-input"
                  lay-verify="required"
                />
              </div>
            </div>

            <!-- </div> -->
          </div>

          <div class="faultMessage">
            <h2>故障信息</h2>
            <!-- <div class="faultMessage_content information"> -->
            <div class="layui-form-item">
              <label class="layui-form-label">工单来源</label>
              <div class="layui-input-block">
                <select name="orderSource" id="orderSource" lay-verify="required">
                  <option value>选择工单来源</option>
                  <option value="电话">电话</option>
                  <option value="微信">微信</option>
                  <option value="其他">其他</option>
                </select>
              </div>
            </div>

            <div class="layui-form-item">
              <label class="layui-form-label">工单类型</label>
              <div class="layui-input-block">
                <select name="orderType" id="orderType" lay-verify="required">
                  <option value>请选择工单类型</option>
                  <option value="设备保障">设备报障</option>
                  <option value="差错账">差错账</option>
                  <option value="钞空/存满">钞空/存满</option>
                  <option value="吞卡">吞卡</option>
                  <option value="通讯中断">通讯中断</option>
                  <option value="卡钞">卡钞</option>
                  <option value="PM">PM</option>
                  <option value="软硬件升级">软硬件升级</option>
                  <option value="咨询">咨询</option>
                  <option value="设备确认">设备确认</option>
                  <option value="其他">其他</option>
                </select>
              </div>
            </div>

            <div class="layui-form-item">
              <label class="layui-form-label">紧急程度</label>
              <div class="layui-input-block">
                <select name="orderUrgency" id="orderUrgency" lay-verify="required">
                  <option value>请选择紧急程度</option>
                  <option value="0">一般</option>
                  <option value="1">紧急</option>
                </select>
              </div>
            </div>

            <div class="layui-form-item">
              <label class="layui-form-label">报障时间</label>
              <div class="layui-input-block">
                <input
                  type="text"
                  name="reportTime"
                  value
                  lay-verify="required"
                  class="layui-input"
                  autocomplete="off"
                  placeholder="请选择报障时间"
                  id="reportedBarrierTime"
                />
                <i></i>
              </div>
            </div>

            <div class="layui-form-item">
              <label class="layui-form-label">设备型号</label>
              <div class="layui-input-block">
                <select
                  name="modelId"
                  lay-filter="seleModelType"
                  id="modelType"
                  lay-verify="required"
                >
                  <option value>请选择设备型号</option>
                  <option
                    v-for="(item) in deviceInfoList"
                    :key="item.modelId"
                    :value="item.modelId"
                    :selected="item.modelId == orderInfo.modelId ? true : false"
                  >{{item.modelType}}（{{item.modelName}}）</option>
                </select>
              </div>
            </div>

            <div class="layui-form-item CDkey">
              <label class="layui-form-label">设备序列号</label>
              <div class="layui-input-block">
                <select name="deviceNumber" lay-filter="deviceNumber" id="deviceNumber" lay-verify>
                  <option value>请选择设备序列号</option>
                  <option
                    v-for="(item) in deviceNumberList"
                    :key="item.deviceNumber"
                    :value="item.deviceNumber"
                  >{{item.deviceNumber}}</option>
                </select>
              </div>
            </div>
            <!-- </div> -->
            <div class="layui-form-item layui-form-text">
              <label class="layui-form-label">问题描述</label>
              <div class="layui-input-block">
                <textarea
                  name="problemDescription"
                  value
                  placeholder="请输入内容"
                  lay-verify="required"
                  class="layui-textarea"
                  autocomplete="off"
                ></textarea>
              </div>
            </div>

            <div class="affix layui-form-item">
              <label class="layui-form-label">附件</label>
              <!-- <button type="button" class="layui-btn" id="selectImage">选择图片</button> -->
              <button type="button" class="layui-btn" id="uploadImage">上传图片</button>
              <div class="layui-upload">
                <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">
                  预览
                  <div class="layui-upload-list" id="imgBox">
                    <img
                      v-for="(item,index) in imgDataArray"
                      :key="index"
                      class="layui-upload-img"
                      style="width:100px;height:100px;margin-right:10px"
                      :src="DomainName+ item "
                      alt
                    />
                  </div>
                  <input type="hidden" name="orderImg" :value="imgData" />
                </blockquote>
              </div>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">指派给</label>
            <div class="layui-input-block">
              <select name="acceptUserId" id="acceptUserId" lay-verify="required">
                <option value>请选择指派人</option>
                <option
                  v-for="(item) in userList"
                  :key="item.userId"
                  :value="item.userId"
                  v-show="item.userId == 'admin' ? false : true"
                >{{item.userName}}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="layui-form-item layui-form-text">
          <label class="layui-form-label">备注</label>
          <div class="layui-input-block">
            <textarea
              name="remark"
              :value="orderInfo.remark ? orderInfo.remark : ''"
              placeholder="请输入内容"
              class="layui-textarea"
              autocomplete="off"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button
            type="button"
            class="layui-btn"
            lay-submit
            lay-filter="bill"
            id="workOrderCreate"
          >发单</button>
          <button
            type="button"
            class="layui-btn layui-btn-primary"
            lay-submit
            lay-filter="Kuantan"
          >关单</button>
          <button type="reset" @click="cancel" class="layui-btn layui-btn-primary">取消</button>
        </div>
      </div>
      <workOrderLog v-if="orderState == 0 "></workOrderLog>
    </form>
  </div>
</template>

<script>
import customerInfo from "./workOrderDetails/customerInfo";
import workOrderLog from "./workOrderDetails/workOrderLog";
import progressBar from "../progressBar";
export default {
  name: "workOrderCreate",
  data() {
    return {
      customerNameList: [],
      networkList: [],
      deviceInfoList: [],
      userList: [],
      deviceNumberList: [],
      orderInfo: {},
      deviceNumber: {},
      networAddress: "",
      deviceNumber: "",
      agreenmentId: "",
      imgData: "",
      imgDataArray: [],
      orderInfoId: "",
      orderState: sessionStorage.getItem("orderState")
        ? sessionStorage.getItem("orderState")
        : null,
      DomainName: this.$store.state.url
    };
  },
  components: {
    customerInfo,
    progressBar,
    workOrderLog
  },
  methods: {
    cancel() {
      this.$router.push("/workOrderManagement?type=workOrderManagement");
    },
    send() {
      var userId = this.$store.state.userId;
      // this.$axios.post("/api/getDeviceModelList", userId).then(res => {
      //   // 设备型号
      //   console.log(res)
      //   this.deviceInfoList = res.data.body.modelList;
      // });
      this.$axios.post("/api/getCustomerNameList", userId).then(res => {
        // 客户名称
        this.customerNameList = res.data.body.customerNameList;
      });
      this.$axios.post("/api/getUserList", userId).then(res => {
        // 员工列表
        // console.log(res);
        this.userList = res.data.body.userList;
      });

      var date = new Date();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var h = date.getHours();
      var sec = date.getMinutes();
      var s = date.getSeconds();
      var num = Math.floor(Math.random() * (100 - 999) + 999);
      console.log(num);
      if (m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      if (h < 10) h = "0" + h;
      if (sec < 10) sec = "0" + sec;
      if (s < 10) s = "0" + s;
      this.orderInfoId =
        "PL" + date.getFullYear() + m + d + h + sec + s + num;
    }
    // echoImg() {
    //   this.imgDataArray = this.imgData.split(",");
    // }
  },
  mounted() {
    var _this = this;
    layui.use(["form", "upload", "layer", "laydate", "jquery"], function() {
      var form = layui.form;
      var $ = layui.jquery;
      var upload = layui.upload;
      var laydate = layui.laydate;
      var layer = layui.layer;
      form.render();

      laydate.render({
        // 维保开始时间
        elem: "#reportedBarrierTime",
        type: "datetime",
        closeStop: "#reportedBarrierTime",
        trigger: "click"
      });
      // select监听
      form.on("select(customerName)", function(data) {
        for (var i = 0; i < _this.customerNameList.length; i++) {
          // console.log(data.value)
          if (data.value == _this.customerNameList[i].customerId) {
            _this.$axios
              .post("/api/getNetworkInfoByCustomerId", {
                customerId: data.value
              })
              .then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  _this.networkList = res.data.body.networkList;
                  _this.networAddress = "";
                }
              });
          }
        }
        if (data.value == "") {
          _this.networAddress = "";
          _this.networkList = [];
        }
      });
      form.on("select(seleNetworkName)", function(data) {
        for (var i = 0; i < _this.networkList.length; i++) {
          // console.log(data.value)
          if (data.value == _this.networkList[i].id) {
            _this.networAddress = _this.networkList[i].networAddress;
            _this.$axios
              .post("/api/getDeviceNumberListByNetworkId", {
                networkId: data.value
              })
              .then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  _this.deviceInfoList = res.data.body.modelList;
                }
              });
          }
        }
        if (data.value == "") {
          _this.networAddress = "";
          _this.deviceNumberList = [];
        }
      });

      form.on("select(seleModelType)", function(data) {
        for (var i = 0; i < _this.deviceInfoList.length; i++) {
          // console.log(data.value)
          if (data.value == _this.deviceInfoList[i].modelId) {
            _this.deviceNumberList = _this.deviceInfoList[i].deviceNumberList;
          }
        }
        if (data.value == "") {
          _this.deviceNumber = "";
        }
      });

      //监听提交
      form.on("submit(bill)", function(data) {
        console.log(data.field, orderInfoId);

        var orderInfoId = sessionStorage.getItem("orderInfoId")
          ? sessionStorage.getItem("orderInfoId")
          : "";

        data.field.userId = _this.$store.state.userId;
        if (
          orderInfoId === null ||
          orderInfoId === "" ||
          orderInfoId === undefined
        ) {
          data.field.orderInfoId = _this.orderInfoId;
          _this.$axios.post("/api/addOrderInfo", data.field).then(res => {
            console.log(res);
            if (res.data.retCode == "000000") {
              layer.msg(res.data.retMsg, { icon: 1 });
              setTimeout(() => {
                _this.$router.push(
                  "/workOrderManagement?type=workOrderManagement"
                );
              }, 2000);
            } else {
              layer.msg(res.data.retMsg, { icon: 2 });
            }
          });
        } else {
          data.field.orderInfoId = orderInfoId;
          _this.$axios.post("/api/alterOrderInfo", data.field).then(res => {
            console.log(res);
            if (res.data.retCode == "000000") {
              layer.msg(res.data.retMsg, { icon: 1 });
              setTimeout(() => {
                _this.$router.push(
                  "/workOrderManagement?type=workOrderManagement"
                );
              }, 2000);
            } else {
              layer.msg(res.data.retMsg, { icon: 2 });
            }
          });
        }
        return false;
      });

      // 关单
      form.on("submit(Kuantan)", function(data) {
        console.log(data.field, orderInfoId);

        var orderInfoId = sessionStorage.getItem("orderInfoId")
          ? sessionStorage.getItem("orderInfoId")
          : "";
        if (
          orderInfoId === null ||
          orderInfoId === "" ||
          orderInfoId === undefined
        ) {
          data.field.userId = _this.$store.state.userId;
          data.field.orderInfoId = _this.orderInfoId;
          data.field.isClose = "1";
          layer.confirm(
            "是否确认关闭当前工单？",
            { icon: 3, title: "提示" },
            function(index) {
              //向服务端发送关单指令

              _this.$axios.post("/api/addOrderInfo", data.field).then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  layer.msg(res.data.retMsg, { icon: 1 });
                  setTimeout(() => {
                    _this.$router.push(
                      "/workOrderManagement?type=workOrderManagement"
                    );
                  }, 2000);
                } else {
                  layer.msg(res.data.retMsg, { icon: 2 });
                }
              });
            }
          );
        } else {
          data.field.userId = _this.$store.state.userId;
          data.field.orderInfoId = orderInfoId;
          data.field.isClose = "1";
          layer.confirm(
            "是否确认关闭当前工单？",
            { icon: 3, title: "提示" },
            function(index) {
              //向服务端发送关单指令
              _this.$axios.post("/api/alterOrderInfo", data.field).then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  layer.msg(res.data.retMsg, { icon: 1 });
                  setTimeout(() => {
                    _this.$router.push(
                      "/workOrderManagement?type=workOrderManagement"
                    );
                  }, 2000);
                } else {
                  layer.msg(res.data.retMsg, { icon: 2 });
                }
              });
            }
          );
        }
        return false;
      });

      //上传图片
      upload.render({
        elem: "#uploadImage",
        url: "/api/uploadImagesInfo",
        // bindAction:"#uploadImage",
        method: "post",
        multiple: false, //是否多文件上传
        accept: "images", // 规定上传文件类型 ，images/file/video/audio
        auto: true, // 是否自动上传
        size: 4096,
        field: "file", // 设定文件域字段
        choose: function(obj) {
          obj.preview(function(index, file, result) {
            console.log(index, file);

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
          // _this.echoImg();
        }
      });
    });
  },
  created() {
    this.send();
  },
  updated() {
    // setTimeout(function() {
    layui.use(["form"], function() {
      layui.form.render("select");
    });
    // }, 10);
  }
};
</script>

<style scoped>
.workOrderCreate {
  padding: 20px 15px 0;
}
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
.uploadImg {
  display: inline-block;
  width: 200px;
  height: 200px;
}
.uploadImg img {
  width: 100%;
  height: 100%;
}
.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
.info span {
  display: flex;
  align-items: center;
  font-weight: 600;
}
.basicInfo .layui-form-label::before {
  content: "*";
  font-size: 20px;
  display: inline-block;
  color: red;
  line-height: 30px;
  height: 20px;
}
.layui-form-label {
  display: flex;
  align-items: center;
}
.info span:nth-child(2) {
  font-weight: 400;
  font-size: 14px;
  color: #c2c2c2;
}
.info span:nth-child(2)::before {
  content: "*";
  font-size: 20px;
  display: inline-block;
  color: red;
  line-height: 30px;
  height: 20px;
}
.basicInfo .affix label::before {
  content: "";
}
.basicInfo .agreenmentId label::before {
  content: "";
}
.basicInfo .CDkey label::before {
  content: "";
}
</style>