<template>
  <!-- 处理中 -->
  <div>
    <h2>故障处理记录</h2>
    <div class="layui-form-item">
      <label class="layui-form-label">故障类型</label>
      <div class="layui-input-block">
        <select name="acceptUserId">
          <option value>请选择故障类型</option>
          <option value="1">硬件</option>
          <option value="2">软件</option>
          <option value="3">辅助</option>
          <option value="4">其他</option>
        </select>
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">故障模块</label>
      <div class="layui-input-block">
        <select name="acceptUserId">
          <option value>请选择故障模块</option>
          <option value="1">显示屏</option>
          <option value="2">密码键盘</option>
          <option value="3">辅助</option>
          <option value="4">其他</option>
        </select>
      </div>
    </div>

    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">问题记录</label>
      <div class="layui-input-block">
        <textarea name="remark" placeholder="请输入内容" class="layui-textarea"></textarea>
      </div>
    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">解决办法</label>
      <div class="layui-input-block">
        <textarea name="remark" placeholder="请输入内容" class="layui-textarea"></textarea>
      </div>
    </div>

    <h2>协同作业</h2>
    <div class="layui-form-item">
      <div class="layui-collapse">
        <div class="layui-colla-item">
          <h2 class="layui-colla-title">协同人员：杜甫</h2>
          <div class="layui-colla-content">
            <ul>
              <li class="layui-form-item layui-form-text">
                <label class="">协同内容：</label>
                <span class="">
                  打算吃顿饭
                </span>
              </li>
              <li class="layui-form-item">
                <label class="">紧急程度：</label>
                <span class="">一般</span>
              </li>
              <li class="layui-form-item">
                <label class="">状态：</label>
                <span>待受理</span>
              </li>
              <li class="layui-form-item">
                <label class="">编号：</label>
                <span class="">PL10632562</span>
              </li>
            </ul>
          </div>
        </div>
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
  name: "inProcess",
  data() {
    return {
      
    }
  },
  mounted(){
    layui.use("element",function(){
      var element = layui.element
      element.render()
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