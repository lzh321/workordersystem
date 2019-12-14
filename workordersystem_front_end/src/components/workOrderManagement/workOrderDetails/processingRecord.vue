<template>
<!-- 故障处理记录  详情 -->
  <div>
    <h2 v-if="workOrderInfo.appoinmentTime ? false :true">故障处理记录</h2>
    <reservation :workOrderInfo="workOrderInfo" v-if="workOrderInfo.appoinmentTime"></reservation>
    <div class="layui-form-item">
      <label class="layui-form-label">故障类型</label>
      <div class="layui-input-block">
        <input type="text" name :value="workOrderInfo.recordType == 0 ? '硬件' : (workOrderInfo.recordType == 1 ? '软件' : (workOrderInfo.recordType == 2 ? '辅助' : ''))" class="layui-input" disabled />
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">故障模块</label>
      <div class="layui-input-block">
        <input type="text" name :value="workOrderInfo.recordModel == 0 ? '显示屏' : (workOrderInfo.recordModel == 1 ? '密码键盘' : '')" class="layui-input" disabled />
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">问题记录</label>
      <div class="layui-input-block">
        <textarea
          name
          :value="workOrderInfo.recordContent"
          placeholder="请输入内容"
          class="layui-textarea"
          disabled
        ></textarea>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">解决办法</label>
      <div class="layui-input-block">
        <textarea
          name
          :value="workOrderInfo.recordSettle"
          placeholder="请输入内容"
          class="layui-textarea"
          disabled
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import reservation from "./reservation"
export default {
  name: "processingRecord",
  props: ["workOrderInfo"],
  data() {
    return {
      
    }
  },
  components:{
    reservation
  }
}
</script>

<style>
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>