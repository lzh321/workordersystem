<template>
  <div class="checkEquipmentInfo">
    <form id="formData" class="layui-form layui-form-pane" action>
      <div class="info">基础信息</div>
      <div class="layui-form-item">
        <label class="layui-form-label">存货编码</label>
        <div class="layui-input-block">
          <input type="text" id="stock_code" name="stock_code" value class="layui-input" />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">存货名称</label>
        <div class="layui-input-block">
          <input type="text" name="stock_name" value class="layui-input" />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">设备型号</label>
        <div class="layui-input-block">
          <input type="text" name="unit_type" value class="layui-input" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">维保开始时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" name="Maintenance_start" value />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">维保结束时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" name="Maintenance_end" value />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">银行名称</label>
        <div class="layui-input-block">
          <input type="text" name="bank_name" value class="layui-input" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">所在城市</label>
        <div class="layui-input-block">
          <input type="text" name="city" value class="layui-input" />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">网点名称</label>
        <div class="layui-input-block">
          <input type="text" name="network_name" value class="layui-input" />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">网点地址</label>
        <div class="layui-input-block">
          <input type="text" name="network_address" value class="layui-input" />
        </div>
      </div>

      <div class="info">其他信息</div>

      <div class="layui-form-item">
        <label class="layui-form-label">设备状态</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" name="device_state" value />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">生产批次</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" name="production_batch" value />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">签报号</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" name="Sign_report_number" value />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">物料类型</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" name="material_type" value />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">发货时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" name="shipments" value />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">运单号</label>
        <div class="layui-input-block">
          <input type="text" name="waybill_number" class="layui-input" value />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">是否转运</label>
        <div class="layui-input-block">
          <input type="text" name="transfer" class="layui-input" value />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">转运流程</label>
        <div class="layui-input-block">
          <input type="text" name="transport_process" class="layui-input" value />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">验收单</label>
        <div class="layui-input-block">
          <input type="text" name="receipt" class="layui-input" value />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">验收时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" name="acceptance" value />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">客户联系人</label>
        <div class="layui-input-block">
          <input type="text" name="customer_contact" class="layui-input" value />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">联系电话</label>
        <div class="layui-input-block">
          <input type="text" name="phone" class="layui-input" value />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">资产状态</label>
        <div class="layui-input-block">
          <input type="text" name="asset_states" class="layui-input" value />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">是否入库</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" name="storage" value />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">开票时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" name="payment" value />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">是否回款</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" name="returned_money" value />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">回款时间</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" name="top_urgent" value />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "checkEquipmentInfo",
  data() {
    return {
    };
  },
  mounted() {

    var inputLeng = document.getElementsByClassName('layui-input')
    for(var i = 0; i < inputLeng.length; i++){
      inputLeng[i].disabled = true
       inputLeng[i].value = i
    }
    
  },
  created() {
    
  }
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