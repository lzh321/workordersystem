<template>
  <div class="addUser">
    <form class="layui-form layui-form-pane" action>
      <div class="info">
        <span>基础信息</span>
        <span>为必填项</span>
      </div>
      <div class="basicInfo">
        <!-- <div class="layui-form-item">
          <label class="layui-form-label">公司名称</label>
          <div class="layui-input-block">
            <input
              type="text"
              placeholder=""
              autocomplete="off"
              :value="UserInfo.companyName"
              class="layui-input"
            />
          </div>
        </div> -->
        <div class="layui-form-item">
          <label class="layui-form-label">员工姓名</label>
          <div class="layui-input-block">
            <input
              type="text"
              autocomplete="off"
              :value="UserInfo.userName"
              class="layui-input"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">登录账号</label>
          <div class="layui-input-block">
            <input
              type="text"
              autocomplete="off"
              class="layui-input"
              id="alterId"
              :value="UserInfo.userId"
            />
          </div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">登录密码</label>
          <div class="layui-input-inline">
            <input
              type="password"
              name="userPassword"
              required
              lay-verify="userPassword"
              placeholder="请输入密码"
              autocomplete="off"
              class="layui-input"
              :value="UserInfo.userPassword"
            />
          </div>
          <div class="layui-form-mid layui-word-aux">辅助文字</div>
        </div>

        <div class="layui-form-item">
          <label class="layui-form-label">手机号码</label>
          <div class="layui-input-block">
            <input
              type="text"
              autocomplete="off"
              name="userPhone"
              :value="UserInfo.userPhone ? UserInfo.userPhone : ''"
              class="layui-input"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">邮箱地址</label>
          <div class="layui-input-block">
            <input
              type="text"
              autocomplete="off"
              name="userMail"
              :value="UserInfo.userMail ? UserInfo.userMail : ''"
              class="layui-input"
            />
          </div>
        </div>
        <!-- <div class="layui-form-item">
          <label class="layui-form-label">所属部门</label>
          <div class="layui-input-block">
            <input
              type="text"
              required
              placeholder=""
              autocomplete="off"
              :value="UserInfo.deptName ? UserInfo.deptName : ''"
              class="layui-input"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">当前职务</label>
          <div class="layui-input-block">
            <input
              type="text"
              placeholder=""
              autocomplete="off"
              :value="UserInfo.jobName ? UserInfo.jobName : ''"
              class="layui-input"
            />
          </div>
        </div> -->
      </div>

      <div class="info">辅助信息</div>
      <div class="layui-form-item">
        <label class="layui-form-label">工号</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="userJobNumber"
            placeholder=""
            autocomplete="off"
            class="layui-input"
            :value="UserInfo.userJobNumber ? UserInfo.userJobNumber : ''"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">籍贯</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="userNativePlace"
           
            placeholder=""
            autocomplete="off"
            class="layui-input"
            :value="UserInfo.userNativePlace ? UserInfo.userNativePlace : ''"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">毕业院校</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="graduateSchool"
            placeholder=""
            autocomplete="off"
            class="layui-input"
            :value="UserInfo.graduateSchool ? UserInfo.graduateSchool : ''"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">毕业时间</label>
        <div class="layui-input-block">
          <input
            type="text"
            class="layui-input"
          
            name="graduateTime"
            id="graduateTime"
            autocomplete="off"
            placeholder=""
            :value="UserInfo.graduateTime ? UserInfo.graduateTime : ''"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">学历</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="userEducation"
            placeholder=""
            autocomplete="off"
            class="layui-input"
            :value="UserInfo.userEducation ? UserInfo.userEducation : ''"
          />
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">所学专业</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="major"
            placeholder=""
            autocomplete="off"
            class="layui-input"
            :value="UserInfo.major ? UserInfo.major : ''"
          />
        </div>
      </div>

      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">备注</label>
        <div class="layui-input-block">
          <textarea name="remark" placeholder="" :value="UserInfo.remark ? UserInfo.remark : ''" class="layui-textarea"></textarea>
        </div>
      </div>

      <div class="layui-form-item">
        <div class="layui-input-block">
          <button type="reset" @click="cancel" class="layui-btn layui-btn-primary">{{textMsg}}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  data() {
    return {
      alterId: "",
      companyList: [],
      DeptList: [],
      JobList: [],
      UserInfo: [],
      loginId: "",
      show: null,
      textMsg: ''
    };
  },
  watch: {
    '$route': 'cutPage'
  },
  mounted() {
    //Demo
    this.cutPage()
    var _this = this;
    layui.use(["form", "laydate"], function() {
      var form = layui.form;
      var laydate = layui.laydate;
      form.render();
      laydate.render({
        // 维保开始时间
        elem: "#graduateTime",
        type: "date",
        closeStop: "#graduateTime"
      });
      // select监听
      form.on("select(filter)", function(data) {
        console.log(data.elem); //得到select原始DOM对象
        console.log(data.value); //得到被选中的值
        console.log(data.othis); //得到美化后的DOM对象
      });
      // 监听radio
      form.on("radio(filter)", function(data) {
        console.log(data.elem); //得到radio原始DOM对象
        console.log(data.value); //被点击的radio的value值
      });
      //监听提交
      form.on("submit(addUser)", function(data) {
        // console.log(data.field);
        data.field.userId = _this.$store.state.userId;
        console.log(data.field)
        // _this.$axios.post("/api/alterUserInfo", data.field).then(res => {
        //     console.log(res);
        //     if (res.data.retCode == "000000") {
        //       layer.msg(res.data.retMsg, { icon: 1 });
        //       setTimeout(() => {
        //         _this.$router.push("/staffManagement?type=staffManagement");
        //       }, 2000);
        //     } else {
        //       layer.msg(res.data.retMsg, { icon: 2 });
        //     }
        //   });
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
    cutPage(){
      if(this.$route.query.check == 1){
        this.$('input').attr('disabled',true)
        this.$('textarea').attr('disabled',true)
        this.textMsg = '返回'
      }
    },
    send() {
      var userId = localStorage.getItem('alterId');

      this.$axios.post("/api/getUserInfo",{'userId':userId}).then(res=> {
        console.log(res)
        if(res.data.retCode == '000000'){
          this.UserInfo = res.data.body[0]
          
        }
      })
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  created() {
    this.send();
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
.addUser {
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