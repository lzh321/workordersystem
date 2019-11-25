<template>
  <div class="addUser">
    <form class="layui-form layui-form-pane" action>
      <div class="info">基础信息</div>
      <div class="layui-form-item">
        <label class="layui-form-label">公司名称</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify="required"
            placeholder="请输入公司名称"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">员工姓名</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify="required"
            placeholder="请输入姓名"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">登录账号</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify="required"
            placeholder="请输入账号"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">登录密码</label>
        <div class="layui-input-inline">
          <input
            type="password"
            name="password"
            required
            lay-verify="required"
            placeholder="请输入密码"
            autocomplete="off"
            class="layui-input"
          />
        </div>
        <div class="layui-form-mid layui-word-aux">辅助文字</div>
      </div>
      <div class="layui-form-item" pang>
        <label class="layui-form-label">性别</label>
        <div class="layui-input-block">
          <input type="radio" name="sex" value="男" title="男" />
          <input type="radio" name="sex" value="女" title="女" checked />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">手机号码</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify="required"
            placeholder="请输入手机号码"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">邮箱地址</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            lay-verify=""
            placeholder="请输入邮箱"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">所属部门</label>
        <div class="layui-input-block">
          <select name="city" lay-verify="required">
            <option value=""></option>
            <option value="1">全部</option>
            <option value="2">测试</option>
            <option value="3">开发</option>
          </select>
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">当前职务</label>
        <div class="layui-input-block">
          <select name="city" lay-verify="required">
            <option value=""></option>
            <option value="1">全部</option>
            <option value="2">测试工程师</option>
            <option value="3">开发工程师</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">座机/分机</label>
        <div class="layui-input-block" style="display:flex">
          <input
            type="text"
            name="title"
            lay-verify=""
            placeholder="电话区号"
            autocomplete="off"
            class="layui-input"
          />
          <input
            type="text"
            name="title"
            lay-verify=""
            placeholder="电话号码"
            autocomplete="off"
            class="layui-input"
          />
          <input
            type="text"
            name="title"
            lay-verify=""
            placeholder="分机号码"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="info">辅助信息</div>
      <div class="layui-form-item">
        <label class="layui-form-label">工号</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify=""
            placeholder="请输入工号"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">籍贯</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify=""
            placeholder="请输入籍贯"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">毕业院校</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify=""
            placeholder="请输入毕业院校"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">毕业时间</label>
        <div class="layui-input-block">
          <select name="city" lay-verify="">
            <option value=""></option>
            <option value="1">全部</option>
            <option value="2">测试工程师</option>
            <option value="3">开发工程师</option>
          </select>
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">学历</label>
        <div class="layui-input-block">
          <select name="city" lay-verify="">
            <option value=""></option>
            <option value="1">全部</option>
            <option value="2">博士</option>
            <option value="3">硕士</option>
            <option value="4">本科</option>
            <option value="5">大专</option>
            <option value="6">高中</option>
            <option value="7">中专</option>

          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">所学专业</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="title"
            required
            lay-verify=""
            placeholder="请输入所学专业"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>

      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">备注</label>
        <div class="layui-input-block">
          <textarea name="desc" placeholder="请输入内容" class="layui-textarea"></textarea>
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
  name: "addUser",
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
.addUser{
  padding: 15px;
}
.info{
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 30px;
}

</style>