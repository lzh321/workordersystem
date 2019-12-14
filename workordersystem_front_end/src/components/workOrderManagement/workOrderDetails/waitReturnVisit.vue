<template>
<!-- 待回访 -->
  <div>
    <h2>回访记录</h2>
    <div class="layui-form-item">
      <label class="layui-form-label">问题是否已解决</label>
       <div class="layui-input-block">
        <input type="radio" name="isFinish" value="0" title="已解决">
        <input type="radio" name="isFinish" value="1" title="未解决">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">满意度情况</label>
       <div class="layui-input-block">
        <input type="radio" name="satisfiedState" value="0" title="满意">
        <input type="radio" name="satisfiedState" value="1" title="基本满意">
        <input type="radio" name="satisfiedState" value="2" title="不满意">
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">意见/建议</label>
      <div class="layui-input-block">
        <textarea name="adviseContent" placeholder="请输入意见/建议" class="layui-textarea"></textarea>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "waitReturnVisit"
}
</script>

<style scoped>
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>