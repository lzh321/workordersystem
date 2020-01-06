<template>
  <div class="addMessage">
    <form class="layui-form layui-form-pane" action>
      <div class="info">
        <span>基础信息</span>
        <span>为必填项</span>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">模板名称</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            lay-verify="required"
            placeholder="请输入部门名称"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">接收对象</label>
        <div class="layui-input-block">
          <select name="bankname" lay-verify="required">
            <option value>请选择公司</option>
            <option value="2">票联金融</option>
            <option value="3">票联金融</option>
          </select>
        </div>
      </div>
      
      <div class="layui-form-item">
        <label class="layui-form-label">推送渠道</label>
        <div class="layui-input-block">
          <select name="city" lay-verify="required">
            <option value>请选择一个职务</option>
            <option value="010">Java开发工程师</option>
            <option value="021">前端开发工程师</option>
            <option value="0571">PHP开发工程师</option>
          </select>
        </div>
      </div>
      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">模板内容</label>
        <div class="layui-input-block">
          <textarea lay-verify="required" name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>
        </div>
      </div>
      <div class="layui-form-item" style="text-align:center">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="formDemo">确认</button>
          <button type="reset" class="layui-btn layui-btn-primary">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "addMessage",
  data() {
    return {};
  },
  mounted() {
    //Demo
    layui.use("form", function() {
      var form = layui.form;
      form.render();
      //监听提交
      form.on("submit(formDemo)", function(data) {
        layer.msg(JSON.stringify(data.field));
        return false;
      });
    });
  }
};
</script>

<style scoped>
.addMessage{
  padding: 15px 15px 0;
}
.layui-btn {
  padding: 0 50px;
}
.layui-form-label {
  display: flex;
  align-items: center;
}
.layui-form-label::before {
  content: "*";
  font-size: 20px;
  display: inline-block;
  color: red;
  line-height: 30px;
  height: 20px;
}
.info{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
.info span{
  display: flex;
  align-items: center;
  font-weight: 600
}
.info span:nth-child(2){
  font-weight: 400;
  color: #c2c2c2;
}
.info span:nth-child(2)::before{
  content: "*";
  font-size: 20px;
  display: inline-block;
  color: red;
  line-height: 30px;
  height: 20px;
}
</style>