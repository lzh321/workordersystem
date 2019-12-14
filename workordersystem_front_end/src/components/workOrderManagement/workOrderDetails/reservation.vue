<template>
  <!-- 处理中 故障处理记录 -->
  <div>
    <h2>故障处理记录</h2>
    <div class="layui-form-item">
      <label class="layui-form-label">上门时间</label>
      <div class="layui-input-block">
        <input
          type="text"
          name
          class="layui-input"
          :value="workOrderInfo.appoinmentTime"
          id="reportedBarrierTime"
          disabled
        />
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">工程师</label>
      <div class="layui-input-block">
        <input
          type="text"
          name
          class="layui-input"
          :value="workOrderInfo.userName"
          id="reportedBarrierTime"
          disabled
        />
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">联系电话</label>
      <div class="layui-input-block">
        <input
          type="text"
          name
          class="layui-input"
          :value="workOrderInfo.userPhone"
          id="reportedBarrierTime"
          disabled
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "reservAtion",
  props: ["workOrderInfo"],
  data() {
    return {};
  },
  mounted() {
    layui.use("element", function() {
      var element = layui.element;
      element.render();
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
</style>