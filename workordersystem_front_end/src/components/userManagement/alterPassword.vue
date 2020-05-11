<template>
  <div class="alterPassword">
    <form class="layui-form layui-form-pane" action>
      <div class="info">
        <span>基础信息</span>
        <span>为必填项</span>
      </div>
      <div class="basicInfo">

        <div class="layui-form-item">
          <label class="layui-form-label">旧密码</label>
          <div class="layui-input-block">
            <input
              name="oldPwd"
              placeholder="请输入旧密码"
              type="password"
              autocomplete="off"
              value=""
              class="layui-input"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">新密码</label>
          <div class="layui-input-block">
            <input
              type="password"
              placeholder="请输入新密码"
              autocomplete="off"
              class="layui-input"
              value=""
              name="newPwd"
            />
          </div>
        </div>

      </div>

      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="alterPassword">立即修改</button>
          <button type="reset" @click="cancel" class="layui-btn layui-btn-primary">返回</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "alterPassword",
  data() {
    return {

    };
  },

  mounted() {
    //Demo
    var _this = this;
    layui.use(["form", "laydate"], function() {
      var form = layui.form;
      var laydate = layui.laydate;
      form.render();

      //监听提交
      form.on("submit(alterPassword)", function(data) {
        // console.log(data.field);
        data.field.userId = _this.$store.state.userId;
        console.log(data.field)
        _this.$axios.post("/api/updatePassword", data.field).then(res => {
            console.log(res);
            if (res.data.retCode == "000000") {
              layer.msg(res.data.retMsg, { icon: 1 });
              setTimeout(() => {
                localStorage.clear()
                _this.$router.go(-1);
              }, 2000);
            } else {
              layer.msg(res.data.retMsg, { icon: 2 });
            }
          });
        return false;
      });

      //表单验证
      form.verify({
        userName: function(value, item) {
          //value：表单的值、item：表单的DOM对象
          if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
            return "用户名不能有特殊字符";
          }
          if (/(^\_)|(\__)|(\_+$)/.test(value)) {
            return "用户名首尾不能出现下划线'_'";
          }
          if (/^\d+\d+\d$/.test(value)) {
            return "用户名不能全为数字";
          }
        },
        loginId:function(value, item) {
           if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
            return "账号不能有特殊字符";
          }
        },
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        userPassword: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"]
      });
    });
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    }
  },
  created() {
  },
  updated() {
    
    setTimeout(function() {
      layui.use("form", function() {
        layui.form.render();
      });
    }, 10);

  },

};
</script>

<style scoped>
.alterPassword {
  padding: 15px;
}
.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
.info span {
  display: flex;
  align-items: center;
  font-weight: 600;
}
.basicInfo .layui-form-label::before {
  content: "*";
  font-size: 20px;
  display: inline-block;
  color: red;
  line-height: 30px;
  height: 20px;
}
.basicInfo .Plane label::before {
  content: "";
}
.layui-form-label {
  display: flex;
  align-items: center;
}
.info span:nth-child(2) {
  font-weight: 400;
  color: #c2c2c2;
}
.info span:nth-child(2)::before {
  content: "*";
  font-size: 20px;
  display: inline-block;
  color: red;
  line-height: 30px;
  height: 20px;
}
</style>