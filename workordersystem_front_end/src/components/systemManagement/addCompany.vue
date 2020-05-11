<template>
  <div class="addCompany">
    <form action class="layui-form layui-form-pane">
      <div class="layui-form-item" v-if="CompanyList">
        <label class="layui-form-label">公司名称</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="companyName"
            lay-verify="required"
            placeholder="请输入公司名称"
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
            name="deptName"
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
            name="jobName"
            lay-verify="required"
            placeholder="请输入职务名称"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      <div class="layui-form-item" style="text-align:center">
        <div class="layui-input-block">
          <button type="button" class="layui-btn" lay-submit lay-filter="addCompany">确认</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
          <button @click="cancel" class="layui-btn layui-btn-primary">取消</button>
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
  methods: {
    cancel() {
      this.$router.push('/deploy?type='+this.type);
    },
  },
  mounted() {
    var _this = this;
    layui.use("form", function() {
      var form = layui.form;
      form.render();
      //监听提交
      form.on("submit(addCompany)", function(data) {
        console.log(data.field);
        data.field.userId = _this.$store.state.userId
        if (_this.type == "CompanyList") {
          var companyId = localStorage.getItem('companyId') ? localStorage.getItem('companyId') : ''
          if(companyId === null || companyId === '' || companyId === undefined){
            _this.$axios.post('/api/addCompanyInfo',data.field).then(res=>{
              console.log(res)
              if(res.data.retCode == '000000'){
                layer.msg(res.data.retMsg, {icon: 1})
                setTimeout(()=>{
                  _this.$router.push('/deploy?type='+_this.type)
                },3000)
              }else{
                layer.msg(res.data.retMsg, {icon: 2})
              }
            })
          }else{
            data.field.companyId = companyId
            _this.$axios.post('/api/alterCompanyInfo',data.field).then(res=>{
              console.log(res)
              if(res.data.retCode == '000000'){
                layer.msg(res.data.retMsg, {icon: 1})
                setTimeout(()=>{
                  _this.$router.push('/deploy?type='+_this.type)
                },3000)
              }else{
                layer.msg(res.data.retMsg, {icon: 2})
              }
            })
          }
          
        }
        if (_this.type == "DeptList") {

          var deptId = localStorage.getItem('deptId') ? localStorage.getItem('deptId') : ''
          if(deptId === null || deptId === '' || deptId === undefined){
            _this.$axios.post('/api/addDeptInfo',data.field).then(res=>{
              console.log(res)
              if(res.data.retCode == '000000'){
                layer.msg(res.data.retMsg, {icon: 1})
                setTimeout(()=>{
                  _this.$router.push('/deploy?type='+_this.type)
                },3000)
              }else{
                layer.msg(res.data.retMsg, {icon: 2})
              }
            })
          }else{
            data.field.deptId = deptId
            _this.$axios.post('/api/alterDeptInfo',data.field).then(res=>{
              console.log(res)
              if(res.data.retCode == '000000'){
                layer.msg(res.data.retMsg, {icon: 1})
                setTimeout(()=>{
                  _this.$router.push('/deploy?type='+_this.type)
                },3000)
              }else{
                layer.msg(res.data.retMsg, {icon: 2})
              }
            })
          }
        }
        if (_this.type == "JobList") {
          
          var jobId = localStorage.getItem('jobId') ? localStorage.getItem('jobId') : ''
          if(jobId === null || jobId === '' || jobId === undefined){
            _this.$axios.post('/api/addJobInfo',data.field).then(res=>{
              console.log(res)
              if(res.data.retCode == '000000'){
                layer.msg(res.data.retMsg, {icon: 1})
                setTimeout(()=>{
                  _this.$router.push('/deploy?type='+_this.type)
                },3000)
              }else{
                layer.msg(res.data.retMsg, {icon: 2})
              }
            })
          }else{
            data.field.jobId = jobId
            _this.$axios.post('/api/alterJobInfo',data.field).then(res=>{
              console.log(res)
              if(res.data.retCode == '000000'){
                layer.msg(res.data.retMsg, {icon: 1})
                setTimeout(()=>{
                  _this.$router.push('/deploy?type='+_this.type)
                },3000)
              }else{
                layer.msg(res.data.retMsg, {icon: 2})
              }
            })
          }
        }

        return false;
      });
    });
  },
  created() {
    if (this.type == "CompanyList") {
      this.CompanyList = this.type;
    }
    if (this.type == "DeptList") {
      this.DeptList = this.type;
    }
    if (this.type == "JobList") {
      this.JobList = this.type;
    }
  }
};
</script>

<style scoped>
.addCompany{
  padding: 15px 15px 0;
}
</style>