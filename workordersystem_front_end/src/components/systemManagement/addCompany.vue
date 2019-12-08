<template>
  <div class="addCompany">
    <form action class="layui-form layui-form-pane">
      <div class="layui-form-item" v-if="CompanyList">
        <label class="layui-form-label">公司名称</label>
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
      <div class="layui-form-item" v-if="DeptList">
        <label class="layui-form-label">部门名称</label>
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
      <div class="layui-form-item" v-if="JobList">
        <label class="layui-form-label">职务名称</label>
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
      <div class="layui-form-item" style="text-align:center">
        <div class="layui-input-block">
          <button type="button" class="layui-btn" lay-submit lay-filter="addCompany">确认</button>
          <button  type="reset" class="layui-btn layui-btn-primary">重置</button>
          <button @click="cancel" type="reset" class="layui-btn layui-btn-primary">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "addCompany",
  data() {
    return {
      type: this.$route.query.type,
      CompanyList: "",
      DeptList: "",
      JobList: ""
    };
  },
  methods:{
    cancel(){
      this.$router.go(-1)
    }
  },
  mounted() {
    layui.use("form", function() {
      var form = layui.form;
      form.render();
      //监听提交
      form.on("submit(addCompany)", function(data) {
        layer.msg(JSON.stringify(data.field));
        return false;
      });
    });
  },
  created() {
    if (this.type == "CompanyList") {
      this.CompanyList = "CompanyList";
    }
    if (this.type == "DeptList") {
      this.DeptList = "DeptList";
    }
    if (this.type == "JobList") {
      this.CompanyList = "JobList";
    }
  }
};
</script>

<style scoped>
</style>