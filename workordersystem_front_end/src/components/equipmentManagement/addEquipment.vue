<template>
  <!-- 新增设备 -->
  <div class="addEquipment">
    <form class="layui-form layui-form-pane" action>
      <div class="info">
        <span>基础信息</span>
        <span>为必填项</span>
      </div>
      <div class="basicInfo">
        <!-- <div class="layui-form-item">
          <label class="layui-form-label">设备序列号</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="deviceNumber"
              required
              autocomplete="off"
              v-if="DeviceInfo.deviceNumber"
              :value="DeviceInfo.deviceNumber ?  DeviceInfo.deviceNumber : ''"
              lay-verify="required"
              placeholder="请输入设备序列号"
              class="layui-input"
            />
            <input
              v-else
              type="text"
              name="deviceNumber"
              required
              value
              autocomplete="off"
              lay-verify="required"
              placeholder="请输入设备序列号"
              class="layui-input"
            />
          </div>
        </div>-->
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
                :selected="item.customerName == DeviceInfo.customerName ? true : false"
              >{{item.customerName}}</option>
            </select>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">设备型号</label>
          <div class="layui-input-block" layui-filter>
            <select name="modelId" lay-filter="seleModelType" id="modelType" lay-verify="required">
              <option value>请选择设备型号</option>
              <option
                v-for="(item) in DeviceModelType"
                :key="item.modelType"
                :value="item.modelType"
                :selected="item.modelType == DeviceInfo.modelType ? true : false"
              >{{item.modelType}}</option>
            </select>
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">存货名称</label>
          <div class="layui-input-block" layui-filter>
            <select name="modelId" lay-filter="seleModelType" id="modelType" lay-verify="required">
              <option value>请选择存货名称</option>
              <option
                v-for="(item) in modelName"
                :key="item.modelId"
                :value="item.modelId"
                :selected="item.modelId == DeviceInfo.modelId ? true : false"
              >{{item.modelName}}</option>
            </select>
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
                :value="item.id ? item.id : DeviceInfo.networkId"
                :selected="item.id == DeviceInfo.networkId ? true : false"
              >{{item.networName}}</option>
            </select>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">所在城市</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="region"
              autocomplete="off"
              :value="DeviceInfo.region ? DeviceInfo.region : regionName"
              class="layui-input"
              lay-verify="required"
              disabled
            />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label layui">投放点详细地址</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="networAddress"
              autocomplete="off"
              class="layui-input"
              lay-verify="required"
              :value="networAddress ? networAddress : DeviceInfo.networkAddress"
              disabled
            />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label layui">请输入序列号</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="deviceNumber"
              autocomplete="off"
              lay-verify="required"
              class="layui-input"
              :value="DeviceInfo.deviceNumber"
            />
          </div>
        </div>

        <!-- <div class="layui-form-item">
          <label class="layui-form-label">设备序列号</label>
          <div class="layui-input-block">
            <select
              name="deviceNumber"
              lay-filter="deviceNumber"
              id="modelType"
              lay-verify="required"
            >
              <option value>请选择设备序列号</option>
              <option
                v-for="(item) in deviceNumberList"
                :key="item.deviceId"
                :value="item.deviceId"
                :selected="item.deviceId == DeviceInfo.deviceId ? true : false"
              >{{item.deviceNumber}}</option>
            </select>
          </div>
        </div>-->

        <div class="layui-form-item Maintenance">
          <label class="layui-form-label">维保开始时间</label>
          <div class="layui-input-block">
            <input
              type="text"
              class="layui-input"
              name="seviceBegintime"
              id="Maintenance_start"
              autocomplete="off"
              v-if="DeviceInfo.seviceBegintime"
              :value="DeviceInfo.seviceBegintime"
              placeholder="请选择维保开始时间"
            />
            <input
              v-else
              type="text"
              class="layui-input"
              lay-verify
              name="seviceBegintime"
              id="Maintenance_start"
              autocomplete="off"
              value
              placeholder="请选择维保开始时间"
            />
          </div>
        </div>
        <div class="layui-form-item Maintenance">
          <label class="layui-form-label">维保结束时间</label>
          <div class="layui-input-block">
            <input
              type="text"
              class="layui-input"
              lay-verify
              name="seviceEndtime"
              autocomplete="off"
              :value="DeviceInfo.seviceEndtime"
              v-if="DeviceInfo.seviceEndtime"
              id="Maintenance_end"
              placeholder="请选择维保结束时间"
            />
            <input
              v-else
              type="text"
              class="layui-input"
              lay-verify
              name="seviceEndtime"
              value
              autocomplete="off"
              id="Maintenance_end"
              placeholder="请选择维保结束时间"
            />
          </div>
        </div>
      </div>
      <div class="info">其他信息</div>

      <div class="layui-form-item">
        <label class="layui-form-label">设备状态</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="deviceState"
            required
            lay-verify
            v-if="DeviceInfo.deviceState"
            :value="DeviceInfo.deviceState"
            placeholder="请输入设备状态"
            autocomplete="off"
            class="layui-input"
          />
          <input
            v-else
            type="text"
            name="deviceState"
            required
            lay-verify
            value
            placeholder="请输入设备状态"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">生产批次</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="deviceBatch"
            required
            lay-verify
            v-if="DeviceInfo.deviceBatch"
            :value="DeviceInfo.deviceBatch"
            placeholder="请输入生产批次"
            autocomplete="off"
            class="layui-input"
          />
          <input
            v-else
            type="text"
            name="deviceBatch"
            required
            lay-verify
            value
            placeholder="请输入生产批次"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">签报号</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="deviceSignNumber"
            required
            lay-verify
            v-if="DeviceInfo.deviceSignNumber"
            :value="DeviceInfo.deviceSignNumber"
            placeholder="请输入签报号"
            autocomplete="off"
            class="layui-input"
          />
          <input
            v-else
            type="text"
            name="deviceSignNumber"
            required
            lay-verify
            value
            placeholder="请输入签报号"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">物料类型</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="deviceType"
            required
            lay-verify
            v-if="DeviceInfo.deviceType"
            :value="DeviceInfo.deviceType"
            placeholder="请输入物料类型"
            autocomplete="off"
            class="layui-input"
          />
          <input
            type="text"
            name="deviceType"
            required
            lay-verify
            v-else
            value
            placeholder="请输入物料类型"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">发货时间</label>
        <div class="layui-input-block">
          <input
            v-if="DeviceInfo.deliveryTime"
            type="text"
            class="layui-input"
            name="deliveryTime"
            id="shipments"
            :value="DeviceInfo.deliveryTime"
            placeholder="请选择发货时间"
            autocomplete="off"
          />
          <input
            v-else
            type="text"
            class="layui-input"
            name="deliveryTime"
            id="shipments"
            value
            autocomplete="off"
            placeholder="请选择发货时间"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">运单号</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="waybillNumber"
            required
            lay-verify
            v-if="DeviceInfo.waybillNumber"
            :value="DeviceInfo.waybillNumber"
            placeholder="请输入运单号"
            autocomplete="off"
            class="layui-input"
          />
          <input
            type="text"
            name="waybillNumber"
            required
            lay-verify
            v-else
            value
            placeholder="请输入运单号"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">是否转运</label>
        <div class="layui-input-block">
          <select name="deviceTransport" id="deviceTransport" lay-verify>
            <option value>请选择是否转运</option>
            <option value="1">是</option>
            <option value="2">否</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">转运流程</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="transportProcess"
            required
            lay-verify
            v-if="DeviceInfo.transportProcess"
            :value="DeviceInfo.transportProcess"
            placeholder="请输入转运流程"
            autocomplete="off"
            class="layui-input"
          />
          <input
            type="text"
            name="transportProcess"
            required
            lay-verify
            v-else
            value
            placeholder="请输入转运流程"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">验收单</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="checkNumber"
            required
            lay-verify
            v-if="DeviceInfo.checkNumber"
            :value="DeviceInfo.checkNumber"
            placeholder="请输入验收单"
            autocomplete="off"
            class="layui-input"
          />
          <input
            type="text"
            name="checkNumber"
            required
            lay-verify
            v-else
            value
            placeholder="请输入验收单"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">验收时间</label>
        <div class="layui-input-block">
          <input
            type="text"
            class="layui-input"
            name="checkTime"
            v-if="DeviceInfo.checkTime"
            :value="DeviceInfo.checkTime"
            id="checkTime"
            autocomplete="off"
            placeholder="请选择验收时间"
          />
          <input
            type="text"
            class="layui-input"
            name="checkTime"
            v-else
            value
            autocomplete="off"
            id="checkTime"
            placeholder="请选择验收时间"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">客户联系人</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="linkman"
            required
            lay-verify
            v-if="DeviceInfo.linkman"
            :value="DeviceInfo.linkman"
            placeholder="请输入客户联系人"
            autocomplete="off"
            class="layui-input"
          />
          <input
            type="text"
            name="linkman"
            required
            lay-verify
            v-else
            value
            placeholder="请输入客户联系人"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">联系电话</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="linkmanPhone"
            required
            lay-verify
            v-if="DeviceInfo.linkmanPhone"
            :value="DeviceInfo.linkmanPhone"
            placeholder="请输入联系电话"
            autocomplete="off"
            class="layui-input"
          />
          <input
            type="text"
            name="linkmanPhone"
            required
            lay-verify
            v-else
            value
            placeholder="请输入联系电话"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">资产状态</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="assetState"
            required
            lay-verify
            v-if="DeviceInfo.assetState"
            :value="DeviceInfo.assetState"
            placeholder="请输入资产状态"
            autocomplete="off"
            class="layui-input"
          />
          <input
            type="text"
            name="assetState"
            required
            lay-verify
            v-else
            value
            placeholder="请输入资产状态"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">是否入库</label>
        <div class="layui-input-block">
          <select name="stockInState" id="stockInState" lay-verify>
            <option value>请选择是否入库</option>
            <option value="1">是</option>
            <option value="2">否</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">开票时间</label>
        <div class="layui-input-block">
          <input
            type="text"
            class="layui-input"
            name="bollotTime"
            id="payment"
            autocomplete="off"
            v-if="DeviceInfo.bollotTime"
            :value="DeviceInfo.bollotTime"
            placeholder="请选择开票时间"
          />
          <input
            type="text"
            class="layui-input"
            name="bollotTime"
            id="payment"
            v-else
            autocomplete="off"
            value
            placeholder="请选择开票时间"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">是否回款</label>
        <div class="layui-input-block">
          <select name="payState" id="payState" lay-verify>
            <option value>请选择是否回款</option>
            <option value="1">是</option>
            <option value="2">否</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">回款时间</label>
        <div class="layui-input-block">
          <input
            type="text"
            class="layui-input"
            v-if="DeviceInfo.retMoneyTime"
            :value="DeviceInfo.retMoneyTime"
            name="retMoneyTime"
            autocomplete="off"
            id="returnedMoney"
            placeholder="请选择回款时间"
          />
          <input
            type="text"
            class="layui-input"
            v-else
            value
            name="retMoneyTime"
            id="returnedMoney"
            autocomplete="off"
            placeholder="请选择回款时间"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="addEquiment">立即提交</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
          <button type="reset" @click="cancel" class="layui-btn layui-btn-primary">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "addEquipment",
  data() {
    return {
      DeviceModelType: [],
      customerNameList: [],
      networkList: [],
      modelName: [],
      regionName: "",
      networAddress: "",
      inventoryName: "",
      deviceNumber: "",
      DeviceInfo: {},
      deviceNumberList: []
    };
  },
  methods: {
    send() {
      var userId = this.$store.state.userId;
      this.$axios.post("/api/getAllModelType", userId).then(res => {
        // 设备型号
        // console.log(res);
        this.DeviceModelType = res.data.body.modelTypeList;
      });
      this.$axios.post("/api/getCustomerNameList", userId).then(res => {
        // 客户名称
        this.customerNameList = res.data.body.customerNameList;
      });

    },
    getDeviceInfo() {
      console.log(111);
      var deviceId = sessionStorage.getItem("deviceId")
        ? sessionStorage.getItem("deviceId")
        : "";

      if (deviceId) {
        var data = {
          userId: this.$store.state.userId,
          deviceId: deviceId
        };

        this.$axios.post("/api/getDeviceInfo", data).then(res => {
          console.log(res.data.body);
          this.DeviceInfo = res.data.body;

          // 设备投放点
          var customerId = res.data.body.customerId;
          this.$axios
            .post("/api/getNetworkInfoByCustomerId", {
              userId: this.$store.state.userId,
              customerId: customerId
            })
            .then(res => {
              console.log(res);
              if (res.data.retCode == "000000") {
                this.networkList = res.data.body.networkList;
              }
            });

          // 存货编号
          var networkId = res.data.body.networkId;
          this.$axios
            .post("/api/getDeviceNumberListByNetworkId", {
              userId: this.$store.state.userId,
              networkId: networkId
            })
            .then(res => {
              console.log(res);
              if (res.data.retCode == "000000") {
                this.deviceNumberList = res.data.body.deviceNumberList;
              }
            });

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
          this.$axios
            .post("/api/getModleNameListByType", { modelType: modelType })
            .then(res => {
              console.log(res);
              if (res.data.retCode == "000000") {
                this.modelName = res.data.body.modelNamerList;
              }
            });

          //是否转运
          var deviceTransport = res.data.body.deviceTransport;
          var deviceTransportLen = this.$("#deviceTransport option").length;
          for (var i = 0; i < deviceTransportLen; i++) {
            var deviceTransportVal = this.$("#deviceTransport option")
              .eq(i)
              .val();
            if (deviceTransport == deviceTransportVal) {
              this.$("#deviceTransport option")
                .eq(i)
                .attr("selected", "selected");
            } else {
              this.$("#deviceTransport option")
                .eq(0)
                .attr("selected", "selected");
            }
          }

          //是否入库
          var stockInState = res.data.body.stockInState;
          var stockInStateLen = this.$("#stockInState option").length;
          for (var i = 0; i < stockInStateLen; i++) {
            var stockInStateVal = this.$("#stockInState option")
              .eq(i)
              .val();
            if (stockInState == stockInStateVal) {
              this.$("#stockInState option")
                .eq(i)
                .attr("selected", "selected");
            }
          }

          //是否回款

          var payState = res.data.body.payState;
          var payStateLen = this.$("#payState option").length;
          for (var i = 0; i < payStateLen; i++) {
            var payStateVal = this.$("#payState option")
              .eq(i)
              .val();
            if (payState == payStateVal) {
              this.$("#payState option")
                .eq(i)
                .attr("selected", "selected");
            }
          }
        });
      }
    },
    cancel() {
      this.$router.push("/equipmentList?type=equipmentList");
    }
  },
  mounted() {
    this.getDeviceInfo();
    var _this = this;
    //Demo
    layui.use(["form", "laydate"], function() {
      var form = layui.form;
      form.render();

      var laydate = layui.laydate;
      //日期时间选择器
      laydate.render({
        // 维保开始时间
        elem: "#Maintenance_start",
        type: "datetime",
        closeStop: "#Maintenance_start",
        trigger: "click"
      });
      laydate.render({
        // 维保结束时间
        elem: "#Maintenance_end",
        type: "datetime",
        trigger: "click"
      });
      laydate.render({
        // 发货时间
        elem: "#shipments",
        type: "datetime",
        trigger: "click"
      });
      laydate.render({
        // 验收时间
        elem: "#acceptance",
        type: "datetime",
        trigger: "click"
      });
      laydate.render({
        // 开票时间
        elem: "#payment",
        type: "datetime",
        trigger: "click"
      });
      laydate.render({
        // 回款时间
        elem: "#returnedMoney",
        type: "datetime",
        trigger: "click"
      });

      form.on("select(customerName)", function(data) {
        for (var i = 0; i < _this.customerNameList.length; i++) {
          // console.log(data.value)
          if (data.value == _this.customerNameList[i].customerId) {
            _this.$axios
              .post("/api/getNetworkInfoByCustomerId", {
                userId: _this.$store.state.userId,
                customerId: data.value
              })
              .then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  _this.networkList = res.data.body.networkList;
                }
              });
          }
        }
        if (data.value == "") {
          _this.networAddress = "";
          _this.regionName = "";
          _this.networkList = [];
        }
      });
      form.on("select(seleNetworkName)", function(data) {
        for (var i = 0; i < _this.networkList.length; i++) {
          // console.log(data.value)
          if (data.value == _this.networkList[i].id) {
            _this.networAddress = _this.networkList[i].networAddress;
            _this.regionName = _this.networkList[i].regionName;
            _this.$axios
              .post("/api/getDeviceNumberListByNetworkId", {
                userId: _this.$store.state.userId,
                networkId: data.value
              })
              .then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  _this.deviceNumberList = res.data.body.deviceNumberList;
                }
              });
          }
        }
        if (data.value == "") {
          _this.networAddress = "";
          _this.regionName = "";
          _this.deviceNumberList = [];
        }
      });

      // select监听
      // form.on("select(seleNetworkName)", function(data) {
      //   for (var i = 0; i < _this.networkList.length; i++) {
      //     // console.log(data.value);
      //     if (data.value == _this.networkList[i].id) {
      //       _this.regionName = _this.networkList[i].regionName;
      //       _this.networAddress = _this.networkList[i].networAddress;
      //     }
      //   }
      //   if (data.value == "") {
      //     _this.regionName = "";
      //     _this.networAddress = "";
      //   }
      // });
      form.on("select(seleModelType)", function(data) {
        console.log(data);
        for (var i = 0; i < _this.DeviceModelType.length; i++) {
          if (data.value == _this.DeviceModelType[i].modelType) {
            _this.$axios
              .post("/api/getModleNameListByType", { modelType: data.value })
              .then(res => {
                console.log(res);
                if (res.data.retCode == "000000") {
                  _this.modelName = res.data.body.modelNamerList;
                }
              });
          }
        }
        if (data.value == "") {
          _this.inventoryName = "";
        }
        form.render();
      });
      // 监听radio
      form.on("radio(filter)", function(data) {
        console.log(data.elem); //得到radio原始DOM对象
        console.log(data.value); //被点击的radio的value值
      });
      //监听提交
      form.on("submit(addEquiment)", function(data) {
        var deviceId = sessionStorage.getItem("deviceId")
          ? sessionStorage.getItem("deviceId")
          : "";
        console.log(deviceId);
        data.field.userId = _this.$store.state.userId;
        if (deviceId === null || deviceId === "") {
          _this.$axios.post("/api/addDeviceInfo", data.field).then(res => {
            console.log(res);
            if (res.data.retCode == "000000") {
              layer.msg(res.data.retMsg, { icon: 1 });
              setTimeout(function() {
                _this.$router.push("/equipmentList?type=equipmentList");
              }, 3000);
            } else {
              layer.msg(res.data.retMsg, { icon: 2 });
            }
          });
        } else {
          data.field.deviceId = deviceId;
          _this.$axios.post("/api/alterDeviceInfo", data.field).then(res => {
            console.log(res);
            if (res.data.retCode == "000000") {
              layer.msg(res.data.retMsg, { icon: 1 });
              sessionStorage.removeItem("deviceId");
              setTimeout(function() {
                _this.$router.push("/equipmentList?type=equipmentList");
              }, 3000);
            } else {
              layer.msg(res.data.retMsg, { icon: 2 });
            }
          });
        }
        return false;
      });

      //表单验证
      form.verify({
        username: function(value, item) {
          //value：表单的值、item：表单的DOM对象
          if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
            return "用户名不能有特殊字符";
          }
          if (/(^\_)|(\__)|(\_+$)/.test(value)) {
            return "用户名首尾不能出现下划线'_'";
          }
          if (/^\d+\d+\d$/.test(value)) {
            return "用户名不能全为数字";
          }
        },

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"]
      });
    });
  },

  created() {
    this.send();
    // this.getDeviceInfo()
  },
  updated() {
    layui.use("form", function() {
      layui.form.render();
    });
  },
  beforeDestroy() {}
};
</script>

<style scoped>
.addEquipment {
  padding: 15px 15px 0 15px;
}
.info {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
}
.layui-input-block {
  margin-left: 130px !important;
}
label {
  width: 130px !important;
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
  font-size: 15px;
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
.basicInfo .Maintenance label::before {
  content: "";
}
</style>