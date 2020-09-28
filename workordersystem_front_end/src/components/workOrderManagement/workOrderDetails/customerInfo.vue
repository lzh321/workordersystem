<template>
  <div>
    <div class="customerInfo">
      <h2>客户信息</h2>
      <!-- <div class="customerInfo_content information"> -->
      <div class="layui-form-item">
        <label class="layui-form-label">工单状态</label>
        <div class="layui-input-block">
          <input
            type="text"
            :value="orderInfo.orderStateName"
            class="layui-input"
            autocomplete="off"
            lay-verify
            disabled
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">工单编号</label>
        <div class="layui-input-block">
          <input
            type="text"
            :value="orderInfoId"
            class="layui-input"
            autocomplete="off"
            lay-verify
            disabled
          />
        </div>
      </div>
      <!-- <div class="layui-form-item">
        <label class="layui-form-label">客户名称</label>
        <div class="layui-input-block">
          <select name="customerName" id="customerName" lay-verify="required">
            <option value>请选择一个客户</option>
            <option
              v-for="(item) in customerNameList"
              :key="item.customerId"
              :value="item.customerId"
            >{{item.customerName}}</option>
          </select>
        </div>
      </div>-->

      <div class="layui-form-item">
        <label class="layui-form-label">客户名称</label>
        <div class="layui-input-block">
          <select
            name="customerName"
            id="customerName"
            lay-filter="billCustomerName"
            lay-search
          >
            <option value>请选择一个客户</option>
            <option
              v-for="(item) in customerNameList"
              :key="item.customerId"
              :value="item.customerId"
              :selected="item.customerId == orderInfo.customerId ? true : false"
            >{{item.customerName}}</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">合同ID</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="agreenmentId"
            :value="orderInfo.agreenmentId ? orderInfo.agreenmentId : ''"
            class="layui-input"
            autocomplete="off"
            placeholder="请输入合同ID"
            lay-verify
          />
        </div>
      </div>

      <!-- <div class="layui-form-item">
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
      </div>-->

      <div class="layui-form-item">
        <label class="layui-form-label">设备投放点</label>
        <div class="layui-input-block">
          <select
            v-if="selectBank"
            name="networkId"
            lay-filter="billSeleNetworkName"
            id="networkId"
            lay-verify=""
            lay-search
          >
            <option value>请选择一个投放点</option>
            <option
              v-for="(item) in networkList"
              :key="item.id"
              :value="item.id"
            >{{item.networName}}</option>
          </select>
          <select
            v-else
            name="networkId"
            lay-filter="billSeleNetworkName"
            id="networkId"
            lay-verify=""
            lay-search
          >
            <option value>请选择一个投放点</option>
            <option
              v-for="(item) in networkList"
              :key="item.id"
              :value="item.id"
              :selected="item.id == orderInfo.networkId ? true : false"
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
            disabled
            lay-verify=""
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">联系人</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="contactName"
            lay-verify=""
            autocomplete="off"
            :value="orderInfo.contactName ? orderInfo.contactName : ''"
            placeholder="请输入联系人"
            class="layui-input"
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
            lay-verify=""
            :value="orderInfo.contactPhone ? orderInfo.contactPhone : ''"
            placeholder="请输入联系电话"
            class="layui-input"
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
          <select name="orderSource" id="orderSource" lay-verify="">
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
          <select name="orderType" id="orderType" lay-verify="">
            <option value>请选择工单类型</option>
            <option :selected="orderInfo.orderType == '设备报障' ? true : false" value="设备报障">设备报障</option>
            <option :selected="orderInfo.orderType == '差错账' ? true : false" value="差错账">差错账</option>
            <option :selected="orderInfo.orderType == '钞空/存满' ? true : false" value="钞空/存满">钞空/存满</option>
            <option :selected="orderInfo.orderType == '吞卡' ? true : false" value="吞卡">吞卡</option>
            <option :selected="orderInfo.orderType == '通讯中断' ? true : false" value="通讯中断">通讯中断</option>
            <option :selected="orderInfo.orderType == '卡钞' ? true : false" value="卡钞">卡钞</option>
            <option :selected="orderInfo.orderType == 'PM' ? true : false" value="PM">PM</option>
            <option :selected="orderInfo.orderType == '软硬件升级' ? true : false" value="软硬件升级">软硬件升级</option>
            <option :selected="orderInfo.orderType == '咨询' ? true : false" value="咨询">咨询</option>
            <option :selected="orderInfo.orderType == '设备确认' ? true : false" value="设备确认">设备确认</option>
            <option :selected="orderInfo.orderType == '其他' ? true : false" value="其他">其他</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">紧急程度</label>
        <div class="layui-input-block">
          <select name="orderUrgency" id="orderUrgency" lay-verify="">
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
            :value="orderInfo.reportTime ? orderInfo.reportTime : ''"
            class="layui-input"
            id="reportedBarrierTime"
            placeholder="请选择报障时间"
            autocomplete="off"
            lay-verify=""
          />
          <i></i>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">设备型号</label>
        <div class="layui-input-block">
          <select
            v-if="selectBank"
            name="modelId"
            lay-filter="billSeleModelType"
            id="modelType"
            lay-verify=""
          >
            <option value>请选择设备型号</option>
            <option
              v-for="(item) in deviceInfoList"
              :key="item.modelId"
              :value="item.modelId"
            >{{item.modelType}}（{{item.modelName}}）</option>
          </select>
          <select
            v-else
            name="modelId"
            lay-filter="billSeleModelType"
            id="modelType"
            lay-verify=""
          >
            <option value>请选择设备型号</option>
            <option
              v-for="(item) in deviceInfoList"
              :key="item.modelId"
              :value="item.modelId"
              :selected="item.modelId == orderInfo.modelId ? true :false"
            >{{item.modelType}}（{{item.modelName}}）</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item CDkey">
        <label class="layui-form-label">设备序列号</label>
        <div class="layui-input-block">
          <select v-if="selectBank" name="deviceNumber" lay-filter="billDeviceNumber" lay-verify>
            <option value>请选择序列号</option>
            <option
              v-for="(item) in deviceNumberList"
              :key="item.deviceNumber"
              :value="item.deviceNumber"
            >{{item.deviceNumber}}</option>
          </select>
          <select v-else name="deviceNumber" lay-filter="billDeviceNumber" lay-verify>
            <option value>请选择序列号</option>
            <option
              v-for="(item) in deviceNumberList"
              :key="item.deviceNumber"
              :value="item.deviceNumber"
              :selected="item.deviceNumber == orderInfo.deviceNumber ? true : false"
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
            :value="orderInfo.problemDescription ? orderInfo.problemDescription : ''"
            placeholder="请输入内容"
            class="layui-textarea"
            lay-verify=""
            autocomplete="off"
          ></textarea>
        </div>
      </div>

      <div class="affix layui-form-item">
        <label class="layui-form-label">附件</label>
        <!-- <button type="button" class="layui-btn" id="selectImage">选择图片</button> -->
        <button type="button" class="layui-btn" id="billUploadImage">上传图片</button>
        <div class="layui-upload">
          <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">
            预览
            <viewer class="layui-upload-list" style="display:flex;flex-wrap:wrap" :images="imgDataArray">
              <div v-for="(item,index) in imgDataArray" :key="index" style="flex: none;width:100px;height:100px;margin-right:10px;margin-bottom:10px;display:inline-block;">
                <img
                class="layui-upload-img"
                style="width:100%;height:100%"
                :src="DomainName+ item "
                :layer-src="DomainName+ item"
                alt
                />
                <a href="javascript:;" @click="delImg(item,index)" class="delImg">X</a>
              </div>
            </viewer>
            <input type="hidden" name="orderImg" :value="imgData" />
          </blockquote>
        </div>
      </div>
      <div v-if="orderInfo.orderState == 7 ? false : true" class="layui-form-item">
        <label class="layui-form-label">指派给</label>
        <div class="layui-input-block">
          <select name="acceptUserId" id="acceptUserId" lay-verify="">
            <option value>请选择指派人</option>
            <option
              v-for="(item) in userList"
              :key="item.userId"
              :value="item.userId"
              :selected="item.userId == orderInfo.singlePersonId ? true :false"
            >{{item.userName}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "customerInfo",
  data() {
    return {
      customerNameList: [],
      networkList: [],
      userList: [],
      deviceNumberList: [],
      deviceInfoList: [],
      orderInfo: {},
      deviceNumber: {},
      networAddress: "",
      imgData: "",
      imgDataArray: [],
      orderInfoId: localStorage.getItem("orderInfoId"),
      orderState: localStorage.getItem("orderState")
        ? localStorage.getItem("orderState")
        : null,
      DomainName: this.$store.state.url,
      selectBank: false
    };
  },
  methods: {
    delImg(item,index) {
      // 删除附件图片
      this.imgDataArray.splice(index, 1);
      this.imgData = this.imgDataArray.join(",");
      this.$axios.post("/api/deleImagesInfo",{userId: this.$store.state.userId,url:item}).then(res=>{
        console.log(res)
        if (res.data.retCode == "000000") {
          layer.msg(res.data.retMsg, { icon: 1 });
        } else {
          layer.msg(res.data.retMsg, { icon: 2 });
        }
      })
      console.log(this.imgData)
      this.$axios.post("/api/alter", {userId: this.$store.state.userId,orderInfoId:this.orderInfoId,orderPhoto: this.imgData}).then(res => {
        console.log(res);
      });
    },
    send() {
      var userId = this.$store.state.userId;
      this.$axios
        .post("/api/getCustomerNameList", { userId: userId })
        .then(res => {
          // 客户名称
          this.customerNameList = res.data.body.customerNameList;
        });
      this.$axios.post("/api/getUserInfoByUserState",{"userId": this.$store.state.userId}).then(res => {
        console.log(res);
        if(res.data.retCode == '000000'){
          if(res.data.body.length > 0){
            for (var i = 0; i < res.data.body.length; i++) {
              this.userList.push(res.data.body[i])
            }
          }
        }
      });
    },
    workValuation() {
      var orderInfoId = localStorage.getItem("orderInfoId")
        ? localStorage.getItem("orderInfoId")
        : "";
      if (orderInfoId) {
        var data = {
          userId: this.$store.state.userId,
          orderInfoId: orderInfoId
        };
        this.$axios.post("/api/getOrderInfo", data).then(res => {
          console.log(res);
          this.orderInfo = res.data.body;

          this.imgData = res.data.body.orderPhoto;
          for (var i = 0; i < res.data.body.orderPhoto.split(",").length; i++) {
            if (res.data.body.orderPhoto.split(",")[i] !== "") {
              this.imgDataArray.push(res.data.body.orderPhoto.split(",")[i]);
            }
          }
          // 获取设备投放点
          var customerId = res.data.body.customerId;
          this.$axios
            .post("/api/getNetworkInfoByCustomerId", { customerId: customerId })
            .then(res => {
              console.log(res);
              this.networkList = res.data.body.networkList;
              for (var i = 0; i < res.data.body.networkList.length; i++) {
                if (networkId == res.data.body.networkList[i].id) {
                  this.networAddress =
                    res.data.body.networkList[i].networAddress;
                }
              }
            });

          // 获取设备型号
          var networkId = res.data.body.networkId;
          this.$axios
            .post("/api/getDeviceNumberListByNetworkId", {
              networkId: networkId
            })
            .then(res => {
              console.log(res);
              if (res.data.retCode == "000000") {
                this.deviceInfoList = res.data.body.modelList;
                for (var i = 0; i < res.data.body.modelList.length; i++) {
                  if(this.orderInfo.modelId == res.data.body.modelList[i].modelId){
                    this.deviceNumberList = res.data.body.modelList[i].deviceNumberList;
                  }
                }
              }
            });

          //工单来源
          var orderSource = res.data.body.orderSource;
          var orderSourceLen = this.$("#orderSource  option").length;
          for (var i = 0; i < orderSourceLen; i++) {
            var orderSourceVal = this.$("#orderSource option")
              .eq(i)
              .val();
            if (orderSource == orderSourceVal) {
              this.$("#orderSource option")
                .eq(i)
                .attr("selected", "selected");
            }
          }
          // //工单类型
          // var orderType = res.data.body.orderType;
          // var orderTypeLen = this.$("#orderType option").length;
          // console.log(orderTypeLen)
          // for (var i = 0; i < orderTypeLen; i++) {
          //   var orderTypeVal = this.$("#orderType option")
          //     .eq(i)
          //     .val();
          //     console.log(orderTypeVal,orderType)
          //   if (orderType == orderTypeVal) {
          //     this.$("#orderType option")
          //       .eq(i)
          //       .attr("selected", "selected");
          //   }
          // }

          //紧急程度
          var orderUrgency = res.data.body.orderUrgency;
          var orderUrgencyLen = this.$("#orderUrgency option").length;
          for (var i = 0; i < orderUrgencyLen; i++) {
            var orderUrgencyVal = this.$("#orderUrgency option")
              .eq(i)
              .val();
            if (orderUrgency == orderUrgencyVal) {
              this.$("#orderUrgency option")
                .eq(i)
                .attr("selected", "selected");
            }
          }
          //指派给
          var acceptUserId = res.data.body.userId;
          var acceptUserIdLen = this.$("#acceptUserId option").length;
          for (var i = 0; i < acceptUserIdLen; i++) {
            var acceptUserIdVal = this.$("#acceptUserId option")
              .eq(i)
              .val();
            if (acceptUserId == acceptUserIdVal) {
              this.$("#acceptUserId option")
                .eq(i)
                .attr("selected", "selected");
            }
          }
        });
      }
    }
  },
  created() {
    this.send();
    this.workValuation();
  },
  mounted() {
    var _this = this;
    layui.use(["form", "element", "upload","laydate", "jquery"], function() {
      var element = layui.element;
      var form = layui.form;
      var $ = layui.jquery;
      var upload = layui.upload;
      var laydate = layui.laydate;
      element.render();

      laydate.render({
        // 报障时间
        elem: "#reportedBarrierTime",
        type: "datetime",
        closeStop: "#reportedBarrierTime",
        trigger: "click"
      });

      // select监听
      form.on("select(billCustomerName)", function(data) {
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
                  _this.selectBank = true;
                  _this.networkList = res.data.body.networkList;
                  _this.networAddress = "";
                  _this.deviceInfoList = [];
                  _this.deviceNumberList = [];
                }
              });
          }
        }
        if (data.value == "") {
          _this.networAddress = "";
          _this.networkList = [];
        }
      });
      form.on("select(billSeleNetworkName)", function(data) {
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
                  _this.selectBank = true;
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

      form.on("select(billSeleModelType)", function(data) {
        for (var i = 0; i < _this.deviceInfoList.length; i++) {
          // console.log(data.value)
          if (data.value == _this.deviceInfoList[i].modelId) {
            // _this.selectBank = true;
            _this.deviceNumberList = _this.deviceInfoList[i].deviceNumberList;
          }
        }
        if (data.value == "") {
          _this.selectBank = true;
          _this.deviceNumber = "";
        }
      });

      //上传图片
      upload.render({
        elem: "#billUploadImage",
        url: "/api/uploadImagesInfo",
        // bindAction:"#workOrderCreate",
        method: "post",
        multiple: false, //是否多文件上传
        accept: "images", // 规定上传文件类型 ，images/file/video/audio
        auto: true, // 是否自动上传
        field: "file", // 设定文件域字段
        size: 4096,
        choose: function(obj) {
          obj.preview(function(index, file, result) {
            console.log(file);
            // $("#imgBox").html(
            //   '<img class="layui-upload-img" style="width:100px;height:100px" src="' +
            //     result +
            //     '" alt />'
            // );
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
          _this.imgDataArray.push(res.body.url.split(",")[0]);
          _this.imgData = _this.imgDataArray.join(",");
          console.log(_this.imgData);
          // $("input[name='recordPhoto']").val(res.body.url);
        }
      });
    });
  },

  updated() {
    // this.send();

    layui.use("form", function() {
      layui.form.render();
    });
  }
};
</script>

<style scoped>
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
.customerInfo .CDkey label::before {
  content: "";
}
.delImg {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background: #c2c2c2;
  position: absolute;
  text-align: center;
  right: -5px;
  top: -5px;
}
</style>