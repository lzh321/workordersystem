<template>
  <div class="addNetwork">
    <form class="layui-form layui-form-pane" action>
      <div class="info">基础信息</div>
      <div class="layui-form-item">
        <label class="layui-form-label">银行名称</label>
        <div class="layui-input-block">
          <select name="bankname" lay-verify="required">
            <option value=""></option>
            <option value="1">请选择银行</option>
            <option value="2">中国民生银行</option>
            <option value="3">中国农业银行</option>
          </select>
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">网点名称</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            lay-verify="required"
            placeholder="请输入网点名称"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      
      <div class="layui-form-item">
        <label class="layui-form-label">所在城市</label>
        <div class="layui-input-block">
          <select name="city" lay-verify="required">
            <option value="">请选择一个城市</option>
            <option value="010">北京</option>
            <option value="021">上海</option>
            <option value="0571">杭州</option>
          </select> 
        </div>
      </div>

      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">网点地址</label>
        <div class="layui-input-block">
          <textarea lay-verify="required" name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="formDemo">立即提交</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "addNetwork",
  data() {
    return {};
  },
  mounted() {
    //Demo
    layui.use("form", function() {
      var form = layui.form;
      form.render();
      // select监听
      form.on('select(filter)', function(data){
        console.log(data.elem); //得到select原始DOM对象
        console.log(data.value); //得到被选中的值
        console.log(data.othis); //得到美化后的DOM对象
      }); 
      // 监听radio
      form.on('radio(filter)', function(data){
        console.log(data.elem); //得到radio原始DOM对象
        console.log(data.value); //被点击的radio的value值
      });
      //监听提交
      form.on("submit(formDemo)", function(data) {
        layer.msg(JSON.stringify(data.field));
        return false;
      });

      //表单验证
      form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
          if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
          }
          if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
          }
          if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          }
        }
        
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] 
      });
    });
  }
};
</script>

<style scoped>
.addNetwork{
  padding: 15px;
}
.info{
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
}

</style>