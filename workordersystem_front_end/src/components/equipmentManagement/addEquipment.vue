<template>
  <!-- 新增设备 -->
  <div class="addEquipment">
    <form class="layui-form layui-form-pane" action>
      <div class="info">基础信息</div>
      <div class="layui-form-item">
        <label class="layui-form-label">存货编码</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="deviceNumber"
            required
            lay-verify="required"
            placeholder="请输入存货编码"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">设备型号</label>
        <div class="layui-input-block" layui-filter>
          <select name="modelId" lay-verify="required">
            <option value>请选择设备型号</option>
            <option v-for="(item) in deviceInfoList" :key="item.deviceId" :value="item.modelId">{{item.modelType}}</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">存货名称</label>
        <div class="layui-input-block" layui-filter>
          <input type="text" name="inventoryName" lay-verify="required" placeholder="请输入存货名称" value="" class="layui-input" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">客户名称</label>
        <div class="layui-input-block" layui-filter="test2">
          <select name="customerName" lay-verify="required">
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
        <label class="layui-form-label">设备投放点</label>
        <div class="layui-input-block">
          <select name="networkId" lay-filter="seleNetworkName" lay-verify="required">
            <option value>请选择一个投放点</option>
            <option v-for="(item) in networkList" :key="item.id" :value="item.id">{{item.networName}}</option>
          </select>
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">所在城市</label>
        <div class="layui-input-block">
          <input type="text" name="region" autocomplete="off" :value="regionName" class="layui-input" disabled />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">投放点详细地址</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="networAddress"
            autocomplete="off"
            class="layui-input"
            :value="networAddress"
            disabled
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">维保开始时间</label>
        <div class="layui-input-block">
          <input
            type="text"
            class="layui-input"
            lay-verify="required"
            name="seviceBegintime"
            id="Maintenance_start"
            placeholder="请选择维保开始时间"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">维保结束时间</label>
        <div class="layui-input-block">
          <input
            type="text"
            class="layui-input"
            lay-verify="required"
            name="seviceEndtime"
            id="Maintenance_end"
            placeholder="请选择维保结束时间"
          />
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
            type="text"
            class="layui-input"
            name="deliveryTime"
            id="shipments"
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
            placeholder="请输入运单号"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">是否转运</label>
        <div class="layui-input-block">
          <select name="deviceTransport" lay-verify>
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
            placeholder="请输入资产状态"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">是否入库</label>
        <div class="layui-input-block">
          <select name="stockInState" lay-verify>
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
            placeholder="请选择开票时间"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">是否回款</label>
        <div class="layui-input-block">
          <select name="payState" lay-verify>
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
            name="retMoneyTime"
            id="returnedMoney"
            placeholder="请选择回款时间"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="addEquiment">立即提交</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
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
      deviceInfoList: [],
      customerNameList: [],
      networkList: [],
      regionName: '',
      networAddress: ''
    };
  },
  mounted() {
    var _this = this;
    layui.use("laydate", function() {
      var laydate = layui.laydate;
      //日期时间选择器
      laydate.render({
        // 维保开始时间
        elem: "#Maintenance_start",
        type: "datetime",
        closeStop: "#Maintenance_start"
      });
      laydate.render({
        // 维保结束时间
        elem: "#Maintenance_end",
        type: "datetime"
      });
      laydate.render({
        // 发货时间
        elem: "#shipments",
        type: "datetime"
      });
      laydate.render({
        // 验收时间
        elem: "#acceptance",
        type: "datetime"
      });
      laydate.render({
        // 开票时间
        elem: "#payment",
        type: "datetime"
      });
      laydate.render({
        // 回款时间
        elem: "#returnedMoney",
        type: "datetime"
      });
    });
    //Demo
    layui.use("form", function() {
      var form = layui.form;
      // select监听
      form.on("select(seleNetworkName)", function(data) {
        for(var i = 0; i < _this.networkList.length; i++){
          console.log(data.value)
          if(data.value == _this.networkList[i].id){
            _this.regionName = _this.networkList[i].regionName
            _this.networAddress = _this.networkList[i].networAddress
          }
        }
        if(data.value == ''){
          _this.regionName =''
          _this.networAddress = ''
        }
      });
      // 监听radio
      form.on("radio(filter)", function(data) {
        console.log(data.elem); //得到radio原始DOM对象
        console.log(data.value); //被点击的radio的value值
      });
      //监听提交
      form.on("submit(addEquiment)", function(data) {
        var deviceId = sessionStorage.getItem('deviceId') ? sessionStorage.getItem('deviceId') : ''
        console.log(deviceId)
        data.field.userId = _this.$store.state.userId
        if(deviceId === null || deviceId === ''){
          _this.$axios.post("/api/addDeviceInfo", data.field).then(res => {
            console.log(res);
            if(res.data.retCode == '000000'){
              layer.msg(res.data.retMsg,{icon: 1})
              setTimeout(function(){
                _this.$router.push('/equipmentList?type=equipmentList')
              },3000)
            }
          });
        }else{
          data.field.deviceId = deviceId
          _this.$axios.post("/api/alterDeviceInfo", data.field).then(res => {
            console.log(res);
            if(res.data.retCode == '000000'){
              layer.msg(res.data.retMsg,{icon: 1})
              sessionStorage.removeItem("deviceId")
              setTimeout(function(){
                _this.$router.push('/equipmentList?type=equipmentList')
              },3000)
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
  methods: {
    send() {
      var userId = this.$store.state.userId
      this.$axios.post("/api/getDeviceInfoList", userId).then(res => {  // 设备型号
        this.deviceInfoList = res.data.body.deviceInfoList;
      });
      this.$axios.post("/api/getCustomerNameList", userId).then(res => {  // 存货名称
        this.customerNameList = res.data.body.customerNameList;
      });
      this.$axios.post("/api/getCustomerNameList", userId).then(res => {  // 客户名称
        this.customerNameList = res.data.body.customerNameList;
      });
      this.$axios.post('/api/getNetworkList', userId).then(res=>{  // 设备投放地点
        this.networkList = res.data.body.networkList
      })
    }
  },
  created() {
    this.send();
  },
  updated() {
    setTimeout(function() {
            layui.use("form", function() {
              layui.form.render();
            });
          }, 10);
  },
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
</style>