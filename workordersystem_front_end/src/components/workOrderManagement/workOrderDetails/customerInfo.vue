<template>
  <div class="">
      <div class="customerInfo">
        <h2>客户信息</h2>
        <!-- <div class="customerInfo_content information"> -->
        <div class="layui-form-item">
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
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">合同ID</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="agreenmentId"
              :value="orderInfo.agreenmentId ? orderInfo.agreenmentId : ''"
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
              :value="networAddress ? networAddress : orderInfo.networAddress "
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
              :value="orderInfo.contactName ? orderInfo.contactName : ''"
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
              :value="orderInfo.contactPhone ? orderInfo.contactPhone : ''"
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
            <select name="orderSource" id="orderSource">
              <option value>选择工单来源</option>
              <option value="0">电话</option>
              <option value="1">其他</option>
            </select>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">工单类型</label>
          <div class="layui-input-block">
            <select name="orderType" id="orderType">
              <option value>请选择工单类型</option>
              <option value="0">设备保障</option>
              <option value="1">差错账</option>
              <option value="2">钞空/存满</option>
              <option value="3">吞卡</option>
              <option value="4">通讯中断</option>
              <option value="5">卡钞</option>
              <option value="6">PM</option>
              <option value="7">软硬件升级</option>
              <option value="8">咨询</option>
              <option value="9">设备确认</option>
              <option value="10">其他</option>
            </select>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">紧急程度</label>
          <div class="layui-input-block">
            <select name="orderUrgency" id="orderUrgency">
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
            />
            <i></i>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">设备型号</label>
          <div class="layui-input-block">
            <select name="modelId" lay-filter="seleModelType" id="modelType" lay-verify="required">
              <option value>请选择设备型号</option>
              <option
                v-for="(item) in deviceInfoList"
                :key="item.deviceId"
                :value="item.modelId"
              >{{item.modelType}}</option>
            </select>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">存货编码</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="deviceNumber"
              :value="deviceNumber ? deviceNumber : orderInfo.deviceNumber"
              class="layui-input"
              disabled
            />
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
            ></textarea>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">附件</label>
          <button type="button" class="layui-btn" id="uploadImage">上传图片</button>
          <div class="layui-upload">
            <blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;">
              预览
              <div class="layui-upload-list" id="imgBox"></div>
              <input
                type="hidden"
                name="orderImg"
                :value="orderInfo.orderPhoto ? orderInfo.orderPhoto : ''"
              />
            </blockquote>
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
      orderInfo: {},
      customerNameList:[],
      deviceInfoList: [],
      networkList:[],
      userList:[],
      deviceNumber: "",
      networAddress: ""
    };
  },
  methods: {
    send() {
      var userId = this.$store.state.userId;
      this.$axios.post("/api/getDeviceInfoList", userId).then(res => {
        // 设备型号
        // console.log(res)
        this.deviceInfoList = res.data.body.deviceInfoList;
      });
      this.$axios.post("/api/getCustomerNameList", userId).then(res => {
        // 客户名称
        this.customerNameList = res.data.body.customerNameList;
      });
      this.$axios.post("/api/getNetworkList", userId).then(res => {
        // 设备投放地点
        // console.log(res)
        this.networkList = res.data.body.networkList;
      });
      this.$axios.post("/api/getUserList", userId).then(res => {
        // 员工列表
        // console.log(res);
        this.userList = res.data.body.userList;
      });

      var date = new Date();
      var m = date.getMonth();
      var d = date.getDate();
      var h = date.getHours();
      var sec = date.getMinutes();
      if (m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      if (h < 10) h = "0" + h;
      if (sec < 10) sec = "0" + sec;
      this.orderInfoId = "PL" + date.getFullYear() + (m + 1) + d + h + sec;
    },
    workValuation() {
      var orderInfoId = sessionStorage.getItem("orderInfoId")
        ? sessionStorage.getItem("orderInfoId")
        : "";
      if (orderInfoId) {
        var data = {
          userId: this.$store.state.userId,
          orderInfoId: orderInfoId
        };
        this.$axios.post("/api/getOrderInfo", data).then(res => {
          console.log(res);
          this.orderInfo = res.data.body;
          this.$(".uploadImg").html(res.data.body.orderPhoto ? '<img style="width:100px;height:100px" src=" http://192.168.1.245/'+ res.data.body.orderPhoto.split(',')[0] +'" alt />' : '')
          // 设备投放点
          var networkId = res.data.body.networkId;
          var networkIdLen = this.$("#networkId option").length;
          for (var i = 0; i < networkIdLen; i++) {
            var networkIdVal = this.$("#networkId option")
              .eq(i)
              .val();
            if (networkId == networkIdVal) {
              this.$("#networkId option")
                .eq(i)
                .attr("selected", "selected");
            }
          }

          // 客户名称
          var customerName = res.data.body.customerName;
          var customerNameLen = this.$("#customerName option").length;
          for (var i = 0; i < customerNameLen; i++) {
            var customerNameText = this.$("#customerName option")
              .eq(i)
              .text();
            if (customerName == customerNameText) {
              this.$("#customerName option")
                .eq(i)
                .attr("selected", "selected");
            }
          }

          //设备型号
          var modelType = res.data.body.modelType;
          var modelTypeLen = this.$("#modelType option").length;
          for (var i = 0; i < modelTypeLen; i++) {
            var networkIdText = this.$("#modelType option")
              .eq(i)
              .text();
            if (modelType == networkIdText) {
              this.$("#modelType option")
                .eq(i)
                .attr("selected", "selected");
            }
          }
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
          var orderType = res.data.body.orderType;
          var orderTypeLen = this.$("#orderType option").length;
          for (var i = 0; i < orderTypeLen; i++) {
            var orderTypeVal = this.$("#orderType option")
              .eq(i)
              .val();

            if (orderType == orderTypeVal) {
              this.$("#orderType option")
                .eq(i)
                .attr("selected", "selected");
            }
          }
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
  created(){
    this.send()
  },
  mounted(){
    this.workValuation()
  },
  updated(){
    layui.use("form",function(){
      layui.form.render()
    })
  }
};
</script>

<style scoped>
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>