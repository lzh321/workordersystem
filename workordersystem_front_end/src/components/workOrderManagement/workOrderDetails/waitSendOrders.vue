<template>
  <div>
    <div class="layui-form-item">
      <label class="layui-form-label">指派给</label>
      <div class="layui-input-block">
        <select name="acceptUserId">
          <option value>亲选择指派人</option>
          <option value></option>
        </select>
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
export default {};
</script>
<style scoped>
</style>