<template>
  <div class="addInstitution">
    <form class="layui-form layui-form-pane" action>
      <div class="info">
        <span>基础信息</span>
        <span>为必填项</span>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">公司名称</label>
        <div class="layui-input-block">
          <select name="companyId" lay-verify="required">
            <option value>请选择公司</option>
            <option v-for="(item) in companyList" :key="item.id" :value="item.id">{{item.companyName}}</option>
          </select>
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">部门名称</label>
        <div class="layui-input-block">
          <select name="deptId" lay-verify="required">
            <option value>请选择部门</option>
            <option v-for="(item) in DeptList" :key="item.id" :value="item.deptId">{{item.deptName}}</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">职务名称</label>
        <div class="layui-input-block">
          <select name="jobId" lay-verify="required">
            <option value>请选择一个职务</option>
            <option v-for="(item) in JobList" :key="item.id" :value="item.id">{{item.jobName}}</option>
          </select>
        </div>
      </div>

      <div class="layui-form-item" style="text-align:center">
        <div class="layui-input-block">
          <button type="button" class="layui-btn" lay-submit lay-filter="addInstitution">确认</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
          <button @click="cancel" type="reset" class="layui-btn layui-btn-primary">取消</button>
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
      companyList: [],
      DeptList: [],
      JobList: []
    };
  },
  mounted() {
    //Demo
    var _this = this
    layui.use("form", function() {
      var form = layui.form;
      form.render();
      //监听提交
      form.on("submit(addInstitution)", function(data) {
        // layer.msg(JSON.stringify(data.field));
        var listId = sessionStorage.getItem('listId') ? sessionStorage.getItem('listId') : ''
        data.field.userId = _this.$store.state.userId
        if(listId === null || listId === '' || listId ===undefined){
          _this.$axios.post('/api/addOrganizationInfo',data.field).then(res=>{
            console.log(res)
            if(res.data.retCode == '000000'){
              layer.msg(res.data.retMsg,{icon: 1})
              setTimeout(()=>{
                _this.$router.push('/businessEnterprise?type=businessEnterprise')
              },3000)
            }else{
              layer.msg(res.data.retMsg,{icon: 2})
            }
          })
        }else{
          data.field.listId = listId
          console.log(data.field)
          _this.$axios.post('/api/alterOrganizationInfo',data.field).then(res=>{
            console.log(res)
            if(res.data.retCode == '000000'){
              layer.msg(res.data.retMsg,{icon: 1})
              setTimeout(()=>{
                _this.$router.push('/businessEnterprise?type=businessEnterprise')
              },3000)
            }else{
              layer.msg(res.data.retMsg,{icon: 2})
            }
          })
        }
        return false;
      });
    });
  },
  methods:{
    send(){
      var userId = this.$store.state.userId
      this.$axios.post('/api/getCompanyList',userId).then(res=>{ //公司列表
        console.log(res)
        if(res.data.retCode == '000000'){
          this.companyList = res.data.body.list
        }
      })
      this.$axios.post('/api/getDeptList',userId).then(res=>{  //部门列表
        console.log(res)
        if(res.data.retCode == '000000'){
          this.DeptList = res.data.body.list
        }
      })
      this.$axios.post('/api/getJobList',userId).then(res=>{  //职务列表
        console.log(res)
        if(res.data.retCode == '000000'){
          this.JobList = res.data.body.list
        }
      })
    },
    cancel(){
      this.$router.push('/businessEnterprise?type=businessEnterprise')
    }
  },
  created(){
    this.send()
  },
  updated() {
    setTimeout(function() {
      layui.use("form", function() {
        layui.form.render();
      });
    }, 10);
  },
  beforeDestroy(){
    sessionStorage.removeItem('listId')
  }
};
</script>

<style scoped>
.addInstitution{
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