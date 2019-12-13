<template>
  <div>
    <h2>回访记录</h2>
    <div class="layui-form-item">
      <label class="layui-form-label">问题是否已解决</label>
       <div class="layui-input-block">
        <input type="radio" name="sex" value="0" title="已解决">
        <input type="radio" name="sex" value="1" title="未解决" checked>
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">满意度情况</label>
       <div class="layui-input-block">
        <input type="radio" name="sex" value="0" title="已解决">
        <input type="radio" name="sex" value="1" title="未解决" checked>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">意见/建议</label>
      <div class="layui-input-block">
        <textarea name="remark" placeholder="请输入内容" class="layui-textarea"></textarea>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">备注</label>
      <div class="layui-input-block">
        <textarea name="remark" placeholder="请输入内容" class="layui-textarea"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
h2 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 20px;
}
</style>