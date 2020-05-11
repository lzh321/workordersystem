<template>
  <div class="addInstitution">
    <form class="layui-form layui-form-pane" action>
      <div class="info">
        <span>基础信息</span>
        <span>为必填项</span>
      </div>
      <div class="layui-form-item" v-if="this.Institution.parentId == '' ? false : true">
        <label class="layui-form-label">所属机构</label>
        <div class="layui-input-block">
          <select name="parentId" id="parentId" >
            <option value>请选择机构</option>
            <option
              v-for="(item) in orgInfoList"
              :key="item.orgId"
              :value="item.orgId"
            >{{item.orgName}}</option>
          </select>
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">机构名称</label>
        <div class="layui-input-block">
           <input
            type="text"
            name="orgName"
            lay-verify="required"
            placeholder="请输入机构名称"
            autocomplete="off"
            class="layui-input"
            :value="Institution.orgName ? Institution.orgName : ''"
          />
        </div>
      </div>


      <div class="layui-form-item" style="text-align:center">
        <div class="layui-input-block">
          <button type="button" class="layui-btn" lay-submit lay-filter="addInstitution">确认</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
          <button @click="cancel" class="layui-btn layui-btn-primary">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "addInstitution",
  data() {
    return {
      orgInfoList: [],
      DeptList: [],
      JobList: [],
      Institution: localStorage.getItem("data")
        ? JSON.parse(localStorage.getItem("data"))
        : "",
      isShow: true
    };
  },
  mounted() {
    //Demo
    
    var _this = this;
    layui.use("form", function() {
      var form = layui.form;
      form.render();
      
      //监听提交
      form.on("submit(addInstitution)", function(data) {
        // layer.msg(JSON.stringify(data.field));
        var orgId = localStorage.getItem("orgId")
          ? localStorage.getItem("orgId")
          : "";
        data.field.userId = _this.$store.state.userId;
        if (orgId === null || orgId === "" || orgId === undefined) {
          _this.$axios
            .post("/api/addOrgInfo", data.field)
            .then(res => {
              console.log(res);
              if (res.data.retCode == "000000") {
                layer.msg(res.data.retMsg, { icon: 1 });
                setTimeout(() => {
                  _this.$router.push(
                    "/businessEnterprise?type=businessEnterprise"
                  );
                }, 3000);
              } else {
                layer.msg(res.data.retMsg, { icon: 2 });
              }
            });
        } else {
          data.field.orgId = orgId;
          console.log(data.field);
          _this.$axios
            .post("/api/alterOrgInfo", data.field)
            .then(res => {
              console.log(res);
              if (res.data.retCode == "000000") {
                layer.msg(res.data.retMsg, { icon: 1 });
                setTimeout(() => {
                  _this.$router.push(
                    "/businessEnterprise?type=businessEnterprise"
                  );
                }, 3000);
              } else {
                layer.msg(res.data.retMsg, { icon: 2 });
              }
            });
        }
        return false;
      });
    });
  },
  methods: {
    send() {
      var userId = this.$store.state.userId;
      this.$axios.post("/api/getOrgInfoList", {userId:userId}).then(res => {
        //机构列表
        console.log(res)
        if (res.data.retCode == "000000") {
          this.orgInfoList = res.data.body.orgInfoList;
        }
      });
    },
    getInstitution() {
      // 公司
      var parentId = this.Institution.parentId
      var orgIdLen = this.$("#parentId option").length;
      for (var i = 0; i < orgIdLen; i++) {
        var orgIdVal = this.$("#parentId option")
          .eq(i)
          .val();
        if (parentId == orgIdVal) {
          this.$("#parentId option")
            .eq(i)
            .attr("selected", "selected");
        }
      }
    },
    cancel() {
      this.$router.push("/businessEnterprise?type=businessEnterprise");
    }
  },
  created() {
    this.send();
  },
  updated() {
    this.getInstitution();
    layui.use("form", function() {
      layui.form.render();
    });
  },
  beforeDestroy() {}
};
</script>

<style scoped>
.addInstitution {
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