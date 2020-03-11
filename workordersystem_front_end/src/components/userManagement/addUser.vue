<template>
  <div class="addUser">
    <form class="layui-form layui-form-pane" action>
      <div class="info">
        <span>基础信息</span>
        <span>为必填项</span>
      </div>
      <div class="basicInfo">
        <div class="layui-form-item">
          <label class="layui-form-label">公司名称</label>
          <div class="layui-input-block">
            <select name="companyId" lay-search lay-verify="required">
              <option value>请选择公司名称</option>
              <option
                v-for="(item) in companyList"
                :key="item.id"
                :value="item.id"
                :selected="item.companyName == UserInfo.companyName ? true : false"
              >{{item.companyName}}</option>
            </select>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">员工姓名</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="userName"
              required
              lay-verify="userName"
              placeholder="请输入姓名"
              autocomplete="off"
              :value="UserInfo.userName ? UserInfo.userName : ''"
              class="layui-input"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">登录账号</label>
          <div class="layui-input-block">
            <input
              type="text"
              :name="loginId"
              required
              lay-verify="loginId"
              placeholder="请输入账号"
              autocomplete="off"
              class="layui-input"
              id="alterId"
              :value="alterId"
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
            />
          </div>
          <div class="layui-form-mid layui-word-aux">辅助文字</div>
        </div>
        <div class="layui-form-item" pang>
          <label class="layui-form-label">性别</label>
          <div class="layui-input-block">
            <input
              type="radio"
              name="userSex"
              :checked="UserInfo.userSex == 0 ? true : false"
              value="0"
              title="男"
            />
            <input
              type="radio"
              name="userSex"
              :checked="UserInfo.userSex == 1 ? true : false"
              value="1"
              title="女"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">手机号码</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="userPhone"
              required
              lay-verify="phone"
              placeholder="请输入手机号码"
              autocomplete="off"
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
              name="userMail"
              lay-verify="email"
              placeholder="请输入邮箱"
              autocomplete="off"
              :value="UserInfo.userMail ? UserInfo.userMail : ''"
              class="layui-input"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">所属部门</label>
          <div class="layui-input-block">
            <select name="deptId" lay-search lay-verify="required">
              <option value>选择部门</option>
              <option
                v-for="(item) in DeptList"
                :key="item.id"
                :value="item.deptId"
                :selected="item.deptName == UserInfo.deptName ? true : false"
              >{{item.deptName}}</option>
            </select>
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">当前职务</label>
          <div class="layui-input-block">
            <select name="jobId" lay-search lay-verify="required">
              <option value></option>
              <option v-for="(item) in JobList" :key="item.id" :value="item.id" :selected="item.jobName == UserInfo.jobName ? true :false">{{item.jobName}}</option>
            </select>
          </div>
        </div>

        <div class="Plane layui-form-item">
          <label class="layui-form-label">座机/分机</label>
          <div class="layui-input-block" style="display:flex">
            <!-- <input
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
            />-->
            <input
              type="text"
              name="telePhone"
              lay-verify
              placeholder="请输入座机/分机号"
              autocomplete="off"
              class="layui-input"
              :value="UserInfo.telePhone ? UserInfo.telePhone : ''"
            />
          </div>
        </div>
      </div>
      <div class="info">辅助信息</div>
      <div class="layui-form-item">
        <label class="layui-form-label">工号</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="userJobNumber"
            required
            lay-verify
            placeholder="请输入工号"
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
            required
            lay-verify
            placeholder="请输入籍贯"
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
            required
            lay-verify
            placeholder="请输入毕业院校"
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
            lay-verify
            name="graduateTime"
            id="graduateTime"
            autocomplete="off"
            placeholder="毕业时间"
            :value="UserInfo.graduateTime ? UserInfo.graduateTime : ''"
          />
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">学历</label>
        <div class="layui-input-block">
          <select name="userEducation" lay-verify>
            <option value>请选择学历</option>
            <option :selected="UserInfo.userEducation == 1 ? true : false" value="1">全部</option>
            <option :selected="UserInfo.userEducation == 2 ? true : false" value="2">博士</option>
            <option :selected="UserInfo.userEducation == 3 ? true : false" value="3">硕士</option>
            <option :selected="UserInfo.userEducation == 4 ? true : false" value="4">本科</option>
            <option :selected="UserInfo.userEducation == 5 ? true : false" value="5">大专</option>
            <option :selected="UserInfo.userEducation == 6 ? true : false" value="6">高中</option>
            <option :selected="UserInfo.userEducation == 7 ? true : false" value="7">中专</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">所学专业</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="major"
            required
            lay-verify
            placeholder="请输入所学专业"
            autocomplete="off"
            class="layui-input"
            :value="UserInfo.major ? UserInfo.major : ''"
          />
        </div>
      </div>

      <div class="layui-form-item layui-form-text">
        <label class="layui-form-label">备注</label>
        <div class="layui-input-block">
          <textarea name="remark" placeholder="请输入内容" :value="UserInfo.remark ? UserInfo.remark : ''" class="layui-textarea"></textarea>
        </div>
      </div>
      <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="addUser">立即提交</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
          <button type="reset" @click="cancel" class="layui-btn layui-btn-primary">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "addUser",
  data() {
    return {
      alterId: "",
      companyList: [],
      DeptList: [],
      JobList: [],
      UserInfo: [],
      loginId: ""
    };
  },
  mounted() {
    //Demo
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
        console.log(data.field);
        var alterId = sessionStorage.getItem("alterId")
          ? sessionStorage.getItem("alterId")
          : "";
        data.field.userId = _this.$store.state.userId;
        if (alterId === null || alterId === "" || alterId === undefined) {
          _this.$axios.post("/api/addUserInfo", data.field).then(res => {
            console.log(res);
            if (res.data.retCode == "000000") {
              layer.msg(res.data.retMsg, { icon: 1 });
              setTimeout(() => {
                _this.$router.push("/staffManagement?type=staffManagement");
              }, 2000);
            } else {
              layer.msg(res.data.retMsg, { icon: 2 });
            }
          });
        } else {
          _this.$axios.post("/api/alterUserInfo", data.field).then(res => {
            console.log(res);
            if (res.data.retCode == "000000") {
              layer.msg(res.data.retMsg, { icon: 1 });
              setTimeout(() => {
                _this.$router.push("/staffManagement?type=staffManagement");
              }, 2000);
            } else {
              layer.msg(res.data.retMsg, { icon: 2 });
            }
          });
        }
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
    send() {
      var userId = this.$store.state.userId;
      this.$axios.post("/api/getCompanyList", userId).then(res => {
        //公司列表
        console.log(res);
        if (res.data.retCode == "000000") {
          this.companyList = res.data.body.CompanyNameList;
        }
      });
      this.$axios.post("/api/getDeptList", userId).then(res => {
        //部门列表
        console.log(res);
        if (res.data.retCode == "000000") {
          this.DeptList = res.data.body.DeptNameList;
        }
      });
      this.$axios.post("/api/getJobList", userId).then(res => {
        //职务列表
        console.log(res);
        if (res.data.retCode == "000000") {
          this.JobList = res.data.body.JobNameList;
        }
      });
    },
    getUserInfo() {
      this.UserInfo = sessionStorage.getItem("data")
        ? JSON.parse(sessionStorage.getItem("data"))
        : "";
    },
    cancel() {
      this.$router.push("/staffManagement?type=staffManagement");
    }
  },
  created() {
    this.send();
    this.getUserInfo();
  },
  updated() {
    setTimeout(function() {
      layui.use("form", function() {
        layui.form.render();
      });
    }, 10);
    var alterId = sessionStorage.getItem("alterId")
      ? sessionStorage.getItem("alterId")
      : "";
    if (alterId === null || alterId === "" || alterId === undefined) {
      this.loginId = "addUserId";
    } else {
      this.alterId = alterId;
      this.loginId = "alterId";
      document.getElementById("alterId").disabled = true;
    }
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