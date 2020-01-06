<template>
  <div class="checkEquipmentInfo">
    <form id="formData" class="layui-form layui-form-pane" action>
      <div class="info">基础信息</div>
      <div class="layui-form-item">
        <label class="layui-form-label">设备序列号</label>
        <div class="layui-input-block">
          <input type="text" id="stock_code" disabled name="stock_code" :value="DeviceInfo.deviceNumber" class="layui-input" />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">存货名称</label>
        <div class="layui-input-block">
          <input type="text" name="stock_name" disabled :value="DeviceInfo.modelName" class="layui-input" />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">设备型号</label>
        <div class="layui-input-block">
          <input type="text" name="unit_type" disabled :value="DeviceInfo.modelType" class="layui-input" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">维保开始时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" disabled name="Maintenance_start" :value="DeviceInfo.seviceBegintime" />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">维保结束时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" disabled name="Maintenance_end" :value="DeviceInfo.seviceEndtime" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">客户名称</label>
        <div class="layui-input-block">
          <input type="text" name="bank_name" :value="DeviceInfo.customerName" disabled class="layui-input" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">所在城市</label>
        <div class="layui-input-block">
          <input type="text" name="city" disabled :value="DeviceInfo.region" class="layui-input" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">网点名称</label>
        <div class="layui-input-block">
          <input type="text" name="network_name" disabled :value="DeviceInfo.networkName" class="layui-input" />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">网点地址</label>
        <div class="layui-input-block">
          <input type="text" name="network_address" disabled :value="DeviceInfo.networkAddress" class="layui-input" />
        </div>
      </div>

      <div class="info">其他信息</div>

      <div class="layui-form-item">
        <label class="layui-form-label">设备状态</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" disabled name="device_state" :value="DeviceInfo.deviceState" />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">生产批次</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" disabled name="production_batch" :value="DeviceInfo.deviceBatch" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">签报号</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" disabled name="Sign_report_number" :value="DeviceInfo.deviceSignNumber" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">物料类型</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" disabled name="material_type" :value="DeviceInfo.deviceType" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">发货时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" disabled name="shipments" :value="DeviceInfo.deliveryTime" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">运单号</label>
        <div class="layui-input-block">
          <input type="text" name="waybill_number" disabled class="layui-input" :value="DeviceInfo.waybillNumber" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">是否转运</label>
        <div class="layui-input-block">
          <input type="text" name="transfer" disabled class="layui-input" :value="DeviceInfo.deviceTransport = 0 ? '是' : (DeviceInfo.deviceTransport == 1 ? '否' : '')" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">转运流程</label>
        <div class="layui-input-block">
          <input type="text" name="transport_process" disabled class="layui-input" :value="DeviceInfo.transportProcess" />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">验收单</label>
        <div class="layui-input-block">
          <input type="text" name="receipt" disabled class="layui-input" :value="DeviceInfo.checkNumber" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">验收时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" disabled name="acceptance" :value="DeviceInfo.checkTime" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">客户联系人</label>
        <div class="layui-input-block">
          <input type="text" name="customer_contact" disabled class="layui-input" :value="DeviceInfo.linkman" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">联系电话</label>
        <div class="layui-input-block">
          <input type="text" name="phone" disabled class="layui-input" :value="DeviceInfo.linkmanPhone" />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">资产状态</label>
        <div class="layui-input-block">
          <input type="text" name="asset_states" disabled class="layui-input" :value="DeviceInfo.assetState" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">是否入库</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" disabled name="storage" :value="DeviceInfo.stockInState = 0 ? '是' : (DeviceInfo.stockInState == 1 ? '否' : '')" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">开票时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" disabled name="payment" :value="DeviceInfo.bollotTime" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">是否回款</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" disabled name="returned_money" :value="DeviceInfo.payState = 0 ? '已回款' : (DeviceInfo.payState == 1 ? '未回款' : '')" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">回款时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" disabled name="top_urgent" :value="DeviceInfo.retMoneyTime" />
        </div>
      </div>
    </form>
    <div class="layui-form-item">
        <div class="layui-input-block">
          <button type="reset" @click="cancel" class="layui-btn ">返回</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "checkEquipmentInfo",
  data() {
    return {
      DeviceInfo: {}
    };
  },
  methods:{
    cancel() {
      this.$router.push("/equipmentList?type=equipmentList");
    },
    getDeviceInfo(){
      var data = {
        userId: this.$store.state.userId,
        deviceId: sessionStorage.getItem('deviceId') ? sessionStorage.getItem('deviceId') : '',
      }
      this.$axios.post('/api/getDeviceInfo',data).then(res=>{
        console.log(res.data.body)
        this.DeviceInfo = res.data.body
      })
    }
  },
  mounted() {

  },
  created() {
    this.getDeviceInfo()
  }
};
</script>

<style scoped>
.checkEquipmentInfo {
  padding: 15px 15px 0 15px;
}
.info {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
}
label{
  width: 120px;
}
.layui-input-block{
  margin-left: 120px;
}
</style>